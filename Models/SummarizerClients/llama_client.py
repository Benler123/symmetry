import requests
import os
from fastapi import Body
import re 
import json
from prompts import DESCRIPTION_PROMPT as dp
from prompts import USER_CHAT_PROMPT_PREFIX, USER_CHAT_PROMPT_SUFFIX
from Models.Summarizer_Model import Summarizer_Model

class llama_client(Summarizer_Model):
    def __init__():
        pass

    def query_user_response(self, descriptions, data):
        raise NotImplementedError("This method is not implemented")