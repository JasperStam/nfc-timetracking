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

    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'))
    tag = db.relationship('Tag',
        backref=db.backref('activities', lazy='dynamic'))

    claim_id = db.Column(db.Integer, db.ForeignKey('claim.id'))
    claim = db.relationship('Claim',
        backref=db.backref('activities', lazy='dynamic'))

    def __init__(self, tag, claim=None, started_at=None, ended_at=None):
        self.tag = tag
        self.claim = claim
        if started_at is None:
            started_at = datetime.utcnow()
        self.ended_at = ended_at

    def __repr__(self):
        return '<Activity %r>' % self.id


class Claim(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    description = db.Column(db.Text())
    created_at = db.Column(db.DateTime)

    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'))
    tag = db.relationship('Tag',
        backref=db.backref('claims', lazy='dynamic'))

    activities = db.relationship('Activity',
        backref=db.backref('claim', lazy='dynamic'))

    def __init__(self, title, tag, description='', created_at=None):
        self.title = title
        self.tag = tag
        self.description = description
        if created_at is None:
            created_at = datetime.utcnow()

    def __repr__(self):
        return '<Claim %r>' % self.title


class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))

    activities = db.relationship('Activity',
        backref=db.backref('tag', lazy='dynamic'))

    claims = db.relationship('Claim',
        backref=db.backref('tag', lazy='dynamic'))

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Tag %r>' % self.name
