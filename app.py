from fastapi import FastAPI, HTTPException, Body, BackgroundTasks
from typing import List, Dict
import base64
from gpt_client import bg_task_completion_export
from db_connector import retrieve_user_data, retrieve_all_primary, retrieve_all_image_table, clear_database, retrieve_user_category_data_by_day, retrieve_user_category_data_by_week, retrive_daily_descriptions
import uvicorn

app = FastAPI()

not_capturing = set()

@app.get("/")
def index():
    return "RETURN"

@app.post("/upload")
def upload(background_tasks: BackgroundTasks, data = Body(...)):
    if data.get("user") in not_capturing:
        raise HTTPException(status_code=400, detail="not accepting batches of images")
    
    if not data.get("images") or len(data.get("images")) == 0:
        raise HTTPException(status_code=400, detail="No Images")
    image_list = data["images"]
    background_tasks.add_task(bg_task_completion_export, image_list)
    return

@app.get("/set_capture/{user}/{capture}")
def set_access(user: str,capture: str):
    global capturing
    if capture.lower() == "y" or capture.lower() == "yes":
        if user in not_capturing:
            not_capturing.remove(user)
        return "now capturing"
    elif capture.lower() == "n" or capture.lower() == "no":
        not_capturing.add(user)
        return "no longer capturing"
    raise HTTPException(status_code=400, detail="Input must be yes/y or no/n")

@app.get("/user_data/{user}") 
def get_user_data(user):
    if not user:
        return "must input a user"
    return retrieve_user_data(user)

@app.get("/all_meta_data")
def get_all_meta_data():
    return retrieve_all_primary()

@app.get("/all_image_data")
def get_all_image_data():
    return retrieve_all_image_table()

@app.post("/clear")
def clear_all_data():
    clear_database()

@app.get("/test")
def test():
    return "API WORKED"

@app.get("/get_team_hours")
def get_team_hours():
    return {"Coding": 7, "Browsing": 10, "Meeting": 5,  "Communicating": 4, "Scheduling": 12, "Chatting": 10, "Off-Topic" : 3}


@app.get("/week_user_data/{user}/{start_date}")
def get_week_user_data(user, start_date):
    return retrieve_user_category_data_by_week(user, start_date)

@app.get("/daily_user_descriptions/{user}/{start_date}")
def get_daily_user_descriptions(user, start_date):
    return retrive_daily_descriptions(user, start_date)


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001, debug=True)

