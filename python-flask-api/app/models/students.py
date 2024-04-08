from app import db
from datetime import datetime
from wtforms import Form, StringField
from wtforms.validators import *
from .basemodel import BaseModel
from ..helpers.utils import OptionalButNotEmpty


class Students(db.Model):
    __tablename__ = 'students'
    id = db.Column("id", db.Integer, primary_key=True, autoincrement=True)
    fullname = db.Column("fullname", db.String)
    dob = db.Column("dob", db.DateTime)
    gender = db.Column("gender", db.String)
    residence = db.Column("residence", db.String)
    phone = db.Column("phone", db.String)
    email = db.Column("email", db.String)
    
    def _asdict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class StudentsAddForm(Form):
    fullname = StringField('Fullname', [InputRequired()])
    dob = StringField('Dob', [InputRequired()])
    gender = StringField('Gender', [InputRequired()])
    residence = StringField('Residence', [InputRequired()])
    phone = StringField('Phone', [InputRequired()])
    email = StringField('Email', [InputRequired(),Email()])


class StudentsEditForm(Form):
    fullname = StringField('Fullname', [OptionalButNotEmpty()])
    dob = StringField('Dob', [OptionalButNotEmpty()])
    gender = StringField('Gender', [OptionalButNotEmpty()])
    residence = StringField('Residence', [OptionalButNotEmpty()])
    phone = StringField('Phone', [OptionalButNotEmpty()])
    email = StringField('Email', [OptionalButNotEmpty(),Email()])
