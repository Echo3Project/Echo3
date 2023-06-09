import { ReactElement } from 'react';

import Layout from '../../Layout';

export default function Contributions(): ReactElement {
    return (
        <Layout row={1.5} style="light">
            <div className="relative w-full h-full">
                <div className="bg-contributions bg-contain bg-no-repeat absolute w-full h-full opacity-10 pointer-events-none" />
                <div className="w-full h-full flex flex-col justify-center items-center py-4 px-6">
                    <div className="w-full flex justify-between items-center border-b border-light pb-4">
                        <h2 className="font-medium text-xl">
                            Points de contrib
                        </h2>
                        <span className="font-light text-lg">1857pts</span>
                    </div>
                    <div className="w-full h-full flex flex-col items-center justify-between pt-4 pb-2 font-light opacity-50">
                        <div className="w-full flex justify-between">
                            <span>152 Contributions</span>
                            <span>+ 1583pts</span>
                        </div>
                        <div className="w-full flex justify-between">
                            <span>5 Projets ajoutés</span>
                            <span>+ 274pts</span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
