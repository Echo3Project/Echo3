import { ReactElement } from 'react';

import Layout from '../../Layout';

export default function Contributions(): ReactElement {
    return (
        <Layout row={2} style="plain">
            <div className="w-full h-full flex flex-col justify-center items-center p-2">
                <h2 className="text-sm mb-1">Mes Contributions</h2>
                <p className="text-center text-xs">
                    Retrouves ton investissement ici
                </p>
            </div>
        </Layout>
    );
}
