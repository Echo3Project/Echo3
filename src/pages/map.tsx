import { PerspectiveCamera } from '@react-three/drei';
import Head from 'next/head';
import { ReactElement } from 'react';
import { Vector2 } from 'three';

import MapControls from '@/components/canvas/controls/MapControls';
import { Svg } from '@/components/canvas/map/MapSvg';
import { Three } from '@/components/helpers/R3f';

export default function Page(): ReactElement {
    const startingCoords = new Vector2(0, 0);
    const startingDistance = 500;
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
                <MapControls
                    startingCoords={startingCoords}
                    startingDistance={startingDistance}>
                    <PerspectiveCamera
                        rotation-x={-Math.PI / 2}
                        position-y={0}
                        fov={75}
                        near={0.1}
                        far={1000}
                        makeDefault
                    />
                </MapControls>
                <color attach="background" args={[243, 243, 243]} />
                <Svg />
            </Three>
        </>
    );
}
