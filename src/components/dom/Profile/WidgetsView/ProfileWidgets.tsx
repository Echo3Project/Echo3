import { ReactElement } from 'react';

import { Collections, Contributions } from './Widgets';

export default function ProfileWidgets(): ReactElement {
    return (
        <div className="flex flex-wrap gap-2 p-4 w-full">
            <Contributions />
            <Collections />
            {/* <Layout row={2}>
                <Layout direction="column" row={2}>
                    <Collections />
                    <TimeSpent />
                </Layout>
                <Contributions />
            </Layout>
            <Lighthouse />
            <ExternalLinks /> */}
        </div>
    );
}
