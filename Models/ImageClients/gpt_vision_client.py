from Models.Image_Model import Image_Model  
import requests
import os
import re 
import json
from prompts import ACTIVITY_CAPTURE_PROMPT as prompt 


class gpt_vision_client(Image_Model):
    def __init__(self, api_key=os.environ.get("OPENAI_API_KEY")) -> None:
        self.api_key = api_key
        self.prompt = prompt
        
    def explain_images(self, base64_images):
        # Setting up headers for the API request
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
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
                            "text": self.prompt
                        }
                    ] + [{"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{image}"}} for image in base64_images]
                }
            ],
            "max_tokens": 1024
        }
        with(open("payload.json", "w")) as f:
            json.dump(payload, f)
        # Sending the request and returning the response
        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload).json()
        print(response)
        return response["choices"][0]["message"]["content"]
