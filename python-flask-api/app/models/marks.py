from app import db
from datetime import datetime
from wtforms import Form, StringField
from wtforms.validators import *
from .basemodel import BaseModel
from ..helpers.utils import OptionalButNotEmpty
from ..helpers.utils import OptionalNullable


class Marks(db.Model):
    __tablename__ = 'marks'
    id = db.Column("id", db.Integer, primary_key=True, autoincrement=True)
    year = db.Column("year", db.String)
    term = db.Column("term", db.Integer)
    uid = db.Column("uid", db.Integer)
    maths = db.Column("maths", db.Integer)
    english = db.Column("english", db.Integer)
    kiswahili = db.Column("kiswahili", db.Integer)
    chemistry = db.Column("chemistry", db.Integer)
    biology = db.Column("biology", db.Integer)
    physics = db.Column("physics", db.Integer)
    history = db.Column("history", db.Integer)
    geography = db.Column("geography", db.Integer)
    cre = db.Column("cre", db.Integer)
    business = db.Column("business", db.Integer)
    computer = db.Column("computer", db.Integer)
    form = db.Column("form", db.String)
    
    def _asdict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class MarksAddForm(Form):
    year = StringField('Year', [InputRequired()])
    term = StringField('Term', [InputRequired()])
    uid = StringField('Uid', [InputRequired()])
    form = StringField('Form', [OptionalNullable()])
    maths = StringField('Maths', [InputRequired()])
    english = StringField('English', [InputRequired()])
    kiswahili = StringField('Kiswahili', [InputRequired()])
    chemistry = StringField('Chemistry', [InputRequired()])
    biology = StringField('Biology', [InputRequired()])
    physics = StringField('Physics', [InputRequired()])
    history = StringField('History', [InputRequired()])
    geography = StringField('Geography', [InputRequired()])
    cre = StringField('Cre', [InputRequired()])
    business = StringField('Business', [InputRequired()])
    computer = StringField('Computer', [InputRequired()])


class MarksEditForm(Form):
    year = StringField('Year', [OptionalButNotEmpty()])
    term = StringField('Term', [OptionalButNotEmpty()])
    uid = StringField('Uid', [OptionalButNotEmpty()])
    form = StringField('Form', [OptionalNullable()])
    maths = StringField('Maths', [OptionalButNotEmpty()])
    english = StringField('English', [OptionalButNotEmpty()])
    kiswahili = StringField('Kiswahili', [OptionalButNotEmpty()])
    chemistry = StringField('Chemistry', [OptionalButNotEmpty()])
    biology = StringField('Biology', [OptionalButNotEmpty()])
    physics = StringField('Physics', [OptionalButNotEmpty()])
    history = StringField('History', [OptionalButNotEmpty()])
    geography = StringField('Geography', [OptionalButNotEmpty()])
    cre = StringField('Cre', [OptionalButNotEmpty()])
    business = StringField('Business', [OptionalButNotEmpty()])
    computer = StringField('Computer', [OptionalButNotEmpty()])
