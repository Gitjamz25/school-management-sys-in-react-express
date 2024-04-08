import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import AssignmentsEditPage from 'pages/assignments/Edit';
import useApp from 'hooks/useApp';
import useAuth from 'hooks/useAuth';

import useViewPage from 'hooks/useViewPage';
const AssignmentsViewPage = (props) => {
		const auth = useAuth();
	const app = useApp();
	const pageController = useViewPage(props);
	const { item, pageReady, loading, apiRequestError, deleteItem } = pageController;
	function ActionButton(data){
		const items = [
		{
			label: "Edit",
			command: (event) => { app.openPageDialog(<AssignmentsEditPage isSubPage apiPath={`/assignments/edit/${data.id}`} />, {closeBtn: true }) },
			icon: "pi pi-pencil",
			visible: () => auth.canView('assignments/edit')
		},
		{
			label: "Delete",
			command: (event) => { deleteItem(data.id) },
			icon: "pi pi-trash",
			visible: () => auth.canView('assignments/delete')
		}
	]
	.filter((item) => {
		if(item.visible){
			return item.visible()
		}
		return true;
	});
		return (<Menubar className="p-0 " model={items} />);
	}
	function PageFooter() {
		if (props.showFooter) {
			return (
				<div className="flex justify-content-between">
	<div className="flex justify-content-start">
	{ActionButton(item)}
	</div>
				</div>
			);
		}
	}
	if(loading){
		return (
			<div className="p-3 text-center">
				<ProgressSpinner style={{width:'50px', height:'50px'}} />
			</div>
		);
	}
	if(apiRequestError){
		return (
			<PageRequestError error={apiRequestError} />
		);
	}
	if(pageReady){
		return (
			<div>
<main id="AssignmentsViewPage" className="main-page">
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
                    <Title title="Assignment Details"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
            </div>
        </div>
    </section>
    }
    <section className="page-section " >
        <div className="container">
            <div className="grid ">
                <div className="col comp-grid" >
                    <div >
                        {/*PageComponentStart*/}
                        <div className="mb-3 ">
                            <div className="grid align-items-center">
                                <div className="col">
                                    <div className="text-400 font-medium mb-1">Year</div>
                                    <div className="font-bold">{ item.year }</div>
                                </div>
                            </div>
                            <hr />
                            <div className="grid align-items-center">
                                <div className="col">
                                    <div className="text-400 font-medium mb-1">Term</div>
                                    <div className="font-bold">{ item.term }</div>
                                </div>
                            </div>
                            <hr />
                            <div className="grid align-items-center">
                                <div className="col">
                                    <div className="text-400 font-medium mb-1">Subject</div>
                                    <div className="font-bold">{ item.subject }</div>
                                </div>
                            </div>
                            <hr />
                            <div className="grid align-items-center">
                                <div className="col">
                                    <div className="text-400 font-medium mb-1">Asignment Name</div>
                                    <div className="font-bold">{ item.asignment_name }</div>
                                </div>
                            </div>
                            <hr />
                            <div className="grid align-items-center">
                                <div className="col">
                                    <div className="text-400 font-medium mb-1">File</div>
                                    <div className="font-bold">{ item.file }</div>
                                </div>
                            </div>
                            <hr />
                            <div className="grid align-items-center">
                                <div className="col">
                                    <div className="text-400 font-medium mb-1">Instructions</div>
                                    <div className="font-bold">{ item.instructions }</div>
                                </div>
                            </div>
                            <hr />
                        </div>
                        {/*PageComponentEnd*/}
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
				<PageFooter />
			</div>
		);
	}
}
AssignmentsViewPage.defaultProps = {
	id: null,
	primaryKey: 'id',
	pageName: 'assignments',
	apiPath: 'assignments/view',
	routeName: 'assignmentsview',
	msgBeforeDelete: "Are you sure you want to delete this record?",
	msgTitle: "Delete record",
	msgAfterDelete: "Record deleted successfully",
	showHeader: true,
	showFooter: true,
	exportButton: true,
	isSubPage: false,
}
export default AssignmentsViewPage;
