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

def insert_batch_metadata(db_conn, device, timestamp):

    # insert data into our ratings table
    insert_primary = sqlalchemy.text(
        "INSERT INTO data (device, timestamp) VALUES (:device, :timestamp)",
    )

    db_conn.execute(insert_primary, parameters={"device": device,
                                                "timestamp" :timestamp})

def insert_batch_image_data(db_conn, batch_id, description, category, base64_image):
    insert_images = sqlalchemy.text(
        "INSERT INTO ImageTable (batch_id, decription, category, base64_image)"
        )
    
    db_conn.execute(insert_images, parameters={"batch_id":batch_id, 
                                               "description": description,
                                                "category": category,
                                                "base64_image": base64_image})



