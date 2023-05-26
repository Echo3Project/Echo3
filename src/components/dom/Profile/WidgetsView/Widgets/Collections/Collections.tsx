import { ReactElement } from 'react';

import { Notifications } from '@/components/dom/Elements';

import Layout from '../../Layout';

export default function Collections(): ReactElement {
    return (
        <Layout row={1} style="plain">
            <div className="relative w-full h-full flex flex-col justify-center items-center p-2">
                <div className="absolute top-0 mt-1">
                    <Notifications count={2} />
                </div>
                <h2 className="text-sm mb-1">Mes Collections</h2>
                <p className="text-center text-xs">
                    Retrouves les projets que tu as sauvegardés ici
                </p>
            </div>
        </Layout>
    );
}
