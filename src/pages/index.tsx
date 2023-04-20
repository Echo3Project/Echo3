import { EthereumModel } from '@canvas/models/EthereumModel';
import {
    Environment,
    OrbitControls,
    PerspectiveCamera,
    Preload,
} from '@react-three/drei';
import Head from 'next/head';
import { ReactElement } from 'react';

import { Composer } from '@/components/canvas/composer';

export default function Page(): ReactElement {
    return (
        <>
            <Head>
                <title>Echo 3 - Home</title>
                <meta name="description" content="Echo 3 Home" />
            </Head>
            <main className="h-screen w-full flex justify-center items-center">
                <h1 className="font-bold text-2xl text-white select-none">
                    _Echo3
                </h1>
            </main>
        </>
    );
}

Page.canvas = (): ReactElement => {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 1, 20]} fov={75} />
            <EthereumModel />
            <OrbitControls target={[0, 1, 0]} />
            <Composer />
            <Preload all />
            <Environment preset="studio" background={true} blur={1} />
        </>
    );
};
