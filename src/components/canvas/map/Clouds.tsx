import { Cloud } from '@react-three/drei';
import { memo, ReactElement, Suspense, useCallback, useMemo } from 'react';
import { SimplexNoise } from 'three-stdlib';

export const MemoizedClouds = memo(function MemoizedClouds(): ReactElement {
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

    function getRandomFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min + 0.0001;
    }

    const randomPosition = useCallback(
        function randomPosition(): number[] {
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
            console.log(`Generated value: ${z}`);

            return [x, y, z];
        },
        [simplex],
    );

    const randomScale = useCallback(
        function randomScale(): number {
            const noiseRange = getRandomInt(10, 100);
            const scaleNoise = simplex.noise(
                Math.random() * noiseRange,
                Math.random() * noiseRange,
            );
            const scale = mapNoiseToRange(scaleNoise, 50, 80);
            return scale;
        },
        [simplex],
    );

    const randomOpacity = useCallback(function randomOpacity(): number {
        return getRandomFloat(0.2, 0.7);
    }, []);

    const randomSpeed = useCallback(function randomSpeed(): number {
        return getRandomFloat(0.3, 0.45);
    }, []);

    const clouds = useMemo(() => {
        const cloudsNumber = 20;
        return new Array(cloudsNumber)
            .fill(null)
            .map((_, i) => (
                <Cloud
                    key={i}
                    scale={randomScale()}
                    position={randomPosition()}
                    opacity={randomOpacity()}
                    speed={randomSpeed()}
                    segments={100}
                    texture={'/models/textures/cloud.png'}
                />
            ));
    }, [randomOpacity, randomPosition, randomScale, randomSpeed]);

    return (
        <Suspense fallback={null}>
            <group>{clouds}</group>
        </Suspense>
    );
});