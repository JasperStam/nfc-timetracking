from flask import Flask
from settings import SETTINGS
app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello World!'

@app.route('/tag', methods=['POST'])
def tag():
    return 'Post a tag or something'

if __name__ == '__main__':
    app.run(debug=SETTINGS['DEBUG'])
