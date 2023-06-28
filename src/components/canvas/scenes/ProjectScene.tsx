import { Environment, Sphere, useKTX2 } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import { ReactElement, Suspense, useRef } from 'react';
import { Mesh, RepeatWrapping } from 'three';

import { dataFormat } from '@/utils/types';

import { Composer } from '../composer';

const Hubble = dynamic(
    () => import('@/components/canvas/models/Hubble').then((mod) => mod.Hubble),
    { ssr: false },
);
const MapControls = dynamic(
    () => import('@/components/canvas/controls/MapControls'),
    { ssr: false },
);
const MemoizedSparkles = dynamic(
    () =>
        import('@/components/canvas/map/Sparkles').then(
            (mod) => mod.MemoizedSparkles,
        ),
    { ssr: false },
);
const Projects = dynamic(() => import('@/components/canvas/map/Projects'), {
    ssr: false,
});

type Props = {
    projects: dataFormat[];
};

export default function ProjectScene({ projects }: Props): ReactElement {
    const sphereRef = useRef<Mesh>(null);
    const bloom = useKTX2('/models/textures/bloom.ktx2');
    bloom.wrapS = bloom.wrapT = RepeatWrapping;
    bloom.repeat.set(2, 2);

    useFrame(({ clock }) => {
        if (!sphereRef.current) return;
        sphereRef.current.rotation.y = clock.getElapsedTime() / 5;
    });

    return (
        <Suspense fallback={null}>
            <MapControls />
            <Hubble />
            <Projects projects={projects} />
            <MemoizedSparkles />
            <Environment preset={'forest'} />
            <color args={['transparent']} attach={'background'}></color>
            <Sphere
                args={[4500, 32, 32]}
                position-x={-500}
                position-z={1000}
                ref={sphereRef}>
                <meshStandardMaterial
                    emissiveMap={bloom}
                    emissiveIntensity={20}
                    emissive={0xdddddd}
                    toneMapped={false}
                    transparent
                    attach="material"
                    side={2}
                />
            </Sphere>
            <Composer />
            <fogExp2 attach="fog" args={[0xffffff, 0.0003]} />
            {/* <Plane args={[10000, 10000, 1, 1]} position-y={-1000} rotation-x={-Math.PI/2} material-color={'red'}></Plane> */}
        </Suspense>
    );
}
