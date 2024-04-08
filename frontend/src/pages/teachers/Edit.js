import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { CheckDuplicate } from 'components/CheckDuplicate';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useEditPage from 'hooks/useEditPage';
const TeachersEditPage = (props) => {
		const app = useApp();
	// form validation schema
	const validationSchema = yup.object().shape({
		fullname: yup.string().required().label("Fullname"),
		dob: yup.string().required().label("Dob"),
		gender: yup.string().required().label("Gender"),
		phone: yup.string().required().label("Phone"),
		email: yup.string().email().required().label("Email")
	});
	// form default values
	const formDefaultValues = {
		fullname: '', 
		dob: new Date(), 
		gender: '', 
		phone: '', 
		email: '', 
	}
	//where page logics resides
	const pageController = useEditPage({ props, formDefaultValues, afterSubmit });
	//destructure and grab what we need
	const { formData, handleSubmit, submitForm, pageReady, loading, saving, apiRequestError, inputClassName } = pageController
	//Event raised on form submit success
	function afterSubmit(response){
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigate(`/teachers`);
		}
	}
	// loading form data from api
	if(loading){
		return (
			<div className="p-3 text-center">
				<ProgressSpinner style={{width:'50px', height:'50px'}} />
			</div>
		);
	}
	//display error page 
	if(apiRequestError){
		return (
			<PageRequestError error={apiRequestError} />
		);
	}
	//page is ready when formdata loaded successfully
	if(pageReady){
		return (
<main id="TeachersEditPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container">
            <div className="grid justify-content-between align-items-center">
                { !props.isSubPage && 
                <div className="col-fixed " >
                    <Button onClick={() => app.navigate(-1)} label=""  className="p-button p-button-text " icon="pi pi-arrow-left"  />
                </div>
                }
                <div className="col " >
                    <Title title="Edit Teacher"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
            </div>
        </div>
    </section>
    }
    <section className="page-section " >
        <div className="container">
            <div className="grid ">
                <div className="md:col-9 sm:col-12 comp-grid" >
                    <div >
                        <Formik
                            initialValues={formData}
                            validationSchema={validationSchema} 
                            onSubmit={(values, actions) => {
                            submitForm(values);
                            }
                            }
                            >
                            { (formik) => {
                            return (
                            <Form className={`${!props.isSubPage ? 'card  ' : ''}`}>
                                <div className="grid">
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Fullname *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="fullname"  onChange={formik.handleChange}  value={formik.values.fullname}   label="Fullname" type="text" placeholder="Enter Fullname"        className={inputClassName(formik?.errors?.fullname)} />
                                                <ErrorMessage name="fullname" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Dob *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="dob" showButtonBar className={inputClassName(formik?.errors?.dob)} dateFormat="yy-mm-dd" value={formik.values.dob} onChange={formik.handleChange} showIcon        />
                                                <ErrorMessage name="dob" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Gender *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Dropdown  name="gender"     optionLabel="label" optionValue="value" value={formik.values.gender} onChange={formik.handleChange} options={app.menus.gender} label="Gender"  placeholder="Select a value ..."  className={inputClassName(formik?.errors?.gender)}   />
                                                <ErrorMessage name="gender" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Phone *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <CheckDuplicate value={formik.values.phone} apiPath="components_data/teachers_phone_exist">
                                                { (checker) => 
                                                <>
                                                <InputText name="phone" onBlur={checker.check} onChange={formik.handleChange}  value={formik.values.phone}   label="Phone" type="text" placeholder="Enter Phone"        className={inputClassName(formik?.errors?.phone)} />
                                                <ErrorMessage name="phone" component="span" className="p-error" />
                                                {(!checker.loading && checker.exist) && <small className="p-error">Not available</small>}
                                                {checker.loading && <small className="text-500">Checking...</small> }
                                                </>
                                                }
                                                </CheckDuplicate>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Email *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <CheckDuplicate value={formik.values.email} apiPath="components_data/teachers_email_exist">
                                                { (checker) => 
                                                <>
                                                <InputText name="email" onBlur={checker.check} onChange={formik.handleChange}  value={formik.values.email}   label="Email" type="email" placeholder="Enter Email"        className={inputClassName(formik?.errors?.email)} />
                                                <ErrorMessage name="email" component="span" className="p-error" />
                                                {(!checker.loading && checker.exist) && <small className="p-error">Not available</small>}
                                                {checker.loading && <small className="text-500">Checking...</small> }
                                                </>
                                                }
                                                </CheckDuplicate>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                { props.showFooter && 
                                <div className="text-center my-3">
                                    <Button onClick={(e) => handleSubmit(e, formik)}  type="submit" label="Update" icon="pi pi-send" loading={saving} />
                                </div>
                                }
                            </Form>
                            );
                            }
                            }
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
		);
	}
}
TeachersEditPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'teachers',
	apiPath: 'teachers/edit',
	routeName: 'teachersedit',
	submitButtonLabel: "Update",
	formValidationError: "Form is invalid",
	formValidationMsg: "Please complete the form",
	msgTitle: "Update Record",
	msgAfterSave: "Record updated successfully",
	msgBeforeSave: "",
	showHeader: true,
	showFooter: true,
	redirect: true,
	isSubPage: false
}
export default TeachersEditPage;
