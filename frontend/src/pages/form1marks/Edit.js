import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useEditPage from 'hooks/useEditPage';
const Form1marksEditPage = (props) => {
		const app = useApp();
	// form validation schema
	const validationSchema = yup.object().shape({
		year: yup.number().nullable().label("Year"),
		term: yup.string().nullable().label("Term"),
		fullname: yup.string().nullable().label("Fullname"),
		form: yup.string().nullable().label("Form"),
		math: yup.number().nullable().label("Math"),
		eng: yup.number().nullable().label("Eng"),
		kis: yup.number().nullable().label("Kis"),
		chem: yup.number().nullable().label("Chem"),
		phy: yup.number().nullable().label("Phy"),
		bio: yup.number().nullable().label("Bio"),
		geo: yup.number().nullable().label("Geo"),
		hist: yup.number().nullable().label("Hist"),
		cre: yup.number().nullable().label("Cre"),
		bus: yup.number().nullable().label("Bus"),
		comp: yup.number().nullable().label("Comp"),
		total: yup.number().nullable().label("Total"),
		average: yup.number().nullable().label("Average")
	});
	// form default values
	const formDefaultValues = {
		year: '', 
		term: '', 
		fullname: '', 
		form: '', 
		math: '', 
		eng: "NULL", 
		kis: '', 
		chem: '', 
		phy: '', 
		bio: '', 
		geo: '', 
		hist: '', 
		cre: '', 
		bus: '', 
		comp: '', 
		total: '', 
		average: '', 
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
			app.navigate(`/form1marks`);
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
<main id="Form1marksEditPage" className="main-page">
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
                    <Title title="Edit Form 1 Marks"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                                                Year 
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
                                                <Dropdown  name="term"     optionLabel="label" optionValue="value" value={formik.values.term} onChange={formik.handleChange} options={app.menus.term} label="Term"  placeholder="Select a value ..."  className={inputClassName(formik?.errors?.term)}   />
                                                <ErrorMessage name="term" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Fullname 
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
                                                Form 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/form_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="form"     optionLabel="label" optionValue="value" value={formik.values.form} onChange={formik.handleChange} options={response} label="Form"  placeholder="Select a value ..."  className={inputClassName(formik?.errors?.form)}   />
                                                    <ErrorMessage name="form" component="span" className="p-error" />
                                                    </>
                                                    }
                                                </DataSource>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Math 
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
                                                Eng 
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
                                                Kis 
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
                                                Chem 
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
                                                Phy 
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
                                                Bio 
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
                                                Geo 
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
                                                Hist 
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
                                                Cre 
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
                                                Bus 
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
Form1marksEditPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'form1marks',
	apiPath: 'form1marks/edit',
	routeName: 'form1marksedit',
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
export default Form1marksEditPage;
