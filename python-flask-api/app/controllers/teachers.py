from flask import Blueprint
from sqlalchemy import text
from app import db, config, jsonify, request
from ..helpers.http_errors import InternalServerError, BadRequest, ResourceNotFound
from ..helpers.utils import utils
from ..models.teachers import *


Teachers_blueprint = Blueprint('Teachers', __name__)


# list Teachers records
# @param fieldname: filter table records by a field
# @param fieldvalue:  filter value
# @request.args search: search records
# @request.args orderby: sort records by field name
# @request.args ordertype: sort type (asc|desc)
# @request.args page: current page number
# @request.args limit: maximum number of records to select
@Teachers_blueprint.route('/')
@Teachers_blueprint.route('/index/<fieldname>/<fieldvalue>')
def list(fieldname=None, fieldvalue=None):
    try:
        query = Teachers.query
        search = request.args.get('search')
        if search:
            query = query.filter(
                Teachers.fullname.like(f'%{search}%') | 
                Teachers.gender.like(f'%{search}%') | 
                Teachers.phone.like(f'%{search}%') | 
                Teachers.email.like(f'%{search}%') | 
                Teachers.id.like(f'%{search}%') 
            )
        
        # filter by dynamic field name
        if fieldname:
            field_filter = text(f'{fieldname} = :fieldvalue').params(fieldvalue=fieldvalue)
            query = query.filter(field_filter)
        
        orderby = request.args.get('orderby')
        ordertype = request.args.get('ordertype', 'desc')
        if orderby:
            query = query.order_by(text(f'{orderby} {ordertype}'))
        else:
            query = query.order_by(text(f'teachers.id {ordertype}'))
        
        # fields to select
        query = query.with_entities(
            Teachers.fullname,
            Teachers.dob,
            Teachers.gender,
            Teachers.phone,
            Teachers.email,
            Teachers.id
        )
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', config.MAX_RECORD_COUNT))
        offset = ((page-1) * limit)
        total_records = query.count()
        records = query.limit(limit).offset(offset).all()
        record_count = len(records)
        total_pages = round(total_records/limit)
        records = [(row._asdict()) for row in records]
        
        # response object
        response = dict(
            records=records, 
            totalRecords=total_records,
            recordCount=record_count,
            totalPages=total_pages
        )
        return jsonify(response)
    except Exception as ex:
        return InternalServerError(ex)


# Select table record by ID
@Teachers_blueprint.route('/view/<rec_id>')
def view(rec_id=None):
    try:
        query = Teachers.query
        query = query.filter(Teachers.id == rec_id)
        query = query.with_entities(
            Teachers.id,
            Teachers.fullname,
            Teachers.dob,
            Teachers.gender,
            Teachers.phone,
            Teachers.email
        )
        
        record = query.first()
        if not record: return ResourceNotFound()
         
        record = record._asdict()
        
        # return result as json
        return jsonify(record)
        
    except Exception as ex:
        return InternalServerError(ex)


# Save form data to the Teachers table
@Teachers_blueprint.route('/add', methods=['POST'])
def add():
    try:
        modeldata = request.body
        form = TeachersAddForm(modeldata)
        errors = [] # list of validation errors
        
        # validate teachers form data
        if not form.validate():
            errors.append(form.errors)
        
        if errors:
            return BadRequest(errors)
        
        record = Teachers()
        form.populate_obj(record)

        # check if phone record already exist in the database
        rec_value = str(modeldata['phone'])
        rec_exist = utils.is_unique(Teachers, "phone", rec_value)
        if rec_exist:
            return BadRequest(rec_value + " Already exist!")

        # check if email record already exist in the database
        rec_value = str(modeldata['email'])
        rec_exist = utils.is_unique(Teachers, "email", rec_value)
        if rec_exist:
            return BadRequest(rec_value + " Already exist!")
        
        # save teachers records
        db.session.add(record)
        db.session.commit()
        db.session.flush()
        rec_id = record.id
         
        record = record._asdict()
        return jsonify(record)
    except Exception as ex:
        return InternalServerError(ex)


# Select record by table primary key and update with form data
@Teachers_blueprint.route('/edit/<rec_id>', methods=['GET', 'POST'])
def edit(rec_id=None):
    try:
        query = Teachers.query
        query = query.filter(Teachers.id == rec_id)
        record = query.first()
        if not record: return ResourceNotFound()
        
        if request.method == 'POST':
            errors = []
            modeldata = request.body
            form = TeachersEditForm(modeldata, obj=record)
            
            if not form.validate():
                errors.append(form.errors)
            # check if phone already exist in the database
            rec_value = str(modeldata['phone'])
            rec_exist = utils.is_unique(Teachers, "phone", rec_value, "id", rec_id)
            if rec_exist:
                return BadRequest(rec_value  + " Already exist!")
            # check if email already exist in the database
            rec_value = str(modeldata['email'])
            rec_exist = utils.is_unique(Teachers, "email", rec_value, "id", rec_id)
            if rec_exist:
                return BadRequest(rec_value  + " Already exist!")
            
            if errors:
                return BadRequest(errors)
            
            # save Teachers record
            form.populate_obj(record)
            db.session.commit()
         
        record = record._asdict()
        return jsonify(record)
    except Exception as ex:
        return InternalServerError(ex)


# Delete record from the database
# Support multi delete by separating record id by comma.
@Teachers_blueprint.route('/delete/<rec_id>')
def delete(rec_id):
    query = Teachers.query
    arr_id = rec_id.split(',')
    try:
        query = query.filter(Teachers.id.in_(arr_id))
        query.delete(synchronize_session=False)
        db.session.commit()
        
        return jsonify(arr_id)
    except Exception as ex:
        return InternalServerError(ex)
