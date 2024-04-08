import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list form3marks records
 * @GET /form3marks/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.Form3Marks.searchFields();
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
		query.attributes = DB.Form3Marks.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.Form3Marks.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Form3Marks record
 * @GET /form3marks/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Form3Marks.viewFields();
		let record = await DB.Form3Marks.findOne(query);
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
 * Route to insert Form3Marks record
 * @POST /form3marks/add
 */
router.post('/add/', 
	[
		body('year').not().isEmpty().isNumeric(),
		body('term').optional({nullable: true, checkFalsy: true}),
		body('form').optional({nullable: true, checkFalsy: true}),
		body('math').not().isEmpty().isNumeric(),
		body('eng').not().isEmpty().isNumeric(),
		body('kis').not().isEmpty().isNumeric(),
		body('chem').not().isEmpty().isNumeric(),
		body('phy').not().isEmpty().isNumeric(),
		body('bio').not().isEmpty().isNumeric(),
		body('geo').not().isEmpty().isNumeric(),
		body('hist').not().isEmpty().isNumeric(),
		body('cre').not().isEmpty().isNumeric(),
		body('bus').not().isEmpty().isNumeric(),
		body('fullname').not().isEmpty(),
		body('comp').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('total').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('average').optional({nullable: true, checkFalsy: true}).isNumeric(),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
		//save Form3Marks record
		let record = await DB.Form3Marks.create(modeldata);
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
 * Route to get  Form3Marks record for edit
 * @GET /form3marks/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Form3Marks.editFields();
		let record = await DB.Form3Marks.findOne(query);
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
 * Route to update  Form3Marks record
 * @POST /form3marks/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('year').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('term').optional({nullable: true, checkFalsy: true}),
		body('form').optional({nullable: true, checkFalsy: true}),
		body('math').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('eng').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('kis').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('chem').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('phy').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('bio').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('geo').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('hist').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('cre').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('bus').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('fullname').optional({nullable: true}).not().isEmpty(),
		body('comp').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('total').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('average').optional({nullable: true, checkFalsy: true}).isNumeric(),
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
		query.attributes = DB.Form3Marks.editFields();
		let record = await DB.Form3Marks.findOne(query);
		if(!record){
			return res.notFound();
		}
		const oldValues = JSON.stringify(record); //for audit trail
		await DB.Form3Marks.update(modeldata, {where: where});
		record = await DB.Form3Marks.findOne(query);//for audit trail
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues, newValues });
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Form3Marks record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /form3marks/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Form3Marks.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
			const oldValues = JSON.stringify(record); //for audit trail
			req.writeToAuditLog({ recid: record['id'], oldValues });
		});
		await DB.Form3Marks.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
