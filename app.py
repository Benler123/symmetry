from flask import Flask, request, render_template, jsonify
import base64
from gpt_client import explain_images, convert


app = Flask(__name__)

capturing = True

@app.route('/')
def index():
    return "RETURN"

'''
{“images” : [“ashdfuysdgfuygsdyfgsydfb”, “ahsdgyagdyuagdyagsduyba”, “useyrtywrhtsdnfks”]} 
'''

@app.route('/upload', methods=['POST'])
def upload():
    global capturing
    if not capturing:
        return "not accepting batches of images", 400
    data = request.get_json()
    if not data.get("images") or len(data.get("images")) == 0:
        return "No Images", 400
    image_list = data["images"]
    gpt_output = explain_images(data["images"])
    parsed_gpt_output = convert(gpt_output)
    combined_dict = {}
    for i in range(len(image_list)):
        combined_dict[image_list[i]] = parsed_gpt_output[i]
    return jsonify(combined_dict)

@app.route('/set_capture/<capture>')
def set_access(capture):
    global capturing
    if capture.lower() == "y" or capture.lower() == "yes":
        capturing = True
        return "now capturing", 200
    elif capture.lower() == "n" or capture.lower() == "n":
        capturing = False
        return "no longer capturing", 200
    return "input was {} but needs to be yes/y or no/n", 400
    
@app.route('/test')
def test():
    return "API WORKED"

if __name__ == "__main__":
    app.run(port=8001, debug=True)

# def encode_image(image_path):
#   with open(image_path, "rb") as image_file:
#     return base64.b64encode(image_file.read()).decode('utf-8')
        


