
from flask import Blueprint
from flask import Blueprint
from sqlalchemy import text
from app import db, jsonify
from ..helpers.http_errors import InternalServerError
from ..helpers.utils import utils


Components_Data_blueprint = Blueprint('components_data', __name__)




@Components_Data_blueprint.route('/subject_option_list')
def subject_option_list():
    try:
        sqltext = text(f"""SELECT  DISTINCT subject_name AS value,subject_name AS label FROM subjects""")
        arr = db.session.execute(sqltext)
        
        return jsonify([dict(row) for row in arr])
    except Exception as ex:
        return InternalServerError(ex)


@Components_Data_blueprint.route('/class_teacher_option_list')
def class_teacher_option_list():
    try:
        sqltext = text(f"""SELECT fullname AS value,fullname AS label FROM teachers""")
        arr = db.session.execute(sqltext)
        
        return jsonify([dict(row) for row in arr])
    except Exception as ex:
        return InternalServerError(ex)


@Components_Data_blueprint.route('/hod_option_list')
def hod_option_list():
    try:
        sqltext = text(f"""SELECT  DISTINCT fullname AS value,fullname AS label FROM teachers""")
        arr = db.session.execute(sqltext)
        
        return jsonify([dict(row) for row in arr])
    except Exception as ex:
        return InternalServerError(ex)
from ..models.teachers import Teachers


@Components_Data_blueprint.route('/teachers_phone_exist/<value>')
def teachers_phone_exist(value = None):
    try:
        rec_exist = utils.is_unique(Teachers, "phone", value)
        if rec_exist:
            return jsonify("true")
        return jsonify("false")
    except Exception as ex:
        return InternalServerError(ex)


@Components_Data_blueprint.route('/teachers_email_exist/<value>')
def teachers_email_exist(value = None):
    try:
        rec_exist = utils.is_unique(Teachers, "email", value)
        if rec_exist:
            return jsonify("true")
        return jsonify("false")
    except Exception as ex:
        return InternalServerError(ex)


@Components_Data_blueprint.route('/getcount_students')
def getcount_students():
    try:
        sqltext = text(f"""SELECT COUNT(*) AS num FROM students""")
        arr = db.session.execute(sqltext).first()
        val = arr[0]
        return jsonify(val)
    except Exception as ex:
        return InternalServerError(ex)


@Components_Data_blueprint.route('/getcount_teachers')
def getcount_teachers():
    try:
        sqltext = text(f"""SELECT COUNT(*) AS num FROM teachers""")
        arr = db.session.execute(sqltext).first()
        val = arr[0]
        return jsonify(val)
    except Exception as ex:
        return InternalServerError(ex)


@Components_Data_blueprint.route('/getcount_classes')
def getcount_classes():
    try:
        sqltext = text(f"""SELECT COUNT(*) AS num FROM classes""")
        arr = db.session.execute(sqltext).first()
        val = arr[0]
        return jsonify(val)
    except Exception as ex:
        return InternalServerError(ex)
