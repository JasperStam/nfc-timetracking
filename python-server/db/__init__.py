from flask import Flask
from settings import SETTINGS
from flask_sqlalchemy import SQLAlchemy
# import models
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + SETTINGS['DB_FILE']
db = SQLAlchemy(app)


class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    started_at = db.Column(db.DateTime)
    ended_at = db.Column(db.DateTime)
    description = db.Column(db.Text())

    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'))
    tag = db.relationship('Tag',
        backref=db.backref('activities', lazy='dynamic'))

    claim_id = db.Column(db.Integer, db.ForeignKey('claim.id'))
    claim = db.relationship('Claim',
        backref=db.backref('activities', lazy='dynamic'))

    def __init__(self, tag, claim=None, description='', started_at=None, ended_at=None):
        self.tag = tag
        self.claim = claim
        self.description = description
        if started_at is None:
            started_at = datetime.utcnow()
        self.started_at = started_at
        self.ended_at = ended_at

    def __repr__(self):
        return '<Activity %r>' % self.id

    @staticmethod
    def get_latest_by_tag_id(session, tag_id):
        return (
            session.query(Activity)
            .filter(Activity.tag_id == tag_id)
            .order_by(Activity.started_at.desc())
            .first()
        )





class Claim(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    description = db.Column(db.Text())
    created_at = db.Column(db.DateTime)

    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'))
    tag = db.relationship('Tag',
        backref=db.backref('claims', lazy='dynamic'))

    def __init__(self, title, tag, description='', created_at=None):
        self.title = title
        self.tag = tag
        self.description = description
        if created_at is None:
            created_at = datetime.utcnow()
        self.created_at = created_at

    def __repr__(self):
        return '<Claim %r>' % self.title


class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(50))
    description = db.Column(db.String(200))

    def __init__(self, code, description=''):
        self.code = code
        self.description = description

    def __repr__(self):
        return '<Tag %r>' % self.name

