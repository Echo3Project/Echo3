import { MapControls, OrthographicCamera } from '@react-three/drei';
import Head from 'next/head';

import { Svg } from '@/components/canvas/map/Svg';

export default function Page() {
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
        </>
    );
}

Page.canvas = () => {
    return (
        <>
            <OrthographicCamera
                position={[0, 0, 50]}
                zoom={5}
                up={[0, 0, 1]}
                far={10000}
                makeDefault
            />
            <color attach="background" args={[243, 243, 243]} />
            <Svg />
            <MapControls
                enableRotate={false}
                minDistance={500}
                maxDistance={5000}
                enableDamping
                dampingFactor={0.03}
            />
        </>
    );
};
