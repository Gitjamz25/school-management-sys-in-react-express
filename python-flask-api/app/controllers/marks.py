from flask import Blueprint
from app import db, jsonify, request
from ..helpers.http_errors import InternalServerError, BadRequest, ResourceNotFound
from ..models.marks import *


Marks_blueprint = Blueprint('Marks', __name__)


/**
 * Route to list marks records
 * @GET /marks/index/{fieldname}/{fieldvalue}
 */
router.get(['/', '/index/:fieldname?/:fieldvalue?'], async (req, res) => {  
	try{
		const query = {};
		let queryFilters = [];
		let where = {};
		let replacements = {};
		let fieldName = req.params.fieldname;
		let fieldValue = req.params.fieldvalue;
		
		if (fieldName){
			queryFilters.push(DB.filterBy(fieldName, fieldValue));
		}
		const joinTables = []; // hold list of join tables
		joinTables.push({
			model: DB.Marks,
			required: true,
			as: 'marks',
			attributes: [], //already set via model class
		})
		query.include = joinTables;
		let search = req.query.search;
		if(search){
			let searchFields = DB.Marks.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'id', 'desc');
		//page export command
		query.attributes = DB.Marks.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.Marks.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


# Select table record by ID
@Marks_blueprint.route('/view/<rec_id>')
def view(rec_id=None):
    try:
        query = Marks.query
        query = query.filter(Marks.id == rec_id)
        query = query.with_entities(
            Marks.id,
            Marks.year,
            Marks.term,
            Marks.uid,
            Marks.maths,
            Marks.english,
            Marks.kiswahili,
            Marks.chemistry,
            Marks.biology,
            Marks.physics,
            Marks.history,
            Marks.geography,
            Marks.cre,
            Marks.business,
            Marks.computer,
            Marks.form
        )
        
        record = query.first()
        if not record: return ResourceNotFound()
         
        record = record._asdict()
        
        # return result as json
        return jsonify(record)
        
    except Exception as ex:
        return InternalServerError(ex)


# Save form data to the Marks table
@Marks_blueprint.route('/add', methods=['POST'])
def add():
    try:
        modeldata = request.body
        form = MarksAddForm(modeldata)
        errors = [] # list of validation errors
        
        # validate marks form data
        if not form.validate():
            errors.append(form.errors)
        
        if errors:
            return BadRequest(errors)
        
        record = Marks()
        form.populate_obj(record)
        
        # save marks records
        db.session.add(record)
        db.session.commit()
        db.session.flush()
        rec_id = record.id
         
        record = record._asdict()
        return jsonify(record)
    except Exception as ex:
        return InternalServerError(ex)


# Select record by table primary key and update with form data
@Marks_blueprint.route('/edit/<rec_id>', methods=['GET', 'POST'])
def edit(rec_id=None):
    try:
        query = Marks.query
        query = query.filter(Marks.id == rec_id)
        record = query.first()
        if not record: return ResourceNotFound()
        
        if request.method == 'POST':
            errors = []
            modeldata = request.body
            form = MarksEditForm(modeldata, obj=record)
            
            if not form.validate():
                errors.append(form.errors)
            
            if errors:
                return BadRequest(errors)
            
            # save Marks record
            form.populate_obj(record)
            db.session.commit()
         
        record = record._asdict()
        return jsonify(record)
    except Exception as ex:
        return InternalServerError(ex)


# Delete record from the database
# Support multi delete by separating record id by comma.
@Marks_blueprint.route('/delete/<rec_id>')
def delete(rec_id):
    query = Marks.query
    arr_id = rec_id.split(',')
    try:
        query = query.filter(Marks.id.in_(arr_id))
        query.delete(synchronize_session=False)
        db.session.commit()
        
        return jsonify(arr_id)
    except Exception as ex:
        return InternalServerError(ex)
