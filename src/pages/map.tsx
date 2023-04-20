import { PerspectiveCamera } from '@react-three/drei';
import Head from 'next/head';
import { ReactElement } from 'react';

import MapControls from '@/components/canvas/controls/MapControls';
import ObjectChunk from '@/components/canvas/map/ObjectChunk';
import { Three } from '@/components/helpers/R3f';

const initialRotation = -Math.PI / 2 + (Math.PI / 4) * (1 - 100 / 1000);

export default function Page(): ReactElement {
    return (
        <>
            <Head>
                <title>Echo 3 - Map</title>
                <meta name="description" content="Echo 3 Map" />
            </Head>
            <main className="h-screen w-full flex justify-center items-center">
                <h1 className="font-bold text-2xl text-white select-none">
                    _Map
                </h1>
            </main>
            <Three>
                <PerspectiveCamera
                    rotation={[initialRotation, 0, 0]}
                    position={[0, 100, 0]}
                    fov={75}
                    near={0.1}
                    far={1000}
                    makeDefault
                />
                <MapControls />
                <color attach="background" args={[243, 243, 243]} />
                <ObjectChunk />
            </Three>
        </>
    );
}
