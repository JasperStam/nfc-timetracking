from flask import Flask
from settings import SETTINGS
from db import Activity
from db import Claim
from db import Tag

# basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)


@app.route('/')
def home():
    return 'Hello World!'


@app.route('/activity/<int:tag_id>/in', methods=['POST'])
def activity_checkin(tag_id):
    # find the tag by tag_id
    # create a new Activity model with tag
    return "POST: {0} action in".format(tag_id)


@app.route('/activity/<int:tag_id>/out', methods=['POST'])
def activity_checkout(tag_id):
    return "POST: {0} action out".format(tag_id)

if __name__ == '__main__':
    app.run(debug=SETTINGS['DEBUG'])
