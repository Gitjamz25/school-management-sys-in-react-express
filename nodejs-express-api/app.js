import express from 'express';
import compression from 'compression';
import cors from 'cors';
import ejs from 'ejs';
import config from './config.js';
import extendExpressMiddleware from './helpers/express_middleware.js';
import { passportJwtLogin, authMiddleware } from './helpers/auth_middleware.js';
import AuthController from './controllers/auth.js';
import AccountController from './controllers/account.js';
import HomeController from './controllers/home.js';
import ComponentsDataController from './controllers/components_data.js';
import FileUploaderController from './controllers/fileuploader.js';
import S3UploaderController from './controllers/s3uploader.js';
import AssignmentsController from  './controllers/assignments.js';
import ClassesController from  './controllers/classes.js';
import Form1MarksController from  './controllers/form1marks.js';
import Form2MarksController from  './controllers/form2marks.js';
import Form3MarksController from  './controllers/form3marks.js';
import Form4MarksController from  './controllers/form4marks.js';
import PermissionsController from  './controllers/permissions.js';
import RolesController from  './controllers/roles.js';
import StudentsController from  './controllers/students.js';
import SubjectsController from  './controllers/subjects.js';
import TeachersController from  './controllers/teachers.js';
import TeachersRolesController from  './controllers/teachersroles.js';
import UsersController from  './controllers/users.js';


const app = express();

//set view engine use to return Html
app.set('views', 'views');
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');
// compress all responses
app.use(compression({ threshold: 0 }));
//allow cors on localhost
app.use(cors()); // disable when deploy to production
app.use(express.static(config.app.publicDir))
app.use(express.json()) // Parses json, multi-part (file), url-encoded
app.use(express.urlencoded({ extended:true, limit:'50mb' }));
extendExpressMiddleware(app);
app.use(passportJwtLogin);
app.use('/api/', authMiddleware);

//bind page route to the controllers
app.use('/api/', HomeController);
app.use('/api/auth', AuthController);
app.use('/api/account', AccountController);
app.use('/api/assignments', AssignmentsController);
app.use('/api/classes', ClassesController);
app.use('/api/form1marks', Form1MarksController);
app.use('/api/form2marks', Form2MarksController);
app.use('/api/form3marks', Form3MarksController);
app.use('/api/form4marks', Form4MarksController);
app.use('/api/permissions', PermissionsController);
app.use('/api/roles', RolesController);
app.use('/api/students', StudentsController);
app.use('/api/subjects', SubjectsController);
app.use('/api/teachers', TeachersController);
app.use('/api/teachersroles', TeachersRolesController);
app.use('/api/users', UsersController);
app.use('/api/components_data', ComponentsDataController);
app.use('/api/fileuploader', FileUploaderController);
app.use('/api/s3uploader', S3UploaderController);
app.get('*', function(req, res){
    res.status(404).json("Page not found");
});

let port = 8060;
//start app
app.listen(port, () => {
    console.log('Server is up and running on port: ' + port);
});