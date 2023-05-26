import { ReactElement } from 'react';

import Layout from '../../Layout';

export default function ExternalLinks(): ReactElement {
    return (
        <Layout row={1} style="empty">
            <div className="w-full h-full flex flex-col justify-center items-center p-2">
                <h2 className="text-sm mb-1">Ajouter un lien externe</h2>
                <p className="text-center text-xs">
                    Retrouves mes contacts extérieurs à HUBBL ici
                </p>
            </div>
        </Layout>
    );
}
