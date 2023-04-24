import { useFrame } from '@react-three/fiber';
import { startTransition, useState } from 'react';

const steps = [0, 400, 800];

export function useZoom(): number {
    const [zoom, setZoom] = useState<number>(steps.length);

    useFrame(({ camera }) => {
        startTransition(() => {
            const index = steps.reduce((acc, curr) => {
                if (curr < camera.position.y) {
                    return curr;
                }
                return acc;
            }, 0);

            if (zoom !== steps.length - steps.indexOf(index)) {
                setZoom(steps.length - steps.indexOf(index));
            }
        });
    });

    return zoom;
}
