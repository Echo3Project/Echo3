import { ReactElement } from 'react';

import Layout from '../../Layout';

export default function Map(): ReactElement {
    return (
        <Layout row={2} style="plain">
            <div
                className="h-full w-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/widgets/map.jpg)' }}></div>
        </Layout>
    );
}
