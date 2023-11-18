import base64
import requests
import os
import re 
import json

prompt = """ For each screenshot extract the following. Activity is the activity being performed in the screenshot. Description is a more detailed explanation of what is going on. For the activity, there are only 5 classifications. For activity, each screenshot needs to be labeled as one of the following [Coding, Browsing, Meeting,  Communicating, Scheduling, Chatting, Off-Topic]. 

Communicating would be when someone has an application like microsoft teams open to the chat bar, or slack messages, or discord. Meeting would be if the user appears to be on zoom or in some sort of video conference. Scheduling is when a calendar type app is open.  Chatting is when an AI like ChatGPT or claude is open. For coding, make sure to note in the description what the overall project folder opened is and what the name of the file is that is being edited.


EXAMPLES: 


Example input 1

\{screenshot.png\}(imagine this example image is a screenshot of someone editing helloworld.py in vscode but it is half complete)


Output:

Activity : Programming

Description: Visual studio code is opened and helloworld.py is being written. It appears to be in progress.



Example input 2:

\{screenshot2.png\}(imagine this is a screenshot of stack overflow looking at  fixing a valueerror)


Output:

Activity: Browsing

Description: Stack overflow is open in the web browser being looked at The current page is looking at how to fix a valueerror in python"""



# OpenAI API Key

def explain_images(base64_images, prompt=prompt, api_key=os.environ.get("OPENAI_API_KEY")):
    # Setting up headers for the API request
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    # Constructing the payload with multiple images
    payload = {
        "model": "gpt-4-vision-preview",
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": prompt
                    }
                ] + [{"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{image}"}} for image in base64_images]
            }
        ],
        "max_tokens": 300
    }

    # Sending the request and returning the response
    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload).json()
    return response["choices"][0]["message"]["content"]

def convert(input_string):
    pattern = r'Activity: (.*?)\nDescription: (.*?)(?=\n\n|\Z)'
    matches = re.findall(pattern, input_string, re.DOTALL)
    activities = [{"Activity": activity, "Description": desc.strip()} for activity, desc in matches]
    return activities