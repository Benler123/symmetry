from google.cloud.sql.connector import Connector
import sqlalchemy
from queries import *
from datetime import datetime, timedelta
# from gpt_client import *
from LLM_client_factory import LLM_client_factory

project_id = "fast-gate-405518"
region = "us-central1"
instance_name = "symmetry"

INSTANCE_CONNECTION_NAME = f"{project_id}:{region}:{instance_name}" # i.e demo-project:us-central1:demo-instance
print(f"Your instance connection name is: {INSTANCE_CONNECTION_NAME}")
DB_USER = "chef"
DB_PASS = "food"
DB_NAME = "symmetry_db"

categories =  ['Coding', 'Browsing', 'Meeting',  'Communicating', 'Scheduling', 'Chatting', 'Off-Topic']
connector = Connector()

client_factory = LLM_client_factory()
image_client = client_factory.generate_image_model("gpt")
summarizer_client = client_factory.generate_summarizer_model("gpt")


def getconn():
    conn = connector.connect(
        INSTANCE_CONNECTION_NAME,
        "pymysql",
        user=DB_USER,
        password=DB_PASS,
        db=DB_NAME
    )
    return conn


pool = sqlalchemy.create_engine(
    "mysql+pymysql://",
    creator=getconn,
)

db_conn = pool.connect()

def initialize_database():

    query_and_rollback_on_error(create_primary_table)
    query_and_rollback_on_error(create_second_table)
    query_and_rollback_on_error(create_description_table)

def insert_batch_metadata(device, timestamp):

    # insert data into our ratings table
    text_string = "INSERT INTO data (device, timestamp) VALUES (:device, :timestamp)"
    print(device)
    print(timestamp)
    text_string = text_string.replace(":device", "\"" + device + "\"")
    text_string = text_string.replace(":timestamp", "\"" + timestamp.strftime("%Y-%m-%d") + "\"")

    query_and_rollback_on_error(text_string)

    
def clear_database():

    


    query_and_rollback_on_error("DELETE FROM ImageTable")
    query_and_rollback_on_error("DELETE FROM data")
    query_and_rollback_on_error("ALTER TABLE data AUTO_INCREMENT = 1;")
    query_and_rollback_on_error("ALTER TABLE ImageTable AUTO_INCREMENT = 1;")



def insert_batch_image_data(batch_id, description, category, base64_image):
    text_string = "INSERT INTO ImageTable (batch_id, description, category, base64_image) VALUES (:batch_id, :description, :category, :base64_image)"
    text_string = text_string.replace(":batch_id",  "'" + str(batch_id.fetchone()[0]) + "'")
    text_string = text_string.replace(":description", "'" + description + "'")
    text_string = text_string.replace(":category", "'" + category.replace("\n", "") + "'")
    text_string = text_string.replace(":base64_image", "'" + "SuperSecretCheatCode" + "'")
    query_and_rollback_on_error(text_string)
    
    return

def retrieve_all_primary():
    retrieve_primary = sqlalchemy.text(
        "SELECT * FROM data",
    )

    return db_conn.execute(retrieve_primary)

def retrieve_all_image_table():
    retrieve_image_table = sqlalchemy.text(
        "SELECT * FROM ImageTable",
    )

    return db_conn.execute(retrieve_image_table)

def retrieve_user_data(user):
    text_string = """
        SELECT ImageTable.category, COUNT(*) as category_count
        FROM ImageTable
        JOIN data ON data.batch_id = ImageTable.batch_id
        WHERE data.device = ###user###
        GROUP BY ImageTable.category;
    """
    text_string = text_string.replace("###user###", "\"" + user + "\"")
    retrieve_user_info = sqlalchemy.text(text_string)
    result = db_conn.execute(retrieve_user_info)
    dict = {}
    for category, frequency in result:
        if category in categories:
            dict[category] = frequency  
    return dict

def retrieve_user_category_data_by_day(user, day):
    text_string = """
        SELECT ImageTable.category, COUNT(*) as category_count
        FROM ImageTable
        JOIN data ON data.batch_id = ImageTable.batch_id
        WHERE data.device = (:user)
        AND DATE(data.timestamp) = (:day)
        GROUP BY ImageTable.category;
    """
    text_string = text_string.replace(":user", "\"" + user + "\"")
    text_string = text_string.replace(":day", "\"" + day + "\"")

    retrieve_user_info = sqlalchemy.text(text_string)

    result = db_conn.execute(retrieve_user_info)
    dict = {}
    for category, frequency in result:
        if category in categories:
            dict[category] = frequency
    return dict


def retrieve_user_category_data_by_week(user, start_day):
    date_format = "%Y-%m-%d"
    curr_date = datetime.strptime(start_day, date_format)
    week_dict = {}
    for letter in ["M", "T", "W", "Th", "F"]:
        week_dict[letter] = {}
        week_dict[letter]["activities"] = retrieve_user_category_data_by_day(user, curr_date.strftime("%Y-%m-%d"))
        curr_date = curr_date + timedelta(days=1)
    return week_dict

def retrive_curr_batch():
    t = sqlalchemy.text("SELECT MAX(batch_id) FROM data;")
    return db_conn.execute(t)

def retrive_daily_descriptions(user, day):
    text_string = """
        SELECT ImageTable.description
        FROM ImageTable
        JOIN data ON data.batch_id = ImageTable.batch_id
        WHERE data.device = (:user)
        AND DATE(data.timestamp) = :day
    """

    text_string = text_string.replace(":user", "\"" + user + "\"")
    text_string = text_string.replace(":day", "\"" + day + "\"") 


    retrieve_user_info = sqlalchemy.text(text_string)
    result = db_conn.execute(retrieve_user_info)
    descriptions = []
    for row in result:
        descriptions.append(row[0])
    return descriptions
    
def summarize_day(user, day):
    description = retrive_daily_descriptions(user, day)
    summary = summarizer_client.describe_day(description)
    return summary

def summarize_week(user, start_day):
    date_format = "%Y-%m-%d"
    curr_date = datetime.strptime(start_day, date_format)
    summaries = {}
    for day in ["M", "T", "W", "Th", "F"]:
        summaries[day] = {}
        summaries[day]["summary"] = summarize_day(user, curr_date.strftime("%Y-%m-%d"))
        curr_date = curr_date + timedelta(days=1)
    return summaries


def bg_task_completion_export(base_64_image_array, userid):
    image_descriptions = image_client.explain_images(base_64_image_array)
    activities = image_client.convert(image_descriptions)
    insert_batch_metadata(userid, datetime.now())
    for i,activity in enumerate(activities):
        insert_batch_image_data(retrive_curr_batch(), activity["Description"] ,activity["Activity"], base_64_image_array[i])
    return activities


def respond_using_desc_context(descriptions, data):
    return summarizer_client.query_user_response(descriptions, data)

def query_and_rollback_on_error(query: str):
    try:
        db_conn.execute(sqlalchemy.text(query))
        db_conn.commit()
    except:
        db_conn.rollback()
        raise Exception("Query failed")