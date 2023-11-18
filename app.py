from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return "RETURN"

@app.route('/upload', methods=['POST'])
def upload():
    if not request.files:
        return "No File"
    for filename in request.files:
        file = request.files[filename]
        if filename != ' ':
            return filename

@app.route('/test')
def test():
    return "API WORKED"

if __name__ == "__main__":
    app.run(port=8000, debug=True)

# def encode_image(image_path):
#   with open(image_path, "rb") as image_file:
#     return base64.b64encode(image_file.read()).decode('utf-8')
        


