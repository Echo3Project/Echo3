import { ReactElement } from 'react';

import Layout from './Layout';
import {
    Collections,
    Contributions,
    ExternalLinks,
    Lighthouse,
    Map,
    TimeSpent,
} from './Widgets';

export default function ProfileWidgets(): ReactElement {
    return (
        <div className="flex flex-wrap gap-2 px-4 my-4 w-full">
            <Map />
            <Layout row={2}>
                <Layout direction="column" row={2}>
                    <Collections />
                    <TimeSpent />
                </Layout>
                <Contributions />
            </Layout>
            <Lighthouse />
            <ExternalLinks />
        </div>
    );
}
