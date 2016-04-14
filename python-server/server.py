from flask import Flask
from flask import request
from settings import SETTINGS
from db import db, Activity, Claim, Tag
import json

# basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)


@app.route('/')
def home():
    return 'Hello World!'


@app.route('/activity/in', methods=['POST'])
def activity_checkin():
    body = request.json
    # return json.dumps(body)
    # Get tag by tag_code
    tag = db.session.query(Tag).filter(Tag.code == body['tag_code']).first()
    if tag is None:
        tag = Tag(body['tag_code'])
        db.session.add(tag)

    activity = Activity(tag)
    db.session.add(activity)
    db.session.commit()
    return str(activity.id)


@app.route('/activity/out', methods=['POST'])
def activity_checkout(tag_id):
    return "POST: {0} action out".format(tag_id)

if __name__ == '__main__':
    app.run(debug=SETTINGS['DEBUG'])
