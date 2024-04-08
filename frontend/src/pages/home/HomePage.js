import { useState } from 'react';
import { RecordCount } from 'components/RecordCount';
import { Title } from 'components/Title';

export default function HomePage() {
	
	const [pageReady, setPageReady] = useState(true);
	return (
		<main id="HomePage" className="main-page">
<section className="page-section q-pa-md" >
    <div className="container-fluid">
        <div className="grid ">
            <div className="col comp-grid" >
                <Title title="Home"  headerClass="animated zoomIn" titleClass="text-lg font-bold text-primary" subTitleClass="text-500"      separator={false} />
            </div>
        </div>
    </div>
</section>
<section className="page-section mb-3" >
    <div className="container-fluid">
        <div className="grid ">
            <div className="col-12 md:col-3 comp-grid" >
                <RecordCount title="Students" description="Total Students" icon="pi pi-users" apiPath="components_data/form1marks_data_component_2" link={`/students`} cardClass="bg-blue-100 text-blue-800" avatarClass="text-blue-100 bg-green-600"   />
            </div>
            <div className="col-12 md:col-3 comp-grid" >
                <RecordCount title="Teachers" description="Total Teachers" icon="pi pi-user-edit" apiPath="components_data/getcount_students_3" link={`/teachers`} cardClass="bg-blue-100 text-blue-800" avatarClass="bg-blue-600 text-blue-100"   />
            </div>
            <div className="col-12 md:col-3 comp-grid" >
                <RecordCount title="Classes" description="Total Classes" icon="pi pi-align-center" apiPath="components_data/getcount_classes" link={`/classes`} cardClass="bg-blue-100 text-blue-800" avatarClass="bg-blue-600 text-blue-100"   />
            </div>
        </div>
    </div>
</section>
		</main>
	);
}
