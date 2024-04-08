from app import db
from datetime import datetime
from wtforms import Form, StringField
from wtforms.validators import *
from .basemodel import BaseModel
from ..helpers.utils import OptionalButNotEmpty


class Classes(db.Model):
    __tablename__ = 'classes'
    id = db.Column("id", db.Integer, primary_key=True, autoincrement=True)
    class_name = db.Column("class_name", db.String)
    class_teacher = db.Column("class_teacher", db.String)
    
    def _asdict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class ClassesAddForm(Form):
    class_name = StringField('Class Name', [InputRequired()])
    class_teacher = StringField('Class Teacher', [InputRequired()])


class ClassesEditForm(Form):
    class_name = StringField('Class Name', [OptionalButNotEmpty()])
    class_teacher = StringField('Class Teacher', [OptionalButNotEmpty()])
