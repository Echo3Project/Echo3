import { ReactElement } from 'react';

import Layout from '../../Layout';

export default function Lighthouse(): ReactElement {
    return (
        <Layout row={2} style="plain">
            <div className="w-full h-full flex flex-col justify-center items-center p-2">
                <h2 className="text-sm mb-1">Cross The Ages</h2>
                <p className="text-center text-xs w-40">
                    Retrouves le projet phare de ton choix
                </p>
            </div>
        </Layout>
    );
}
