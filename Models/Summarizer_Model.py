from abc import ABC, abstractmethod
import re 
from Models.LLM_Model import LLM_Model

class Summarizer_Model(LLM_Model):
    @abstractmethod 
    def describe_day(self, descriptions):
        pass
    @abstractmethod
    def query_user_response(self, descriptions, data):
        pass
