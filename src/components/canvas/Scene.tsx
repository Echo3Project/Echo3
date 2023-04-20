import { Canvas } from '@react-three/fiber';
import {
    MutableRefObject,
    PropsWithChildren,
    ReactElement,
    Suspense,
} from 'react';

type Props = PropsWithChildren & {
    eventSource: MutableRefObject<HTMLDivElement>;
    eventPrefix: 'offset' | 'client' | 'page' | 'layer' | 'screen' | undefined;
};

export default function Scene({
    children,
    eventSource,
    eventPrefix,
}: Props): ReactElement {
    return (
        <div
            className={
                'pointer-events-none absolute top-0 w-full h-screen -z-10'
            }>
            <Canvas eventSource={eventSource} eventPrefix={eventPrefix} shadows>
                <directionalLight intensity={0.75} />
                <ambientLight intensity={0.75} />
                <Suspense>{children}</Suspense>
            </Canvas>
        </div>
    );
}
