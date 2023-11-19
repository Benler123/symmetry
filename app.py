from fastapi import FastAPI, HTTPException, Body, BackgroundTasks
from typing import List, Dict
import base64
from gpt_client import bg_task_completion_export
import uvicorn

app = FastAPI()

capturing = True

@app.get("/")
def index():
    return "RETURN"

@app.post("/upload")
def upload(background_tasks: BackgroundTasks, data: Dict[str, List[str]] = Body(...)):
    global capturing
    if not capturing:
        raise HTTPException(status_code=400, detail="not accepting batches of images")
    
    if not data.get("images") or len(data.get("images")) == 0:
        raise HTTPException(status_code=400, detail="No Images")
    image_list = data["images"]
    background_tasks.add_task(bg_task_completion_export, image_list)
    return

@app.get("/set_capture/{capture}")
def set_access(capture: str):
    global capturing
    if capture.lower() == "y" or capture.lower() == "yes":
        capturing = True
        return "now capturing"
    elif capture.lower() == "n" or capture.lower() == "no":
        capturing = False
        return "no longer capturing"
    raise HTTPException(status_code=400, detail="Input must be yes/y or no/n")

@app.get("/test")
def test():
    return "API WORKED"

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001, debug=True)
