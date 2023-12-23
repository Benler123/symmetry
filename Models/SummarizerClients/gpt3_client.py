import requests
import os
from fastapi import Body
import re 
import json
from prompts import DESCRIPTION_PROMPT as dp
from prompts import USER_CHAT_PROMPT_PREFIX, USER_CHAT_PROMPT_SUFFIX
from Models.Summarizer_Model import Summarizer_Model

class gpt3_client(Summarizer_Model):
    def __init__(self, api_key=os.environ.get("OPENAI_API_KEY"), description_prompt=dp) -> None:
        self.api_key = api_key
        self.description_prompt = description_prompt

    def query_user_response(self, descriptions, data):
        data = str(data)
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }
        desc_prompt = "\n".join(descriptions)
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


    def describe_day(self, descriptions):
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }
        payload = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": self.description_prompt 
                        }
                    ]
                }, {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": ', '.join(str(x) for x in descriptions)
                        }
                    ]
                }
            ],
            "max_tokens": 1024
        }

        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload).json()
        return response["choices"][0]["message"]["content"]
