from flask import Flask, request, render_template, jsonify
import base64
from gpt_client import explain_images


app = Flask(__name__)

@app.route('/')
def index():
    return "RETURN"

@app.route('/upload', methods=['POST'])
def upload():
    batch_json = {}
    batch_json["images"] = {}
    if not request.files:
        return "No File"
    base64_images = list()
    for filename in request.files:
        if filename != ' ':
            file = request.files[filename]
            file_content = file.read()
            base64_content = base64.b64encode(file_content)
            base64_content_string = base64_content.decode('utf-8')
            base64_images.append(base64_content_string)
    return jsonify(batch_json)

@app.route('/test')
def test():
    return "API WORKED"

if __name__ == "__main__":
    app.run(port=8001, debug=True)

# def encode_image(image_path):
#   with open(image_path, "rb") as image_file:
#     return base64.b64encode(image_file.read()).decode('utf-8')
        


