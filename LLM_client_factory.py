from Models.Image_Model import Image_Model
from Models.Summarizer_Model import Summarizer_Model
from Models.ImageClients.gpt_vision_client import gpt_vision_client
from Models.SummarizerClients.gpt3_client import gpt3_client

'''
Factory to create image and summarizer models. To add a new model, add a new function to the switcher dictionary.
'''
class LLM_client_factory:
    def  __init__(self):   
        self.client = None

    def generate_image_model(self, model: str) -> Image_Model:
        switcher = {
            "gpt": gpt_vision_client
        }
        
        func = switcher.get(model, lambda: "Invalid model")

        return func()

    def generate_summarizer_model(self, model:str) -> Summarizer_Model:
        switcher = {
            "gpt": gpt3_client
        }

        func = switcher.get(model, lambda: "Invalid model")

        return func()
