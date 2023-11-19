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

@app.get("/get_chat{query}")
def get_daily_user_descriptions(user, start_date):
    return retrive_daily_descriptions(user, start_date)



@app.get("/chat_with_knowledge/{question}")
def chat_with_knowledge(question):
    api_key = os.environ.get("OPENAI_API_KEY")
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    } 
    chat_prompt = "Answer the following question based on the remaining information in the prompt. \n\nQuestion: " + question + """\n\nAnswer:
1. **Ben (Designer)**
   - **PowerPoint and Video Presentation**: Ben definitely took charge of creating the PowerPoint and video presentation. His design skills and experience in consulting would have ensured that the presentation was not only visually appealing but also effectively conveyed the app's purpose.
   - **Figma Designs**: Ben certainly created the Figma designs for the app, focusing on making the user interface both attractive and user-friendly.

2. **Matt (Web Developer)**
   - **React JS Front End**: Matt surely handled the development of the front end using React JS, turning Ben's designs into a functional user interface.
   - **Front-Back End Connection**: Matt also definitely worked on integrating the front end with the back end, ensuring that the app worked smoothly as a whole.

3. **Dhruv (System Design and Architecture Expert)**
   - **API Design**: Dhruv undoubtedly led the API design, using his expertise in system architecture to create efficient and scalable APIs.
   - **System Level Image Capturing Daemon**: Additionally, Dhruv was likely responsible for the development of the system-level image capturing daemon, ensuring it was well-integrated into the overall system architecture.

4. **Tyler (Software Engineer)**
   - **Client-Server Interaction**: Tyler certainly focused on the client-server interactions, especially the app's efficiency and responsiveness in communication with the server.
   - **Cloud Integration**: He definitely managed the integration with the Google Cloud Platform SQL database, overseeing secure and efficient data storage and retrieval."""
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
        "max_tokens": 4096
    }
    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload).json()
    return response["choices"][0]["message"]["content"]



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
    daySummaries = {
    "M": {
        "summary": "Tyler came in at 11AM and watched Youtube for two hours, then left the office.",
        "activities": {
            "Coding": 3,
            "Browsing": 1,
            "Meeting": 2,
            "Communicating": 1,
            "Off-Topic": 1
        }
    },
    "T": {
        "summary": "Tyler was intensely focused on Tuesday, editing mod-sim.c. Later in the day, he was working on a file called assignment.py while looking at a PDF called machine_learning.pdf. He also messaged a few peers on teams for academic help",
        "activities": {
            "Coding": 4,
            "Browsing": 1,
            "Scheduling": 2,
            "Communicating": 1
        }
    },
    "W": {
        "summary": "In the morning Tyler had a meeting. This seemingly took 2 hours of capture. These meetings seemed to be about strategic alignment of his group project",
        "activities": {
            "Meeting": 2,
            "Communicating": 2,
            "Scheduling": 2,
            "Chatting": 2
        }
    },
    "Th": {
        "summary": "Tyler collaborated a lot on Thursday. He synced up with his hackathon team and his mobile apps group.  He spent the day collectively addressing challenges with these groups.",
        "activities": {
            "Meeting": 3,
            "Communicating": 3,
            "Chatting": 2
        }
    },
    "F": {
        "summary": "On Friday Tyler wrapped up some quick tasks and prepared for the next week. He scheduled meetings for next week, discussed with his research professor, and met with his hackathon group",
        "activities": {
            "Coding": 2,
            "Browsing": 1,
            "Scheduling": 2,
            "Communicating": 2,
            "Off-Topic": 1
        }
    }
}
    return daySummaries
    print("endpoint is running")
    dict = retrieve_user_category_data_by_week(user, start_date)
    dict2 = summarize_week(user, start_date)
    for key in dict:
        dict[key]["summary"] = dict2[key]["summary"]
    return dict

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001, debug=True)

