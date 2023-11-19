from google.cloud.sql.connector import Connector
import sqlalchemy
from queries import *

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
    insert_primary = sqlalchemy.text(
        "INSERT INTO data (device, timestamp) VALUES (:device, :timestamp)",
    )

    db_conn.execute(insert_primary, parameters={"device": device,
                                                "timestamp" :timestamp})
    
    db_conn.commit()

    
def clear_database():

    
    db_conn.execute(sqlalchemy.text(
        "DELETE FROM data"
    ))
    db_conn.execute(sqlalchemy.text(
        "DELETE FROM ImageTable"
    ))

    reset_counter = sqlalchemy.text(
        "ALTER TABLE (:table) AUTO_INCREMENT = 1;"
    )

    db_conn.execute(sqlalchemy.text("ALTER TABLE data AUTO_INCREMENT = 1;"))
    db_conn.execute(sqlalchemy.text("ALTER TABLE ImageTable AUTO_INCREMENT = 1;"))

    db_conn.commit()




def insert_batch_image_data(batch_id, description, category, base64_image):
    insert_images = sqlalchemy.text(
        "INSERT INTO ImageTable (batch_id, description, category, base64_image) VALUES (:batch_id, :description, :category, :base64_image)"
        )
    
    db_conn.execute(insert_images, parameters={"batch_id":batch_id, 
                                               "description": description,
                                                "category": category,
                                                "base64_image": base64_image})
    
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
    retrieve_user_info = sqlalchemy.text("""
        SELECT ImageTable.category, COUNT(*) as category_count
        FROM ImageTable
        JOIN data ON data.batch_id = ImageTable.batch_id
        WHERE data.device = (:user) 
        GROUP BY ImageTable.category;
    """)
    
    result = db_conn.execute(retrieve_user_info, parameters={"user": user})
    dict = {}
    for category, frequency in result:
        dict[category] = frequency
    return dict

def retrieve_user_category_data_by_day(user, day):
    retrieve_user_info = sqlalchemy.text("""
        SELECT ImageTable.category, COUNT(*) as category_count
        FROM ImageTable
        JOIN data ON data.batch_id = ImageTable.batch_id
        WHERE data.device = (:user)
        AND DATE(data.timestamp) = (:day)
        GROUP BY ImageTable.category;
    """)

    result = db_conn.execute(retrieve_user_info, parameters={"user": user, "day": day})
    dict = {}
    for category, frequency in result:
        dict[category] = frequency
    return dict
