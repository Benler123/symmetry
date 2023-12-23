from abc import abstractmethod
import re 
from Models.LLM_Model import LLM_Model

class Image_Model(LLM_Model):
    @abstractmethod 
    def explain_images(self, base64_images):
        pass
    
