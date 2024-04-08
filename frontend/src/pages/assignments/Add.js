import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import { Uploader } from 'components/Uploader';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const AssignmentsAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		year: yup.string().nullable().label("Year"),
		term: yup.string().required().label("Term"),
		subject: yup.string().required().label("Subject"),
		asignment_name: yup.string().required().label("Asignment Name"),
		file: yup.string().required().label("Document"),
		instructions: yup.string().required().label("Instructions")
	});
	
	//form default values
	const formDefaultValues = {
		year: '', 
		term: '', 
		subject: '', 
		asignment_name: '', 
		file: '', 
		instructions: '', 
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
			app.navigate(`/assignments`);
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
<main id="AssignmentsAddPage" className="main-page">
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
                    <Title title="Add New Assignment"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                                                Year 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="year"  onChange={formik.handleChange}  value={formik.values.year}   label="Year" type="text" placeholder="Enter Year"        className={inputClassName(formik?.errors?.year)} />
                                                <ErrorMessage name="year" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Term *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Dropdown  name="term"     optionLabel="label" optionValue="value" value={formik.values.term} onChange={formik.handleChange} options={app.menus.term} label="Term"  placeholder="Select a value ..."  className={inputClassName(formik?.errors?.term)}   />
                                                <ErrorMessage name="term" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Subject *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/subject_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="subject"     optionLabel="label" optionValue="value" value={formik.values.subject} onChange={formik.handleChange} options={response} label="Subject"  placeholder="Select a value ..."  className={inputClassName(formik?.errors?.subject)}   />
                                                    <ErrorMessage name="subject" component="span" className="p-error" />
                                                    </>
                                                    }
                                                </DataSource>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Asignment Name *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Dropdown  name="asignment_name"     optionLabel="label" optionValue="value" value={formik.values.asignment_name} onChange={formik.handleChange} options={app.menus.asignmentName} label="Asignment Name"  placeholder="Select a value ..."  className={inputClassName(formik?.errors?.asignment_name)}   />
                                                <ErrorMessage name="asignment_name" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Document *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <div className={inputClassName(formik?.errors?.file)}>
                                                    <Uploader name="file" showUploadedFiles value={formik.values.file} uploadPath="fileuploader/upload/file" onChange={(paths) => formik.setFieldValue('file', paths)} fileLimit={1} maxFileSize={3} accept=".docx,.doc,.xls,.xlsx,.xml,.csv,.pdf,.xps" multiple={true} label="Choose files or drop files here" onUploadError={(errMsg) => app.flashMsg('Upload error', errMsg, 'error')} />
                                                </div>
                                                <ErrorMessage name="file" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Instructions *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="instructions"  className={inputClassName(formik?.errors?.instructions)}   value={formik.values.instructions} placeholder="Enter Instructions" onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="instructions" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                { props.showFooter && 
                                <div className="text-center my-3">
                                    <Button onClick={(e) => handleSubmit(e, formik)} className="p-button-primary" type="submit" label="Add Assignment" icon="pi pi-send" loading={saving} />
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
AssignmentsAddPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'assignments',
	apiPath: 'assignments/add',
	routeName: 'assignmentsadd',
	submitButtonLabel: "Add Assignment",
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
export default AssignmentsAddPage;
