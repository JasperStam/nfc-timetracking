from flask import Flask
from flask import request
from settings import SETTINGS
from db import db, Activity, Claim, Tag
from datetime import datetime
import json

# basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)


@app.route('/')
def home():
    return 'Hello World!'


@app.route('/activity/in', methods=['POST'])
def activity_checkin():
    body = request.json
    # Get tag by tag_code
    tag = db.session.query(Tag).filter(Tag.code == body['tag_code']).first()
    if not tag:
        tag = Tag(body['tag_code'])
        db.session.add(tag)

    activity = Activity.get_latest_by_tag_id(db.session, tag.id)

    if activity and not activity.ended_at:
        return "Activity {0} still open for this tag".format(activity.id)

    # if activity in progress for tag, close it
    # if claim for tag exists, set that claim id
    activity = Activity(tag)
    db.session.commit()
    return str(activity.id)


@app.route('/activity/out', methods=['POST'])
def activity_checkout():
    body = request.json
    tag = db.session.query(Tag).filter(Tag.code == body['tag_code']).first()
    if not tag:
        return 'Tag {0} not found!'.format(body['tag_code'])

    activity = Activity.get_latest_by_tag_id(db.session, tag.id)

    if activity.ended_at:
        return 'Activity {0} already checked out'.format(activity.id)

    activity.ended_at = datetime.utcnow()
    db.session.commit()
    return str(activity.id)

if __name__ == '__main__':
    app.run(debug=SETTINGS['DEBUG'])
