import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { CanView } from 'components/Can';
import { Chip } from 'primereact/chip';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ExportPageData } from 'components/ExportPageData';
import { FilterTags } from 'components/FilterTags';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { PageRequestError } from 'components/PageRequestError';
import { Paginator } from 'primereact/paginator';
import { ProgressSpinner } from 'primereact/progressspinner';
import { SplitButton } from 'primereact/splitbutton';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';
import useAuth from 'hooks/useAuth';
import useUtils from 'hooks/useUtils';

import useListPage from 'hooks/useListPage';
const Form1marksListPage = (props) => {
		const auth = useAuth();
	const app = useApp();
	const utils = useUtils();
	const filterSchema = {
		search: {
			tagTitle: "Search",
			value: '',
			valueType: 'single',
			options: [],
		}
	}
	const pageController = useListPage(props, filterSchema);
	const filterController = pageController.filterController;
	const { records, pageReady, loading, selectedItems, apiUrl, sortBy, sortOrder, apiRequestError, setSelectedItems, getPageBreadCrumbs, onSort, deleteItem, pagination } = pageController;
	const { filters, setFilterValue } = filterController;
	const { totalRecords, totalPages, recordsPosition, firstRow, limit, onPageChange } =  pagination;
	// return average of id for the current records
	const avgId = utils.average(records, 'id');
	// return average of math for the current records
	const avgMath = utils.average(records, 'math');
	// return average of eng for the current records
	const avgEng = utils.average(records, 'eng');
	function ActionButton(data){
		const items = [
		{
			label: "View",
			command: (event) => { app.navigate(`/form1marks/view/${data.id}`) },
			icon: "pi pi-eye",
			visible: () => auth.canView('form1marks/view')
		},
		{
			label: "Edit",
			command: (event) => { app.navigate(`/form1marks/edit/${data.id}`) },
			icon: "pi pi-pencil",
			visible: () => auth.canView('form1marks/edit')
		},
		{
			label: "Delete",
			command: (event) => { deleteItem(data.id) },
			icon: "pi pi-trash",
			visible: () => auth.canView('form1marks/delete')
		}
	]
	.filter((item) => {
		if(item.visible){
			return item.visible()
		}
		return true;
	});
		return (<SplitButton dropdownIcon="pi pi-bars" className="dropdown-only p-button-text p-button-plain" model={items} />);
	}
	function IdTemplate(data){
		if(data){
			return (
				<Link to={`/form1marks/view/${data.id}`}> { data.id }</Link>
			);
		}
	}
	function TotalTemplate(data){
		if(data){
			return (
				<><Chip label={(data.math)+(data.eng)+(data.kis)} /></>
			);
		}
	}
	function AverageTemplate(data){
		if(data){
			return (
				<><Chip label={((data.math)+(data.eng)+(data.kis)+(data.chem)+(data.phy)+(data.bio)+(data.geo)+(data.hist)+(data.cre)+(data.bus)+(data.comp))/11} /></>
			);
		}
	}
	function PageLoading(){
		if(loading){
			return (
				<>
					<div className="flex align-items-center justify-content-center text-gray-500 p-3">
						<div><ProgressSpinner style={{width:'30px', height:'30px'}} /> </div>
						<div  className="font-bold text-lg">Loading...</div>
					</div>
				</>
			);
		}
	}
	function EmptyRecordMessage(){
		if(pageReady && !records.length){
			return (
				<div className="text-lg mt-3 p-3 text-center text-400 font-bold">
					No record found
				</div>
			);
		}
	}
	function MultiDelete() {
		if (selectedItems.length) {
			return (
				<div className="m-2 flex-grow-0">
					<Button onClick={() => deleteItem(selectedItems)} icon="pi pi-trash" className="p-button-danger" title="Delete Selected"/>
				</div>
			)
		}
	}
	function ExportData() {
		if (props.exportData && records.length) {
			const downloadFileName = `${utils.dateNow()}-form1marks`;
			return (
				<div className="m-2">
					<ExportPageData  pageUrl={apiUrl} downloadFileName={downloadFileName} butonLabel="export" tooltip="Export" buttonIcon="pi pi-print" />
				</div>
			);
		}
	}
	function PagerControl() {
		if (props.paginate && totalPages > 1) {
		const pagerReportTemplate = {
			layout: pagination.layout,
			CurrentPageReport: (options) => {
				return (
					<>
						<span className="text-sm text-gray-500 px-2">Records <b>{ recordsPosition } of { options.totalRecords }</b></span>
					</>
				);
			}
		}
		return (
			<div className="flex-grow-1">
				<Paginator first={firstRow} rows={limit} totalRecords={totalRecords}  onPageChange={onPageChange} template={pagerReportTemplate} />
			</div>
		)
		}
	}
	function PageActionButtons() {
		return (
			<div className="flex flex-wrap">
	<CanView pagePath="form1marks/delete">
		<MultiDelete />
	</CanView>
				<ExportData />
			</div>
		);
	}
	function PageFooter() {
		if (pageReady && props.showFooter) {
			return (
				<div className="flex flex-wrap">
					<PageActionButtons />
					<PagerControl />
				</div>
			);
		}
	}
	function PageBreadcrumbs(){
		if(props.showBreadcrumbs) {
			const items = getPageBreadCrumbs();
			return (items.length > 0 && <BreadCrumb className="mb-3" model={items} />);
		}
	}
	if(apiRequestError){
		return (
			<PageRequestError error={apiRequestError} />
		);
	}
	return (
<main id="Form1marksListPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container-fluid">
            <div className="grid justify-content-between align-items-center">
                <div className="col " >
                    <Title title="Form 1 Marks"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
                <div className="col-fixed " >
                    <CanView pagePath="">
                        <Link to={`/form1marks/add`}>
                            <Button label="Add New Form 1 Marks" icon="pi pi-plus" type="button" className="p-button w-full bg-primary "  />
                            </Link>
                        </CanView>
                    </div>
                    <div className="col-12 md:col-3 " >
                        <span className="p-input-icon-left w-full">
                        <i className="pi pi-search" />
                        <InputText placeholder="Search" className="w-full" value={filters.search.value}  onChange={(e) => setFilterValue('search', e.target.value)} />
                        </span>
                    </div>
                </div>
            </div>
        </section>
        }
        <section className="page-section " >
            <div className="container-fluid">
                <div className="grid ">
                    <div className="col comp-grid" >
                        <FilterTags filterController={filterController} />
                        <div >
                            <PageBreadcrumbs />
                            <div className="page-records">
                                <DataTable 
                                    lazy={true} 
                                    loading={loading} 
                                    selectionMode="checkbox" selection={selectedItems} onSelectionChange={e => setSelectedItems(e.value)}
                                    value={records} 
                                    dataKey="id" 
                                    sortField={sortBy} 
                                    sortOrder={sortOrder} 
                                    onSort={onSort}
                                    className=" p-datatable-sm" 
                                    stripedRows={true}
                                    showGridlines={false} 
                                    rowHover={true} 
                                    responsiveLayout="stack" 
                                    emptyMessage={<EmptyRecordMessage />} 
                                    >
                                    {/*PageComponentStart*/}
                                    <Column selectionMode="multiple" headerStyle={{width: '2rem'}}></Column>
                                    <Column  field="id" header="Id" body={IdTemplate}  ></Column>
                                    <Column  field="fullname" header="Fullname"   ></Column>
                                    <Column  field="year" header="Year"   ></Column>
                                    <Column  field="term" header="Term"   ></Column>
                                    <Column  field="form" header="Form"   ></Column>
                                    <Column  field="math" header="Math"   ></Column>
                                    <Column  field="eng" header="Eng"   ></Column>
                                    <Column  field="kis" header="Kis"   ></Column>
                                    <Column  field="chem" header="Chem"   ></Column>
                                    <Column  field="phy" header="Phy"   ></Column>
                                    <Column  field="bio" header="Bio"   ></Column>
                                    <Column  field="geo" header="Geo"   ></Column>
                                    <Column  field="hist" header="Hist"   ></Column>
                                    <Column  field="cre" header="Cre"   ></Column>
                                    <Column  field="bus" header="Bus"   ></Column>
                                    <Column  field="comp" header="Comp"   ></Column>
                                    <Column  field="total" header="Total" body={TotalTemplate}  ></Column>
                                    <Column  field="average" header="Average" body={AverageTemplate}  ></Column>
                                    <Column headerStyle={{width: '2rem'}} headerClass="text-center" body={ActionButton}></Column>
                                    {/*PageComponentEnd*/}
                                </DataTable>
                                <div className="flex justify-content-around font-bold p-3">
                                    <div>Average Math : <Chip label={avgMath} /></div><div>Average Eng : <Chip label={avgEng} /></div>
                                </div>
                            </div>
                            <PageFooter />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
	);
}
Form1marksListPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'form1marks',
	apiPath: 'form1marks/index',
	routeName: 'form1markslist',
	msgBeforeDelete: "Are you sure you want to delete this record?",
	msgTitle: "Delete record",
	msgAfterDelete: "Record deleted successfully",
	showHeader: true,
	showFooter: true,
	paginate: true,
	isSubPage: false,
	showBreadcrumbs: true,
	exportData: true,
	importData: false,
	keepRecords: false,
	multiCheckbox: true,
	search: '',
	fieldName: null,
	fieldValue: null,
	sortField: '',
	sortDir: '',
	pageNo: 1,
	limit: 10,
}
export default Form1marksListPage;
