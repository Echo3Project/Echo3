import { useFrame, useThree } from '@react-three/fiber';
import { useGesture } from '@use-gesture/react';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { clamp } from 'three/src/math/MathUtils';

import { useIsTouchDevice, useZoom } from '@/hooks';

const initialRotation = -Math.PI / 2 + (Math.PI / 4) * (1 - 100 / 1000);

export default function MapControls(): null {
    const { camera, events } = useThree();
    const position = useRef<Vector3>(new Vector3(0, 100, 0));
    const rotation = useRef<Vector3>(new Vector3(initialRotation, 0, 0));
    const tempRotation = useRef<Vector3>(new Vector3(initialRotation, 0, 0));
    const isTouchDevice = useIsTouchDevice();
    const strength = isTouchDevice ? 3 : 1;

    const handleMove = (offset: [number, number]): void => {
        position.current.x = clamp(
            position.current.x -
                offset[0] * (position.current.y / 500) * strength,
            -500,
            500,
        );
        position.current.z = clamp(
            position.current.z -
                offset[1] * (position.current.y / 500) * strength,
            -500,
            500,
        );
    };

    const handleZoom = (y: number): void => {
        position.current.y = clamp(position.current.y + y / 10, 100, 1000);
        rotation.current.x =
            -Math.PI / 2 + (Math.PI / 4) * (1 - position.current.y / 1000);
    };

    useZoom();

    useFrame(() => {
        camera.position.lerp(position.current, 0.05);
        tempRotation.current.lerp(rotation.current, 0.05);
        camera.rotation.x = tempRotation.current.x;
    });

    useGesture(
        {
            onPinch: ({ event, velocity: [x, y], delta: [dx] }) => {
                event.preventDefault();
                if (!isTouchDevice) return;
                handleZoom(-Math.sign(dx) * (x + y) * 1000);
            },
            onDrag: ({ pinching, cancel, event, delta }) => {
                event.preventDefault();
                if (pinching) return cancel();
                if (delta) {
                    handleMove(delta);
                }
            },
            onWheel: ({ event, delta: [, y] }) => {
                event.preventDefault();
                if (y) {
                    handleZoom(y);
                }
            },
        },
        {
            target: events.connected as HTMLElement,
            drag: { eventOptions: { passive: false } },
            wheel: { eventOptions: { passive: false } },
            pinch: { eventOptions: { passive: false } },
        },
    );

    useEffect(() => {
        const handler = (e: Event): void => e.preventDefault();
        document.addEventListener('gesturestart', handler);
        document.addEventListener('gesturechange', handler);
        document.addEventListener('gestureend', handler);
        return () => {
            document.removeEventListener('gesturestart', handler);
            document.removeEventListener('gesturechange', handler);
            document.removeEventListener('gestureend', handler);
        };
    }, []);

    return null;
}