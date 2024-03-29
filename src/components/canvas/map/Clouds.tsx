import { Cloud } from '@react-three/drei';
import { memo, ReactElement, Suspense, useCallback, useMemo } from 'react';
import { SubtractiveBlending, Vector3 } from 'three';
import { SimplexNoise } from 'three-stdlib';

export const Memoizedclouds = memo(function MemoizedClouds(): ReactElement {
    const simplex = useMemo(() => new SimplexNoise(), []);

    function mapNoiseToRange(
        noise: number,
        min: number,
        max: number,
        targetToProtect?: number,
        squareProtection?: number,
    ): number {
        const normalizedNoise = noise * 0.5 + 0.5;
        let rangeValue = normalizedNoise * (max - min) + min;

        if (targetToProtect !== undefined && squareProtection !== undefined) {
            const minRange1 = min;
            const maxRange1 = targetToProtect - squareProtection;
            const minRange2 = targetToProtect + squareProtection;
            const maxRange2 = max;

            const rangeSelect = Math.random();
            if (rangeSelect < 0.5) {
                rangeValue =
                    normalizedNoise * (maxRange1 - minRange1) + minRange1;
            } else {
                rangeValue =
                    normalizedNoise * (maxRange2 - minRange2) + minRange2;
            }
        }

        return rangeValue;
    }

    function getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const randomPosition = useCallback(
        function randomPosition(): Vector3 {
            const noiseRange = getRandomInt(10, 100);
            const generationPlageX = {
                min: -3000,
                max: 3000,
            };
            const generationPlageZ = {
                min: 100,
                max: 1500,
            };
            const squareProtection = {
                x: 900,
                z: 10,
            };
            const hubblePosition = {
                x: -1000,
                z: 900,
            };

            const xNoise = simplex.noise(
                Math.random() * noiseRange,
                Math.random() * noiseRange,
            );
            const yNoise = simplex.noise(
                Math.random() * noiseRange,
                Math.random() * noiseRange,
            );
            const zNoise = simplex.noise(
                Math.random() * noiseRange * 10,
                Math.random() * noiseRange * 10,
            );

            const x = mapNoiseToRange(
                xNoise,
                generationPlageX.min,
                generationPlageX.max,
                hubblePosition.x,
                squareProtection.x,
            );
            const y = mapNoiseToRange(yNoise, 1700, 1800);
            const z = mapNoiseToRange(
                zNoise,
                generationPlageZ.min,
                generationPlageZ.max,
                hubblePosition.z,
                squareProtection.z,
            );

            return new Vector3(x, y, z);
        },
        [simplex],
    );

    const clouds = useMemo(() => {
        const cloudsNumber = 7;
        return new Array(cloudsNumber).fill(null).map((_, i) => (
            <group scale={[200, 30, 200]} position={randomPosition()} key={i}>
                <Cloud
                    scale={1}
                    opacity={window.innerWidth > 900 ? 0.8 : 0.25}
                    speed={0.4}
                    segments={5}
                    color={window.innerWidth > 900 ? '#ffffff' : '#333333'}
                    emissive={'#ffffff'}
                    emissiveIntensity={window.innerWidth > 900 ? 0.2 : 1}
                    texture={'/models/textures/cloud.png'}
                    blendingMode={SubtractiveBlending}
                />
            </group>
        ));
    }, [randomPosition]);

    return (
        <Suspense fallback={null}>
            <group>{clouds}</group>
        </Suspense>
    );
});
