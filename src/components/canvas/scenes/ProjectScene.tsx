import { Environment, Sphere } from '@react-three/drei';
import { useControls } from 'leva';
import dynamic from 'next/dynamic';
import { ReactElement, Suspense } from 'react';
import { Shader } from 'three';

import { dataFormat } from '@/utils/types';

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
    const { color } = useControls({
        color: '#00ff00',
    });

    function Obc(shader: Shader): void {
        shader.fragmentShader = `
        ${shader.fragmentShader}
      `.replace(
            `vec4 diffuseColor = vec4( diffuse, opacity );`,
            `
        vec3 col = mix(diffuse, diffuse + vec3(0.75), smoothstep(0.5, 0.7, vUv.y));
        vec4 diffuseColor = vec4( col, opacity );
        `,
        );
    }

    return (
        <Suspense fallback={null}>
            <MapControls />
            <Hubble />
            <Projects projects={projects} />
            <MemoizedSparkles />
            <Environment preset={'forest'} />
            <Sphere args={[5000, 32, 32]} position-x={-500} position-z={200}>
                <meshStandardMaterial
                    attach="material"
                    color={color}
                    side={2}
                    onBeforeCompile={(shader): void => Obc(shader)}
                    defines={{ USE_UV: '' }}
                />
            </Sphere>
            <fogExp2 attach="fog" args={[0xffffff, 0.0003]} />
            {/* <Plane args={[10000, 10000, 1, 1]} position-y={-1000} rotation-x={-Math.PI/2} material-color={'red'}></Plane> */}
        </Suspense>
    );
}
