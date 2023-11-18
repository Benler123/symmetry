from flask import Flask, request, render_template, jsonify
import base64
from gpt_client import explain_images


app = Flask(__name__)

@app.route('/')
def index():
    return "RETURN"

'''
{“images” : [“ashdfuysdgfuygsdyfgsydfb”, “ahsdgyagdyuagdyagsduyba”, “useyrtywrhtsdnfks”]} 
'''

@app.route('/upload', methods=['POST'])
def upload():
    data = request.get_json()
    if not data.get("images") or len(data.get("images")) == 0:
        return "No Images", 400

    return data["images"]

@app.route('/test')
def test():
    return "API WORKED"

if __name__ == "__main__":
    app.run(port=8001, debug=True)

# def encode_image(image_path):
#   with open(image_path, "rb") as image_file:
#     return base64.b64encode(image_file.read()).decode('utf-8')
        


