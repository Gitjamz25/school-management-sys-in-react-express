from flask import Blueprint
from sqlalchemy import text
from app import db, config, jsonify, request
from ..helpers.http_errors import InternalServerError, BadRequest, ResourceNotFound
from ..models.students import *


Students_blueprint = Blueprint('Students', __name__)


# list Students records
# @param fieldname: filter table records by a field
# @param fieldvalue:  filter value
# @request.args search: search records
# @request.args orderby: sort records by field name
# @request.args ordertype: sort type (asc|desc)
# @request.args page: current page number
# @request.args limit: maximum number of records to select
@Students_blueprint.route('/')
@Students_blueprint.route('/index/<fieldname>/<fieldvalue>')
def list(fieldname=None, fieldvalue=None):
    try:
        query = Students.query
        search = request.args.get('search')
        if search:
            query = query.filter(
                Students.fullname.like(f'%{search}%') | 
                Students.gender.like(f'%{search}%') | 
                Students.residence.like(f'%{search}%') | 
                Students.phone.like(f'%{search}%') | 
                Students.email.like(f'%{search}%') | 
                Students.id.like(f'%{search}%') 
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
            query = query.order_by(text(f'students.id {ordertype}'))
        
        # fields to select
        query = query.with_entities(
            Students.fullname,
            Students.dob,
            Students.gender,
            Students.residence,
            Students.phone,
            Students.email,
            Students.id
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
@Students_blueprint.route('/view/<rec_id>')
def view(rec_id=None):
    try:
        query = Students.query
        query = query.filter(Students.id == rec_id)
        query = query.with_entities(
            Students.id,
            Students.fullname,
            Students.dob,
            Students.gender,
            Students.residence,
            Students.phone,
            Students.email
        )
        
        record = query.first()
        if not record: return ResourceNotFound()
         
        record = record._asdict()
        
        # return result as json
        return jsonify(record)
        
    except Exception as ex:
        return InternalServerError(ex)


# Save form data to the Students table
@Students_blueprint.route('/add', methods=['POST'])
def add():
    try:
        modeldata = request.body
        form = StudentsAddForm(modeldata)
        errors = [] # list of validation errors
        
        # validate students form data
        if not form.validate():
            errors.append(form.errors)
        
        if errors:
            return BadRequest(errors)
        
        record = Students()
        form.populate_obj(record)
        
        # save students records
        db.session.add(record)
        db.session.commit()
        db.session.flush()
        rec_id = record.id
         
        record = record._asdict()
        return jsonify(record)
    except Exception as ex:
        return InternalServerError(ex)


# Select record by table primary key and update with form data
@Students_blueprint.route('/edit/<rec_id>', methods=['GET', 'POST'])
def edit(rec_id=None):
    try:
        query = Students.query
        query = query.filter(Students.id == rec_id)
        record = query.first()
        if not record: return ResourceNotFound()
        
        if request.method == 'POST':
            errors = []
            modeldata = request.body
            form = StudentsEditForm(modeldata, obj=record)
            
            if not form.validate():
                errors.append(form.errors)
            
            if errors:
                return BadRequest(errors)
            
            # save Students record
            form.populate_obj(record)
            db.session.commit()
         
        record = record._asdict()
        return jsonify(record)
    except Exception as ex:
        return InternalServerError(ex)


# Delete record from the database
# Support multi delete by separating record id by comma.
@Students_blueprint.route('/delete/<rec_id>')
def delete(rec_id):
    query = Students.query
    arr_id = rec_id.split(',')
    try:
        query = query.filter(Students.id.in_(arr_id))
        query.delete(synchronize_session=False)
        db.session.commit()
        
        return jsonify(arr_id)
    except Exception as ex:
        return InternalServerError(ex)
