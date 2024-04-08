import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';
import exportListPage from '../exports/form1marks_list.js';
import exportViewPage from '../exports/form1marks_view.js';


const router = Router();




/**
 * Route to list form1marks records
 * @GET /form1marks/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.Form1Marks.searchFields();
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
		if(req.query.export){
			query.attributes = DB.Form1Marks.exportListFields();
			let records = await DB.Form1Marks.findAll(query);
			return exportListPage(records, req, res)
		}
		query.attributes = DB.Form1Marks.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.Form1Marks.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Form1Marks record
 * @GET /form1marks/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		if(req.query.export){
			query.attributes = DB.Form1Marks.exportViewFields();
			let records = await DB.Form1Marks.findAll(query);
			return exportViewPage(records, req, res)
		}
		query.attributes = DB.Form1Marks.viewFields();
		let record = await DB.Form1Marks.findOne(query);
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
 * Route to insert Form1Marks record
 * @POST /form1marks/add
 */
router.post('/add/', 
	[
		body('year').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('term').optional({nullable: true, checkFalsy: true}),
		body('fullname').optional({nullable: true, checkFalsy: true}),
		body('form').optional({nullable: true, checkFalsy: true}),
		body('math').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('eng').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('kis').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('chem').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('phy').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('bio').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('geo').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('hist').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('cre').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('bus').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('comp').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('total').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('average').optional({nullable: true, checkFalsy: true}).isNumeric(),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
		//save Form1Marks record
		let record = await DB.Form1Marks.create(modeldata);
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
 * Route to get  Form1Marks record for edit
 * @GET /form1marks/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Form1Marks.editFields();
		let record = await DB.Form1Marks.findOne(query);
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
 * Route to update  Form1Marks record
 * @POST /form1marks/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('year').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('term').optional({nullable: true, checkFalsy: true}),
		body('fullname').optional({nullable: true, checkFalsy: true}),
		body('form').optional({nullable: true, checkFalsy: true}),
		body('math').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('eng').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('kis').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('chem').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('phy').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('bio').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('geo').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('hist').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('cre').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('bus').optional({nullable: true, checkFalsy: true}).isNumeric(),
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
		query.attributes = DB.Form1Marks.editFields();
		let record = await DB.Form1Marks.findOne(query);
		if(!record){
			return res.notFound();
		}
		const oldValues = JSON.stringify(record); //for audit trail
		await DB.Form1Marks.update(modeldata, {where: where});
		record = await DB.Form1Marks.findOne(query);//for audit trail
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues, newValues });
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Form1Marks record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /form1marks/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Form1Marks.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
			const oldValues = JSON.stringify(record); //for audit trail
			req.writeToAuditLog({ recid: record['id'], oldValues });
		});
		await DB.Form1Marks.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
