from app import db
from datetime import datetime
from wtforms import Form, StringField
from wtforms.validators import *
from .basemodel import BaseModel
from ..helpers.utils import OptionalButNotEmpty
from ..helpers.utils import OptionalNullable


class Assignments(db.Model):
    __tablename__ = 'assignments'
    id = db.Column("id", db.Integer, primary_key=True, autoincrement=True)
    year = db.Column("year", db.String)
    term = db.Column("term", db.String)
    subject = db.Column("subject", db.String)
    asignment_name = db.Column("asignment_name", db.String)
    file = db.Column("file", db.String)
    instructions = db.Column("instructions", db.String)
    
    def _asdict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class AssignmentsAddForm(Form):
    year = StringField('Year', [OptionalNullable()])
    term = StringField('Term', [InputRequired()])
    subject = StringField('Subject', [InputRequired()])
    asignment_name = StringField('Asignment Name', [InputRequired()])
    file = StringField('File', [InputRequired()])
    instructions = StringField('Instructions', [InputRequired()])


class AssignmentsEditForm(Form):
    year = StringField('Year', [OptionalNullable()])
    term = StringField('Term', [OptionalButNotEmpty()])
    subject = StringField('Subject', [OptionalButNotEmpty()])
    asignment_name = StringField('Asignment Name', [OptionalButNotEmpty()])
    file = StringField('File', [OptionalButNotEmpty()])
    instructions = StringField('Instructions', [OptionalButNotEmpty()])
