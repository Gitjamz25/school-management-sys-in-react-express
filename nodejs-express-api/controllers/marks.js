import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




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


/**
 * Route to view Marks record
 * @GET /marks/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Marks.viewFields();
		let record = await DB.Marks.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to insert Marks record
 * @POST /marks/add
 */
router.post('/add/', 
	[
		body('year').not().isEmpty(),
		body('term').not().isEmpty().isNumeric(),
		body('uid').not().isEmpty().isNumeric(),
		body('form').optional({nullable: true, checkFalsy: true}),
		body('maths').not().isEmpty().isNumeric(),
		body('english').not().isEmpty().isNumeric(),
		body('kiswahili').not().isEmpty().isNumeric(),
		body('chemistry').not().isEmpty().isNumeric(),
		body('biology').not().isEmpty().isNumeric(),
		body('physics').not().isEmpty().isNumeric(),
		body('history').not().isEmpty().isNumeric(),
		body('geography').not().isEmpty().isNumeric(),
		body('cre').not().isEmpty().isNumeric(),
		body('business').not().isEmpty().isNumeric(),
		body('computer').not().isEmpty().isNumeric(),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
		//save Marks record
		let record = await DB.Marks.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Marks record for edit
 * @GET /marks/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Marks.editFields();
		let record = await DB.Marks.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to update  Marks record
 * @POST /marks/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('year').optional({nullable: true}).not().isEmpty(),
		body('term').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('uid').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('form').optional({nullable: true, checkFalsy: true}),
		body('maths').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('english').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('kiswahili').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('chemistry').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('biology').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('physics').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('history').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('geography').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('cre').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('business').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('computer').optional({nullable: true}).not().isEmpty().isNumeric(),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Marks.editFields();
		let record = await DB.Marks.findOne(query);
		if(!record){
			return res.notFound();
		}
		await DB.Marks.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Marks record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /marks/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Marks.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await DB.Marks.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
