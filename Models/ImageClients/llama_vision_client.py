from Models.Image_Model import Image_Model  
import requests
import os
import re 
import time
import json
from prompts import ACTIVITY_CAPTURE_PROMPT as prompt 

class llama_vision_client(Image_Model):
    def __init__(self, BASE_URI='https://sbg69x9tdmmurm-5000.proxy.runpod.net', STREAM=False):
        self.BASE_URI = BASE_URI

    def explain_images(self, base64_images):
        image_texts = [self.explain_single_image(image) for image in base64_images] 
        return image_texts[0]

  


    def explain_single_image(self, base64_image):
        payload = {
        'model_path': 'liuhaotian/llava-v1.5-7b',
        'image_base64': base64_image,
        'prompt': 'What is going on in this image',
        'temperature': 0.2,
        'max_new_tokens': 512,
        'stream': False
    }
        
        r = requests.post(
        f'{self.BASE_URI}/inference',
        json=payload,
    )
        # print(f'Status code: {r.status_code}')
    
        resp_json = r.json()
        return resp_json['response']
 