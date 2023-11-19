from fastapi import FastAPI, HTTPException, Body, BackgroundTasks
from typing import List, Dict
import base64
from db_connector import bg_task_completion_export
from db_connector import retrieve_user_data, retrieve_all_primary, retrieve_all_image_table, clear_database, summarize_day, retrieve_user_category_data_by_week, retrive_daily_descriptions, summarize_week
import uvicorn
from prompts import USER_CHAT_PROMPT_PREFIX, USER_CHAT_PROMPT_SUFFIX
import requests
import os
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
    print("Lol")
    background_tasks.add_task(bg_task_completion_export, image_list, data.get("user"))
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

@app.get("/day_user_chat/{user}/{start_date}")
def get_query_response(user, start_date, data = Body(...)):
    data = str(data)
    api_key = os.environ.get("OPENAI_API_KEY")
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }
    desc = retrive_daily_descriptions(user, start_date)
    desc_prompt = "\n".join(desc)
    chat_prompt = USER_CHAT_PROMPT_PREFIX + desc_prompt + USER_CHAT_PROMPT_SUFFIX + data
    payload = {
        "model": "gpt-3.5-turbo-16k",
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": chat_prompt
                    }
                ]
            }
        ],
        "max_tokens": 512
    }
    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload).json()
    return response["choices"][0]["message"]["content"]

@app.get("/summarize_user_descriptions/{user}/{start_date}")
def summarize_daily_user_descriptions(user, start_date):
    return summarize_day(user, start_date)

@app.get("/matts_endpoint/{user}/{start_date}")
def matts_endpoint(user, start_date):
    dict = retrieve_user_category_data_by_week(user, start_date)
    dict2 = summarize_week(user, start_date)
    for key in dict:
        dict[key]["summary"] = dict2[key]["summary"]
    return dict

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001, debug=True)

