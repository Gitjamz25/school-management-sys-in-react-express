import { useState } from 'react';
import { Title } from 'components/Title';

export default function MarksPage() {
	
	const [pageReady, setPageReady] = useState(true);
	return (
		<main id="MarksPage" className="main-page">
<section className="page-section q-pa-md" >
    <div className="container-fluid">
        <div className="grid ">
            <div className="col comp-grid" >
                <Title title="Marks"   titleClass="text-lg font-bold text-primary" subTitleClass="text-500"      separator={false} />
            </div>
        </div>
    </div>
</section>
		</main>
	);
}
