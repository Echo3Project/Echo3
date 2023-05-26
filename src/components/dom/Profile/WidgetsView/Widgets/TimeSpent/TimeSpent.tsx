import Image from 'next/image';
import { ReactElement } from 'react';

import Layout from '../../Layout';

export default function TimeSpent(): ReactElement {
    return (
        <Layout row={1} style="plain">
            <div className="relative w-full h-full flex flex-col justify-center items-center p-2">
                <h2 className="text-sm mb-12">Temps passé</h2>
                <Image
                    height={100}
                    width={200}
                    src={'/widgets/timeGraph.png'}
                    alt="timeGraph"
                    className="w-full absolute bottom-0 mix-blend-exclusion"></Image>
            </div>
        </Layout>
    );
}
