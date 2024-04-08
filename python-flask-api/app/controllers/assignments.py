from flask import Blueprint
from sqlalchemy import text
from app import db, config, jsonify, request
from ..helpers.http_errors import InternalServerError, BadRequest, ResourceNotFound
from ..helpers.utils import utils
from ..models.assignments import *


Assignments_blueprint = Blueprint('Assignments', __name__)


# list Assignments records
# @param fieldname: filter table records by a field
# @param fieldvalue:  filter value
# @request.args search: search records
# @request.args orderby: sort records by field name
# @request.args ordertype: sort type (asc|desc)
# @request.args page: current page number
# @request.args limit: maximum number of records to select
@Assignments_blueprint.route('/')
@Assignments_blueprint.route('/index/<fieldname>/<fieldvalue>')
def list(fieldname=None, fieldvalue=None):
    try:
        query = Assignments.query
        search = request.args.get('search')
        if search:
            query = query.filter(
                Assignments.year.like(f'%{search}%') | 
                Assignments.term.like(f'%{search}%') | 
                Assignments.subject.like(f'%{search}%') | 
                Assignments.asignment_name.like(f'%{search}%') | 
                Assignments.id.like(f'%{search}%') | 
                Assignments.instructions.like(f'%{search}%') 
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
            query = query.order_by(text(f'assignments.id {ordertype}'))
        
        # fields to select
        query = query.with_entities(
            Assignments.year,
            Assignments.term,
            Assignments.subject,
            Assignments.asignment_name,
            Assignments.id
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
@Assignments_blueprint.route('/view/<rec_id>')
def view(rec_id=None):
    try:
        query = Assignments.query
        query = query.filter(Assignments.id == rec_id)
        query = query.with_entities(
            Assignments.id,
            Assignments.year,
            Assignments.term,
            Assignments.subject,
            Assignments.asignment_name,
            Assignments.file,
            Assignments.instructions
        )
        
        record = query.first()
        if not record: return ResourceNotFound()
         
        record = record._asdict()
        
        # return result as json
        return jsonify(record)
        
    except Exception as ex:
        return InternalServerError(ex)


# Save form data to the Assignments table
@Assignments_blueprint.route('/add', methods=['POST'])
def add():
    try:
        modeldata = request.body
        
        # move uploaded file from temp directory to destination directory
        if "file" in modeldata:
            file_info = utils.move_uploaded_files(modeldata['file'], "file")
            modeldata['file'] = file_info['filepath']
         
        form = AssignmentsAddForm(modeldata)
        errors = [] # list of validation errors
        
        # validate assignments form data
        if not form.validate():
            errors.append(form.errors)
        
        if errors:
            return BadRequest(errors)
        
        record = Assignments()
        form.populate_obj(record)
        
        # save assignments records
        db.session.add(record)
        db.session.commit()
        db.session.flush()
        rec_id = record.id
         
        record = record._asdict()
        return jsonify(record)
    except Exception as ex:
        return InternalServerError(ex)


# Select record by table primary key and update with form data
@Assignments_blueprint.route('/edit/<rec_id>', methods=['GET', 'POST'])
def edit(rec_id=None):
    try:
        query = Assignments.query
        query = query.filter(Assignments.id == rec_id)
        record = query.first()
        if not record: return ResourceNotFound()
        
        if request.method == 'POST':
            errors = []
            modeldata = request.body
            
            # move uploaded file from temp directory to destination directory
            if "file" in modeldata:
                file_info = utils.move_uploaded_files(modeldata['file'], "file")
                modeldata['file'] = file_info['filepath']
            
            form = AssignmentsEditForm(modeldata, obj=record)
            
            if not form.validate():
                errors.append(form.errors)
            
            if errors:
                return BadRequest(errors)
            
            # save Assignments record
            form.populate_obj(record)
            db.session.commit()
         
        record = record._asdict()
        return jsonify(record)
    except Exception as ex:
        return InternalServerError(ex)


# Delete record from the database
# Support multi delete by separating record id by comma.
@Assignments_blueprint.route('/delete/<rec_id>')
def delete(rec_id):
    query = Assignments.query
    arr_id = rec_id.split(',')
    try:
        query = query.filter(Assignments.id.in_(arr_id))
        query.delete(synchronize_session=False)
        db.session.commit()
        
        return jsonify(arr_id)
    except Exception as ex:
        return InternalServerError(ex)
