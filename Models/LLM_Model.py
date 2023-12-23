from abc import ABC
import re 

class LLM_Model(ABC):
    @staticmethod
    def convert(input_string):
        pattern = r'Activity: (.*?)\nDescription: (.*?)(?=\n\n|\Z)'
        matches = re.findall(pattern, input_string, re.DOTALL)
        activities = [{"Activity": activity, "Description": desc.strip()} for activity, desc in matches]
        return activities