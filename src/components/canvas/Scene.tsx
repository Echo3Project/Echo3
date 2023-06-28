import { Preload } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
// import { Perf } from 'r3f-perf';
import { ReactElement } from 'react';

import { r3f } from '@/components/helpers/R3f';
// import { Composer } from './composer';

type Props = {
    // eventSource: MutableRefObject<HTMLDivElement>;
    eventPrefix: 'offset' | 'client' | 'page' | 'layer' | 'screen' | undefined;
};

export default function Scene({
    // eventSource,
    eventPrefix,
}: Props): ReactElement {
    return (
        <div className={'absolute top-0 w-full h-screen'}>
            <Canvas
                eventPrefix={eventPrefix}
                className="touch-none"
                raycaster={{
                    params: { Points: { threshold: 7 } },
                    far: 1500,
                }}
                camera={{
                    fov: 75,
                    near: 10,
                    far: 15000,
                }}
                gl={{
                    powerPreference: 'high-performance',
                    alpha: true,
                    antialias: true,
                    stencil: false,
                    depth: true,
                    autoClear: true,
                }}
                shadows>
                {/* <Perf position="top-left" /> */}
                <r3f.Out />
                <Preload all />
                {/* <Composer /> */}
            </Canvas>
        </div>
    );
}
