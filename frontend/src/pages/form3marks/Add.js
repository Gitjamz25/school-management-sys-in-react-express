import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const Form3marksAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		year: yup.number().required().label("Year"),
		term: yup.string().nullable().label("Term"),
		form: yup.string().nullable().label("Form"),
		math: yup.number().required().label("Math"),
		eng: yup.number().required().label("Eng"),
		kis: yup.number().required().label("Kis"),
		chem: yup.number().required().label("Chem"),
		phy: yup.number().required().label("Phy"),
		bio: yup.number().required().label("Bio"),
		geo: yup.number().required().label("Geo"),
		hist: yup.number().required().label("Hist"),
		cre: yup.number().required().label("Cre"),
		bus: yup.number().required().label("Bus"),
		fullname: yup.string().required().label("Fullname"),
		comp: yup.number().nullable().label("Comp"),
		total: yup.number().nullable().label("Total"),
		average: yup.number().nullable().label("Average")
	});
	
	//form default values
	const formDefaultValues = {
		year: '', 
		term: "'NULL'", 
		form: "'NULL'", 
		math: '', 
		eng: '', 
		kis: '', 
		chem: '', 
		phy: '', 
		bio: '', 
		geo: '', 
		hist: '', 
		cre: '', 
		bus: '', 
		fullname: '', 
		comp: "NULL", 
		total: "NULL", 
		average: "NULL", 
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
			app.navigate(`/form3marks`);
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
<main id="Form3marksAddPage" className="main-page">
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
                    <Title title="Add New Form 3 Marks"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                                                Year *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="year"  onChange={formik.handleChange}  value={formik.values.year}   label="Year" type="number" placeholder="Enter Year"  min={0}  step="any"    className={inputClassName(formik?.errors?.year)} />
                                                <ErrorMessage name="year" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Term 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="term"  onChange={formik.handleChange}  value={formik.values.term}   label="Term" type="text" placeholder="Enter Term"        className={inputClassName(formik?.errors?.term)} />
                                                <ErrorMessage name="term" component="span" className="p-error" />
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
                                                Math *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="math"  onChange={formik.handleChange}  value={formik.values.math}   label="Math" type="number" placeholder="Enter Math"  min={0}  step="any"    className={inputClassName(formik?.errors?.math)} />
                                                <ErrorMessage name="math" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Eng *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="eng"  onChange={formik.handleChange}  value={formik.values.eng}   label="Eng" type="number" placeholder="Enter Eng"  min={0}  step="any"    className={inputClassName(formik?.errors?.eng)} />
                                                <ErrorMessage name="eng" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Kis *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="kis"  onChange={formik.handleChange}  value={formik.values.kis}   label="Kis" type="number" placeholder="Enter Kis"  min={0}  step="any"    className={inputClassName(formik?.errors?.kis)} />
                                                <ErrorMessage name="kis" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Chem *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="chem"  onChange={formik.handleChange}  value={formik.values.chem}   label="Chem" type="number" placeholder="Enter Chem"  min={0}  step="any"    className={inputClassName(formik?.errors?.chem)} />
                                                <ErrorMessage name="chem" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Phy *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="phy"  onChange={formik.handleChange}  value={formik.values.phy}   label="Phy" type="number" placeholder="Enter Phy"  min={0}  step="any"    className={inputClassName(formik?.errors?.phy)} />
                                                <ErrorMessage name="phy" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Bio *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="bio"  onChange={formik.handleChange}  value={formik.values.bio}   label="Bio" type="number" placeholder="Enter Bio"  min={0}  step="any"    className={inputClassName(formik?.errors?.bio)} />
                                                <ErrorMessage name="bio" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Geo *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="geo"  onChange={formik.handleChange}  value={formik.values.geo}   label="Geo" type="number" placeholder="Enter Geo"  min={0}  step="any"    className={inputClassName(formik?.errors?.geo)} />
                                                <ErrorMessage name="geo" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Hist *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="hist"  onChange={formik.handleChange}  value={formik.values.hist}   label="Hist" type="number" placeholder="Enter Hist"  min={0}  step="any"    className={inputClassName(formik?.errors?.hist)} />
                                                <ErrorMessage name="hist" component="span" className="p-error" />
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
                                                Bus *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="bus"  onChange={formik.handleChange}  value={formik.values.bus}   label="Bus" type="number" placeholder="Enter Bus"  min={0}  step="any"    className={inputClassName(formik?.errors?.bus)} />
                                                <ErrorMessage name="bus" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
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
                                                Comp 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="comp"  onChange={formik.handleChange}  value={formik.values.comp}   label="Comp" type="number" placeholder="Enter Comp"  min={0}  step="any"    className={inputClassName(formik?.errors?.comp)} />
                                                <ErrorMessage name="comp" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Total 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="total"  onChange={formik.handleChange}  value={formik.values.total}   label="Total" type="number" placeholder="Enter Total"  min={0}  step="any"    className={inputClassName(formik?.errors?.total)} />
                                                <ErrorMessage name="total" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Average 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="average"  onChange={formik.handleChange}  value={formik.values.average}   label="Average" type="number" placeholder="Enter Average"  min={0}  step="any"    className={inputClassName(formik?.errors?.average)} />
                                                <ErrorMessage name="average" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                { props.showFooter && 
                                <div className="text-center my-3">
                                    <Button onClick={(e) => handleSubmit(e, formik)} className="p-button-primary" type="submit" label="Submit" icon="pi pi-send" loading={saving} />
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
Form3marksAddPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'form3marks',
	apiPath: 'form3marks/add',
	routeName: 'form3marksadd',
	submitButtonLabel: "Submit",
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
export default Form3marksAddPage;
