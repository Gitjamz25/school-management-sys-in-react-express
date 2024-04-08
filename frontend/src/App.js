import { Form } from 'formik';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

import IndexLayout from 'layouts/IndexLayout';
import MainLayout from 'layouts/MainLayout';
import AuthRoutes from 'components/AuthRoutes';
import IndexPage from 'pages/index/IndexPage';
import AssignmentsList from 'pages/assignments/List';
import AssignmentsView from 'pages/assignments/View';
import AssignmentsAdd from 'pages/assignments/Add';
import AssignmentsEdit from 'pages/assignments/Edit';
import ClassesList from 'pages/classes/List';
import ClassesView from 'pages/classes/View';
import ClassesAdd from 'pages/classes/Add';
import ClassesEdit from 'pages/classes/Edit';
import Form1marksList from 'pages/form1marks/List';
import Form1marksView from 'pages/form1marks/View';
import Form1marksAdd from 'pages/form1marks/Add';
import Form1marksEdit from 'pages/form1marks/Edit';
import Form2marksList from 'pages/form2marks/List';
import Form2marksView from 'pages/form2marks/View';
import Form2marksAdd from 'pages/form2marks/Add';
import Form2marksEdit from 'pages/form2marks/Edit';
import Form3marksList from 'pages/form3marks/List';
import Form3marksView from 'pages/form3marks/View';
import Form3marksAdd from 'pages/form3marks/Add';
import Form3marksEdit from 'pages/form3marks/Edit';
import Form4marksList from 'pages/form4marks/List';
import Form4marksView from 'pages/form4marks/View';
import Form4marksAdd from 'pages/form4marks/Add';
import Form4marksEdit from 'pages/form4marks/Edit';
import PermissionsList from 'pages/permissions/List';
import PermissionsView from 'pages/permissions/View';
import PermissionsAdd from 'pages/permissions/Add';
import PermissionsEdit from 'pages/permissions/Edit';
import RolesList from 'pages/roles/List';
import RolesView from 'pages/roles/View';
import RolesAdd from 'pages/roles/Add';
import RolesEdit from 'pages/roles/Edit';
import StudentsList from 'pages/students/List';
import StudentsView from 'pages/students/View';
import StudentsAdd from 'pages/students/Add';
import StudentsEdit from 'pages/students/Edit';
import SubjectsList from 'pages/subjects/List';
import SubjectsView from 'pages/subjects/View';
import SubjectsAdd from 'pages/subjects/Add';
import SubjectsEdit from 'pages/subjects/Edit';
import TeachersList from 'pages/teachers/List';
import TeachersView from 'pages/teachers/View';
import TeachersAdd from 'pages/teachers/Add';
import TeachersEdit from 'pages/teachers/Edit';
import TeachersrolesList from 'pages/teachersroles/List';
import TeachersrolesView from 'pages/teachersroles/View';
import TeachersrolesAdd from 'pages/teachersroles/Add';
import TeachersrolesEdit from 'pages/teachersroles/Edit';
import UsersList from 'pages/users/List';
import UsersView from 'pages/users/View';
import UsersAdd from 'pages/users/Add';
import UsersEdit from 'pages/users/Edit';
import MarksPage from 'pages/custom/MarksPage';
import AccountPages from 'pages/account';
import HomePage from './pages/home/HomePage';
import IndexPages from './pages/index';
import ErrorPages from './pages/errors';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'assets/styles/layout.scss';
const App = () => {
	const auth = useAuth();
	function DefaultPage(){
		if(!auth.isLoggedIn){
			return <IndexPage />
		}
		return <Navigate to="/home" replace />;
	}
	return (
		<Routes>
			<Route exact element={<AuthRoutes />}>
			<Route element={<MainLayout />}>
				<Route path="/home" element={<HomePage />} />
				

				{/* assignments pages routes */}
				<Route path="/assignments" element={<AssignmentsList />} />
				<Route path="/assignments/:fieldName/:fieldValue" element={<AssignmentsList />} />
				<Route path="/assignments/index/:fieldName/:fieldValue" element={<AssignmentsList />} />
				<Route path="/assignments/view/:pageid" element={<AssignmentsView />} />
				<Route path="/assignments/add" element={<AssignmentsAdd />} />
				<Route path="/assignments/edit/:pageid" element={<AssignmentsEdit />} />

				{/* classes pages routes */}
				<Route path="/classes" element={<ClassesList />} />
				<Route path="/classes/:fieldName/:fieldValue" element={<ClassesList />} />
				<Route path="/classes/index/:fieldName/:fieldValue" element={<ClassesList />} />
				<Route path="/classes/view/:pageid" element={<ClassesView />} />
				<Route path="/classes/add" element={<ClassesAdd />} />
				<Route path="/classes/edit/:pageid" element={<ClassesEdit />} />

				{/* form1marks pages routes */}
				<Route path="/form1marks" element={<Form1marksList />} />
				<Route path="/form1marks/:fieldName/:fieldValue" element={<Form1marksList />} />
				<Route path="/form1marks/index/:fieldName/:fieldValue" element={<Form1marksList />} />
				<Route path="/form1marks/view/:pageid" element={<Form1marksView />} />
				<Route path="/form1marks/add" element={<Form1marksAdd />} />
				<Route path="/form1marks/edit/:pageid" element={<Form1marksEdit />} />

				{/* form2marks pages routes */}
				<Route path="/form2marks" element={<Form2marksList />} />
				<Route path="/form2marks/:fieldName/:fieldValue" element={<Form2marksList />} />
				<Route path="/form2marks/index/:fieldName/:fieldValue" element={<Form2marksList />} />
				<Route path="/form2marks/view/:pageid" element={<Form2marksView />} />
				<Route path="/form2marks/add" element={<Form2marksAdd />} />
				<Route path="/form2marks/edit/:pageid" element={<Form2marksEdit />} />

				{/* form3marks pages routes */}
				<Route path="/form3marks" element={<Form3marksList />} />
				<Route path="/form3marks/:fieldName/:fieldValue" element={<Form3marksList />} />
				<Route path="/form3marks/index/:fieldName/:fieldValue" element={<Form3marksList />} />
				<Route path="/form3marks/view/:pageid" element={<Form3marksView />} />
				<Route path="/form3marks/add" element={<Form3marksAdd />} />
				<Route path="/form3marks/edit/:pageid" element={<Form3marksEdit />} />

				{/* form4marks pages routes */}
				<Route path="/form4marks" element={<Form4marksList />} />
				<Route path="/form4marks/:fieldName/:fieldValue" element={<Form4marksList />} />
				<Route path="/form4marks/index/:fieldName/:fieldValue" element={<Form4marksList />} />
				<Route path="/form4marks/view/:pageid" element={<Form4marksView />} />
				<Route path="/form4marks/add" element={<Form4marksAdd />} />
				<Route path="/form4marks/edit/:pageid" element={<Form4marksEdit />} />

				{/* permissions pages routes */}
				<Route path="/permissions" element={<PermissionsList />} />
				<Route path="/permissions/:fieldName/:fieldValue" element={<PermissionsList />} />
				<Route path="/permissions/index/:fieldName/:fieldValue" element={<PermissionsList />} />
				<Route path="/permissions/view/:pageid" element={<PermissionsView />} />
				<Route path="/permissions/add" element={<PermissionsAdd />} />
				<Route path="/permissions/edit/:pageid" element={<PermissionsEdit />} />

				{/* roles pages routes */}
				<Route path="/roles" element={<RolesList />} />
				<Route path="/roles/:fieldName/:fieldValue" element={<RolesList />} />
				<Route path="/roles/index/:fieldName/:fieldValue" element={<RolesList />} />
				<Route path="/roles/view/:pageid" element={<RolesView />} />
				<Route path="/roles/add" element={<RolesAdd />} />
				<Route path="/roles/edit/:pageid" element={<RolesEdit />} />

				{/* students pages routes */}
				<Route path="/students" element={<StudentsList />} />
				<Route path="/students/:fieldName/:fieldValue" element={<StudentsList />} />
				<Route path="/students/index/:fieldName/:fieldValue" element={<StudentsList />} />
				<Route path="/students/view/:pageid" element={<StudentsView />} />
				<Route path="/students/add" element={<StudentsAdd />} />
				<Route path="/students/edit/:pageid" element={<StudentsEdit />} />

				{/* subjects pages routes */}
				<Route path="/subjects" element={<SubjectsList />} />
				<Route path="/subjects/:fieldName/:fieldValue" element={<SubjectsList />} />
				<Route path="/subjects/index/:fieldName/:fieldValue" element={<SubjectsList />} />
				<Route path="/subjects/view/:pageid" element={<SubjectsView />} />
				<Route path="/subjects/add" element={<SubjectsAdd />} />
				<Route path="/subjects/edit/:pageid" element={<SubjectsEdit />} />

				{/* teachers pages routes */}
				<Route path="/teachers" element={<TeachersList />} />
				<Route path="/teachers/:fieldName/:fieldValue" element={<TeachersList />} />
				<Route path="/teachers/index/:fieldName/:fieldValue" element={<TeachersList />} />
				<Route path="/teachers/view/:pageid" element={<TeachersView />} />
				<Route path="/teachers/add" element={<TeachersAdd />} />
				<Route path="/teachers/edit/:pageid" element={<TeachersEdit />} />

				{/* teachersroles pages routes */}
				<Route path="/teachersroles" element={<TeachersrolesList />} />
				<Route path="/teachersroles/:fieldName/:fieldValue" element={<TeachersrolesList />} />
				<Route path="/teachersroles/index/:fieldName/:fieldValue" element={<TeachersrolesList />} />
				<Route path="/teachersroles/view/:pageid" element={<TeachersrolesView />} />
				<Route path="/teachersroles/add" element={<TeachersrolesAdd />} />
				<Route path="/teachersroles/edit/:pageid" element={<TeachersrolesEdit />} />

				{/* users pages routes */}
				<Route path="/users" element={<UsersList />} />
				<Route path="/users/:fieldName/:fieldValue" element={<UsersList />} />
				<Route path="/users/index/:fieldName/:fieldValue" element={<UsersList />} />
				<Route path="/users/view/:pageid" element={<UsersView />} />
				<Route path="/users/add" element={<UsersAdd />} />
				<Route path="/users/edit/:pageid" element={<UsersEdit />} />
				<Route path="/marks" element={<MarksPage />} />
				<Route path="/account/*" element={<AccountPages />} />
			</Route>
			</Route>
			<Route exact element={<IndexLayout />}>
				<Route path="/" element={<DefaultPage />} />
				<Route path="/*" element={<IndexPages />} />
				<Route path="/error/*" element={<ErrorPages />} />
			</Route>
		</Routes>
	);
}
export default App;
