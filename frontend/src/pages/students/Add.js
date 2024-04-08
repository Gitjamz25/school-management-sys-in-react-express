import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { RadioButton } from 'primereact/radiobutton';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const StudentsAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		fullname: yup.string().required().label("Fullname"),
		dob: yup.string().required().label("Dob"),
		gender: yup.string().required().label("Gender"),
		residence: yup.string().required().label("Residence"),
		phone: yup.string().required().label("Phone"),
		email: yup.string().email().required().label("Email"),
		class: yup.string().nullable().label("Class")
	});
	
	//form default values
	const formDefaultValues = {
		fullname: '', 
		dob: new Date(), 
		gender: '', 
		residence: '', 
		phone: '', 
		email: '', 
		class: '', 
	}
	
	//page hook where logics resides
	const pageController =  useAddPage({ props, formDefaultValues, afterSubmit });
	
	// destructure and grab what the page needs
	const { formData, resetForm, handleSubmit, submitForm, pageReady, loading, saving, inputClassName } = pageController;
	
	//event raised after form submit
	function afterSubmit(response){
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		resetForm();
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigate(`/students`);
		}
	}
	
	// page loading form data from api
	if(loading){
		return (
			<div className="p-3 text-center">
				<ProgressSpinner style={{width:'50px', height:'50px'}} />
			</div>
		);
	}
	
	//page has loaded any required data and ready to render
	if(pageReady){
		return (
<main id="StudentsAddPage" className="main-page">
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
                    <Title title="Add New Student"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                        <Formik initialValues={formData} validationSchema={validationSchema} onSubmit={(values, actions) =>submitForm(values)}>
                            {(formik) => 
                            <>
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
                                                {
                                                app.menus.gender.map((option) => {
                                                return (
                                                <div key={option.value} className="field-radiobutton">
                                                    <RadioButton inputId={option.value} name="gender" value={option.value} onChange={formik.handleChange}  checked={formik.values.gender === option.value} className={inputClassName(formik?.errors?.gender, '')} />
                                                    <label htmlFor={option.value}>{option.label}</label>
                                                </div>
                                                )
                                                })
                                                }
                                                <ErrorMessage name="gender" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Residence *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="residence"  onChange={formik.handleChange}  value={formik.values.residence}   label="Residence" type="text" placeholder="Enter Residence"        className={inputClassName(formik?.errors?.residence)} />
                                                <ErrorMessage name="residence" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Phone *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="phone"  onChange={formik.handleChange}  value={formik.values.phone}   label="Phone" type="text" placeholder="Enter Phone"        className={inputClassName(formik?.errors?.phone)} />
                                                <ErrorMessage name="phone" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Email *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="email"  onChange={formik.handleChange}  value={formik.values.email}   label="Email" type="email" placeholder="Enter Email"        className={inputClassName(formik?.errors?.email)} />
                                                <ErrorMessage name="email" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Class 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/class_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="class"     optionLabel="label" optionValue="value" value={formik.values.class} onChange={formik.handleChange} options={response} label="Class"  placeholder="Select a value ..."  className={inputClassName(formik?.errors?.class)}   />
                                                    <ErrorMessage name="class" component="span" className="p-error" />
                                                    </>
                                                    }
                                                </DataSource>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                { props.showFooter && 
                                <div className="text-center my-3">
                                    <Button onClick={(e) => handleSubmit(e, formik)} className="p-button-primary" type="submit" label="Add Student" icon="pi pi-send" loading={saving} />
                                </div>
                                }
                            </Form>
                            </>
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

//page props and default values
StudentsAddPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'students',
	apiPath: 'students/add',
	routeName: 'studentsadd',
	submitButtonLabel: "Add Student",
	formValidationError: "Form is invalid",
	formValidationMsg: "Please complete the form",
	msgTitle: "Create Record",
	msgAfterSave: "Record added successfully",
	msgBeforeSave: "",
	showHeader: true,
	showFooter: true,
	redirect: true,
	isSubPage: false
}
export default StudentsAddPage;
