import { EthereumModel } from '@canvas/models/EthereumModel';
import { ForestModel } from '@canvas/models/ForestModel';
import { Bvh, Environment, PerspectiveCamera } from '@react-three/drei';
import Head from 'next/head';
import { ReactElement } from 'react';

import { Composer } from '@/components/canvas/composer';
import { Three } from '@/components/helpers/R3f';

export default function Page(): ReactElement {
    return (
        <>
            <Head>
                <title>Echo 3 - Home</title>
                <meta name="description" content="Echo 3 Home" />
            </Head>
            <Three>
                <PerspectiveCamera
                    makeDefault
                    position={[0, 100, 300]}
                    fov={75}
                    rotation-x={-Math.PI / 15}
                />
                <Bvh>
                    <ForestModel />
                    <EthereumModel />
                </Bvh>
                <Environment preset="studio" background={true} blur={1.5} />
                <Composer />
            </Three>
        </>
    );
}
