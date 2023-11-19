from fastapi import FastAPI, HTTPException, Body, BackgroundTasks
from typing import List, Dict
import base64
from gpt_client import bg_task_completion_export
from db_connector import retrieve_user_data, retrieve_all_primary, retrieve_all_image_table, clear_database
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

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001, debug=True)
