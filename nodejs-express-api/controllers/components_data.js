import { Router } from 'express';
import DB from '../models/db.js';


const router = Router();


 /**
 * Route to get subject_option_list records
 * @GET /components_data/subject_option_list
 */
router.get('/subject_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT subject_name AS value,subject_name AS label FROM subjects` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get class_teacher_option_list records
 * @GET /components_data/class_teacher_option_list
 */
router.get('/class_teacher_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT fullname AS value,fullname AS label FROM teachers` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get form_option_list records
 * @GET /components_data/form_option_list
 */
router.get('/form_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT class_name AS value,class_name AS label FROM classes ORDER BY class_name DESC` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get role_id_option_list records
 * @GET /components_data/role_id_option_list
 */
router.get('/role_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT role_id as value, role_name as label FROM roles` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get class_option_list records
 * @GET /components_data/class_option_list
 */
router.get('/class_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT class_name AS value,class_name AS label FROM classes` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get hod_option_list records
 * @GET /components_data/hod_option_list
 */
router.get('/hod_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT fullname AS value,fullname AS label FROM teachers` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to check if field value already exist in a Teachers table
 * @GET /components_data/teachers_phone_exist/{fieldvalue}
 */
router.get('/teachers_phone_exist/:fieldvalue', async (req, res) => {
	try{
		let val = req.params.fieldvalue
		let count = await DB.Teachers.count({ where:{ 'phone': val } });
		if(count > 0){
			return res.ok("true");
		}
		return res.ok("false");
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to check if field value already exist in a Teachers table
 * @GET /components_data/teachers_email_exist/{fieldvalue}
 */
router.get('/teachers_email_exist/:fieldvalue', async (req, res) => {
	try{
		let val = req.params.fieldvalue
		let count = await DB.Teachers.count({ where:{ 'email': val } });
		if(count > 0){
			return res.ok("true");
		}
		return res.ok("false");
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to check if field value already exist in a Users table
 * @GET /components_data/users_username_exist/{fieldvalue}
 */
router.get('/users_username_exist/:fieldvalue', async (req, res) => {
	try{
		let val = req.params.fieldvalue
		let count = await DB.Users.count({ where:{ 'username': val } });
		if(count > 0){
			return res.ok("true");
		}
		return res.ok("false");
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to check if field value already exist in a Users table
 * @GET /components_data/users_email_exist/{fieldvalue}
 */
router.get('/users_email_exist/:fieldvalue', async (req, res) => {
	try{
		let val = req.params.fieldvalue
		let count = await DB.Users.count({ where:{ 'email': val } });
		if(count > 0){
			return res.ok("true");
		}
		return res.ok("false");
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to form1marks_data_component_2 value
 * @GET /components_data/form1marks_data_component_2
 */
router.get('/form1marks_data_component_2', async (req, res) => {
	try{
		let sqltext = `SELECT COUNT(*) AS num FROM students` ;
		
		let value = await DB.rawQueryValue(sqltext);
		return res.ok(value.toString());
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to getcount_students_3 value
 * @GET /components_data/getcount_students_3
 */
router.get('/getcount_students_3', async (req, res) => {
	try{
		let sqltext = `SELECT COUNT(*) AS num FROM teachers` ;
		
		let value = await DB.rawQueryValue(sqltext);
		return res.ok(value.toString());
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to getcount_classes value
 * @GET /components_data/getcount_classes
 */
router.get('/getcount_classes', async (req, res) => {
	try{
		let sqltext = `SELECT COUNT(*) AS num FROM classes` ;
		
		let value = await DB.rawQueryValue(sqltext);
		return res.ok(value.toString());
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
