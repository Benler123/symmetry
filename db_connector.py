from google.cloud.sql.connector import Connector
import sqlalchemy
from queries import *
from datetime import datetime, timedelta

project_id = "fast-gate-405518"
region = "us-central1"
instance_name = "symmetry"

INSTANCE_CONNECTION_NAME = f"{project_id}:{region}:{instance_name}" # i.e demo-project:us-central1:demo-instance
print(f"Your instance connection name is: {INSTANCE_CONNECTION_NAME}")
DB_USER = "chef"
DB_PASS = "food"
DB_NAME = "symmetry_db"

connector = Connector()

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
    # create ratings table in our sandwiches database
    db_conn.execute(
    sqlalchemy.text(
        create_primary_table
    )
    )

    # commit transaction (SQLAlchemy v2.X.X is commit as you go)
    db_conn.commit()

    db_conn.execute(
    sqlalchemy.text(
        create_second_table
    )
    )

    db_conn.commit()

def insert_batch_metadata(device, timestamp):

    # insert data into our ratings table
    text_string = "INSERT INTO data (device, timestamp) VALUES (:device, :timestamp)"
    text_string = text_string.replace(":device", "\"" + device + "\"")
    text_string = text_string.replace(":timestamp", "\"" + timestamp + "\"")

    insert_primary = sqlalchemy.text(
        text_string,
    )

    db_conn.execute(insert_primary)
    
    db_conn.commit()

    
def clear_database():

    

    db_conn.execute(sqlalchemy.text(
        "DELETE FROM ImageTable"
    ))
    db_conn.execute(sqlalchemy.text(
        "DELETE FROM data"
    ))


    db_conn.execute(sqlalchemy.text("ALTER TABLE data AUTO_INCREMENT = 1;"))
    db_conn.execute(sqlalchemy.text("ALTER TABLE ImageTable AUTO_INCREMENT = 1;"))

    db_conn.commit()




def insert_batch_image_data(batch_id, description, category, base64_image):
    text_string = "INSERT INTO ImageTable (batch_id, description, category, base64_image) VALUES (:batch_id, :description, :category, :base64_image)"
    text_string = text_string.replace(":batch_id", "\"" + str(batch_id) + "\"")
    text_string = text_string.replace(":description", "\"" + description + "\"")
    text_string = text_string.replace(":category", "\"" + category + "\"")
    text_string = text_string.replace(":base64_image", "\"" + base64_image + "\"")


    insert_images = sqlalchemy.text(text_string)
    
    db_conn.execute(insert_images)
    
    db_conn.commit()

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
        dict[category] = frequency
    return dict


def retrieve_user_category_data_by_week(user, start_day):
    date_format = "%Y-%m-%d"
    curr_date = datetime.strptime(start_day, date_format)
    week_dict = {}
    for i in range(7):
        week_dict[curr_date] = retrieve_user_category_data_by_day(user, date_format)
        curr_date = curr_date + timedelta(days=1)


def retrive_daily_descriptions(user, day):
    text_string = """
        SELECT ImageTable.description
        FROM ImageTable
        JOIN data ON data.batch_id = ImageTable.batch_id
        WHERE data.device = (:user)
        AND DATE(data.timestamp) = (:day)
    """

    text_string = text_string.replace(":user", "\"" + user + "\"")
    text_string = text_string.replace(":day", "\"" + day + "\"")

    retrieve_user_info = sqlalchemy.text(text_string)

    return db_conn.execute(retrieve_user_info)


# result = retrive_daily_descriptions("Ben Steele", "2023-11-19")
# for row in result:
#     print(row)