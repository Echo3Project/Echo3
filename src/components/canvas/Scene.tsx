import { Preload } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { MutableRefObject, ReactElement } from 'react';

import { r3f } from '@/components/helpers/R3f';

type Props = {
    eventSource: MutableRefObject<HTMLDivElement>;
    eventPrefix: 'offset' | 'client' | 'page' | 'layer' | 'screen' | undefined;
};

export default function Scene({
    eventSource,
    eventPrefix,
}: Props): ReactElement {
    return (
        <div
            className={
                'pointer-events-none absolute top-0 w-full h-screen -z-10'
            }>
            <Canvas eventSource={eventSource} eventPrefix={eventPrefix} shadows>
                <Perf position="bottom-right" />
                <directionalLight intensity={0.75} />
                <ambientLight intensity={0.75} />
                <r3f.Out />
                <Preload all />
            </Canvas>
        </div>
    );
}
