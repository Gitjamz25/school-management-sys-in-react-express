import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useEditPage from 'hooks/useEditPage';
const MarksEditPage = (props) => {
		const app = useApp();
	// form validation schema
	const validationSchema = yup.object().shape({
		year: yup.string().required().label("Year"),
		term: yup.number().required().label("Term"),
		uid: yup.number().required().label("Uid"),
		form: yup.string().nullable().label("Form"),
		maths: yup.number().required().label("Maths"),
		english: yup.number().required().label("English"),
		kiswahili: yup.number().required().label("Kiswahili"),
		chemistry: yup.number().required().label("Chemistry"),
		biology: yup.number().required().label("Biology"),
		physics: yup.number().required().label("Physics"),
		history: yup.number().required().label("History"),
		geography: yup.number().required().label("Geography"),
		cre: yup.number().required().label("Cre"),
		business: yup.number().required().label("Business"),
		computer: yup.number().required().label("Computer")
	});
	// form default values
	const formDefaultValues = {
		year: '', 
		term: '', 
		uid: '', 
		form: "NULL", 
		maths: '', 
		english: '', 
		kiswahili: '', 
		chemistry: '', 
		biology: '', 
		physics: '', 
		history: '', 
		geography: '', 
		cre: '', 
		business: '', 
		computer: '', 
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
			app.navigate(`/marks`);
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
<main id="MarksEditPage" className="main-page">
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
                    <Title title="Edit Mark"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                                                Year *
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
                                                <InputText name="term"  onChange={formik.handleChange}  value={formik.values.term}   label="Term" type="number" placeholder="Enter Term"  min={0}  step="any"    className={inputClassName(formik?.errors?.term)} />
                                                <ErrorMessage name="term" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Uid *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="uid"  onChange={formik.handleChange}  value={formik.values.uid}   label="Uid" type="number" placeholder="Enter Uid"  min={0}  step="any"    className={inputClassName(formik?.errors?.uid)} />
                                                <ErrorMessage name="uid" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Form 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="form"  onChange={formik.handleChange}  value={formik.values.form}   label="Form" type="text" placeholder="Enter Form"        className={inputClassName(formik?.errors?.form)} />
                                                <ErrorMessage name="form" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Maths *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="maths"  onChange={formik.handleChange}  value={formik.values.maths}   label="Maths" type="number" placeholder="Enter Maths"  min={0}  step="any"    className={inputClassName(formik?.errors?.maths)} />
                                                <ErrorMessage name="maths" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                English *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="english"  onChange={formik.handleChange}  value={formik.values.english}   label="English" type="number" placeholder="Enter English"  min={0}  step="any"    className={inputClassName(formik?.errors?.english)} />
                                                <ErrorMessage name="english" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Kiswahili *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="kiswahili"  onChange={formik.handleChange}  value={formik.values.kiswahili}   label="Kiswahili" type="number" placeholder="Enter Kiswahili"  min={0}  step="any"    className={inputClassName(formik?.errors?.kiswahili)} />
                                                <ErrorMessage name="kiswahili" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Chemistry *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="chemistry"  onChange={formik.handleChange}  value={formik.values.chemistry}   label="Chemistry" type="number" placeholder="Enter Chemistry"  min={0}  step="any"    className={inputClassName(formik?.errors?.chemistry)} />
                                                <ErrorMessage name="chemistry" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Biology *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="biology"  onChange={formik.handleChange}  value={formik.values.biology}   label="Biology" type="number" placeholder="Enter Biology"  min={0}  step="any"    className={inputClassName(formik?.errors?.biology)} />
                                                <ErrorMessage name="biology" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Physics *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="physics"  onChange={formik.handleChange}  value={formik.values.physics}   label="Physics" type="number" placeholder="Enter Physics"  min={0}  step="any"    className={inputClassName(formik?.errors?.physics)} />
                                                <ErrorMessage name="physics" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                History *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="history"  onChange={formik.handleChange}  value={formik.values.history}   label="History" type="number" placeholder="Enter History"  min={0}  step="any"    className={inputClassName(formik?.errors?.history)} />
                                                <ErrorMessage name="history" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Geography *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="geography"  onChange={formik.handleChange}  value={formik.values.geography}   label="Geography" type="number" placeholder="Enter Geography"  min={0}  step="any"    className={inputClassName(formik?.errors?.geography)} />
                                                <ErrorMessage name="geography" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Cre *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="cre"  onChange={formik.handleChange}  value={formik.values.cre}   label="Cre" type="number" placeholder="Enter Cre"  min={0}  step="any"    className={inputClassName(formik?.errors?.cre)} />
                                                <ErrorMessage name="cre" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Business *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="business"  onChange={formik.handleChange}  value={formik.values.business}   label="Business" type="number" placeholder="Enter Business"  min={0}  step="any"    className={inputClassName(formik?.errors?.business)} />
                                                <ErrorMessage name="business" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Computer *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="computer"  onChange={formik.handleChange}  value={formik.values.computer}   label="Computer" type="number" placeholder="Enter Computer"  min={0}  step="any"    className={inputClassName(formik?.errors?.computer)} />
                                                <ErrorMessage name="computer" component="span" className="p-error" />
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
MarksEditPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'marks',
	apiPath: 'marks/edit',
	routeName: 'marksedit',
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
export default MarksEditPage;
