from app import db
from datetime import datetime
from wtforms import Form, StringField
from wtforms.validators import *
from .basemodel import BaseModel
from ..helpers.utils import OptionalButNotEmpty


class Subjects(db.Model):
    __tablename__ = 'subjects'
    id = db.Column("id", db.Integer, primary_key=True, autoincrement=True)
    subject_name = db.Column("subject_name", db.String)
    hod = db.Column("hod", db.String)
    
    def _asdict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class SubjectsAddForm(Form):
    subject_name = StringField('Subject Name', [InputRequired()])
    hod = StringField('Hod', [InputRequired()])


class SubjectsEditForm(Form):
    subject_name = StringField('Subject Name', [OptionalButNotEmpty()])
    hod = StringField('Hod', [OptionalButNotEmpty()])
