import { Bvh, Environment, PerspectiveCamera } from '@react-three/drei';
import Head from 'next/head';
import { ReactElement } from 'react';

import { Composer } from '@/components/canvas/Composer';
import { EthereumModel } from '@/components/canvas/Models/EthereumModel';
import { ForestModel } from '@/components/canvas/Models/ForestModel';
import { Three } from '@/components/helpers/R3f';

export default function Page(): ReactElement {
    return (
        <>
            <Head>
                <title>Echo 3 - Home</title>
                <meta name="description" content="Echo 3 Home" />
            </Head>
            <main className="h-screen w-full flex justify-center">
                <h1>ok</h1>
            </main>
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
