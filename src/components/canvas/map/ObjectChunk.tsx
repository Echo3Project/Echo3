import { Merged } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { ElementType, memo, ReactElement, useMemo } from 'react';
import {
    BufferAttribute,
    BufferGeometry,
    Mesh,
    MeshStandardMaterial,
    SphereGeometry,
} from 'three';

import type { dataFormat } from '@/pages/map';

type Props = {
    projects: dataFormat[];
    filters: string[];
};

export const ObjectChunk = memo(function ObjectChunk({
    projects,
    filters,
}: Props): ReactElement {
    const count = projects.length;
    const radius = 3;
    const chunkSize = 100;

    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const x = Math.random() * 1000 - 500;
            const y = Math.random() * 1000 - 500;
            const z = Math.random() * 1000 - 500;
            positions[i3 + 0] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;
        }
        return positions;
    }, [count]);

    const chunks = useMemo(() => {
        const chunks = [];
        const numChunks = Math.ceil(count / chunkSize);
        for (let i = 0; i < numChunks; i++) {
            const start = i * chunkSize;
            const end = Math.min(start + chunkSize, count);
            chunks.push({
                start,
                count: end - start,
            });
        }
        return chunks;
    }, [count, chunkSize]);

    const geometry = useMemo(() => {
        const geometry = new BufferGeometry();
        geometry.setAttribute('position', new BufferAttribute(positions, 3));
        return geometry;
    }, [positions]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        chunks.forEach((chunk) => {
            const { start, count } = chunk;
            const end = start + count;

            const chunkPositions = (
                (geometry.attributes.position as BufferAttribute)
                    .array as number[]
            ).slice(start * 3, end * 3);

            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                const y = chunkPositions[i3 + 1];
                const noise = Math.sin((time + i) * 4) * 0.1;
                chunkPositions[i3 + 1] = y + noise;
            }

            geometry.attributes.position.needsUpdate = true;
        });
    });

    const sphereMesh = useMemo(
        () =>
            new Mesh(
                new SphereGeometry(radius, 16, 16),
                new MeshStandardMaterial({
                    color: 'blue',
                    visible: true,
                    transparent: true,
                }),
            ),
        [radius],
    );
    const meshes = useMemo(() => ({ Sphere: sphereMesh }), [sphereMesh]);

    return (
        <group>
            {chunks.map((chunk, index) => {
                const { start, count } = chunk;

                return (
                    <group key={index}>
                        <Merged castShadow receiveShadow meshes={meshes}>
                            {({
                                Sphere,
                            }: {
                                Sphere: ElementType;
                            }): ReactElement[] =>
                                Array.from({ length: count }, (_, i) => {
                                    return (
                                        <>
                                            {(filters.length === 0 ||
                                                (
                                                    projects[i].tags as string[]
                                                ).some((r) =>
                                                    filters.includes(r),
                                                )) && (
                                                <Sphere
                                                    key={i}
                                                    userData={{
                                                        name: projects[i].name,
                                                        tags: projects[i].tags,
                                                    }}
                                                    position={[
                                                        positions[
                                                            (start + i) * 3 + 0
                                                        ],
                                                        positions[
                                                            (start + i) * 3 + 1
                                                        ],
                                                        positions[
                                                            (start + i) * 3 + 2
                                                        ],
                                                    ]}></Sphere>
                                            )}
                                        </>
                                    );
                                })
                            }
                        </Merged>
                    </group>
                );
            })}
        </group>
    );
});
