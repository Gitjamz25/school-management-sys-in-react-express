import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list teachers records
 * @GET /teachers/index/{fieldname}/{fieldvalue}
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
		let search = req.query.search;
		if(search){
			let searchFields = DB.Teachers.searchFields();
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
		query.attributes = DB.Teachers.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.Teachers.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Teachers record
 * @GET /teachers/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Teachers.viewFields();
		let record = await DB.Teachers.findOne(query);
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
 * Route to insert Teachers record
 * @POST /teachers/add
 */
router.post('/add/', 
	[
		body('fullname').not().isEmpty(),
		body('dob').not().isEmpty(),
		body('gender').not().isEmpty(),
		body('phone').not().isEmpty(),
		body('email').not().isEmpty().isEmail(),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
		// check if phone already exist.
		let phoneCount = await DB.Teachers.count({ where:{ 'phone': modeldata.phone } });
		if(phoneCount > 0){
			return res.badRequest(`${modeldata.phone} already exist.`);
		}
		
		// check if email already exist.
		let emailCount = await DB.Teachers.count({ where:{ 'email': modeldata.email } });
		if(emailCount > 0){
			return res.badRequest(`${modeldata.email} already exist.`);
		}
		
		//save Teachers record
		let record = await DB.Teachers.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['id'];
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues: null, newValues });
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Teachers record for edit
 * @GET /teachers/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Teachers.editFields();
		let record = await DB.Teachers.findOne(query);
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
 * Route to update  Teachers record
 * @POST /teachers/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('fullname').optional({nullable: true}).not().isEmpty(),
		body('dob').optional({nullable: true}).not().isEmpty(),
		body('gender').optional({nullable: true}).not().isEmpty(),
		body('phone').optional({nullable: true}).not().isEmpty(),
		body('email').optional({nullable: true}).not().isEmpty().isEmail(),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		
		// check if phone already exist.
		let phoneCount = await DB.Teachers.count({where:{'phone': modeldata.phone, 'id': {[DB.op.ne]: recid} }});
		if(phoneCount > 0){
			return res.badRequest(`${modeldata.phone} already exist.`);
		}
		
		// check if email already exist.
		let emailCount = await DB.Teachers.count({where:{'email': modeldata.email, 'id': {[DB.op.ne]: recid} }});
		if(emailCount > 0){
			return res.badRequest(`${modeldata.email} already exist.`);
		}
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Teachers.editFields();
		let record = await DB.Teachers.findOne(query);
		if(!record){
			return res.notFound();
		}
		const oldValues = JSON.stringify(record); //for audit trail
		await DB.Teachers.update(modeldata, {where: where});
		record = await DB.Teachers.findOne(query);//for audit trail
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues, newValues });
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Teachers record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /teachers/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Teachers.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
			const oldValues = JSON.stringify(record); //for audit trail
			req.writeToAuditLog({ recid: record['id'], oldValues });
		});
		await DB.Teachers.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
