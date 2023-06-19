import { Preload } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ReactElement, Suspense } from 'react';

import { r3f } from '@/components/helpers/R3f';

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
                className="touch-none"
                eventPrefix={eventPrefix}
                gl={{
                    powerPreference: 'high-performance',
                    alpha: true,
                    antialias: false,
                    stencil: false,
                    depth: true,
                    autoClear: true,
                }}
                shadows>
                {/* <Perf position="top-right" /> */}
                <directionalLight intensity={0.75} />
                <ambientLight intensity={0.75} />
                <Suspense fallback={null}>
                    <r3f.Out />
                </Suspense>
                <Preload all />
            </Canvas>
        </div>
    );
}
