import requests
import os
import re 
import json
from prompts import ACTIVITY_CAPTURE_PROMPT as prompt
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
        "max_tokens": 1024
    }
    # Sending the request and returning the response
    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload).json()
    return response["choices"][0]["message"]["content"]

def convert(input_string):
    pattern = r'Activity: (.*?)\nDescription: (.*?)(?=\n\n|\Z)'
    matches = re.findall(pattern, input_string, re.DOTALL)
    activities = [{"Activity": activity, "Description": desc.strip()} for activity, desc in matches]
    return activities

def bg_task_completion_export(base_64_image_array):
    activities = convert(explain_images(base_64_image_array))
    return activities