import { Merged } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import {
    ElementType,
    Fragment,
    memo,
    ReactElement,
    useContext,
    useMemo,
} from 'react';
import {
    BufferAttribute,
    BufferGeometry,
    Mesh,
    MeshStandardMaterial,
    SphereGeometry,
} from 'three';

import { Filters } from '@/components/helpers/context/FiltersContext';
import type { dataFormat } from '@/pages/projets';

type Props = {
    projects: dataFormat[];
};

export const ObjectChunk = memo(function ObjectChunk({
    projects,
}: Props): ReactElement {
    const { active } = useContext(Filters);
    const count = projects.length;
    const radius = 3;
    const chunkSize = 100;

    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const x = Math.random() * 1000 - 500;
            const z = Math.random() * 1000 - 500;
            positions[i3 + 0] = x;
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
                new MeshStandardMaterial({ color: 'blue' }),
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
                                        <Fragment key={i}>
                                            {(active.length === 0 ||
                                                (
                                                    projects[i].tags as string[]
                                                ).some((r) =>
                                                    active.includes(r),
                                                ) ||
                                                (
                                                    projects[i]
                                                        .fields as string[]
                                                ).some((r) =>
                                                    active.includes(r),
                                                )) && (
                                                <Sphere
                                                    userData={{
                                                        name: projects[i].name,
                                                        tags: projects[i].tags,
                                                        fields: projects[i]
                                                            .fields,
                                                    }}
                                                    position={[
                                                        positions[
                                                            (start + i) * 3 + 0
                                                        ],
                                                        0,
                                                        positions[
                                                            (start + i) * 3 + 2
                                                        ],
                                                    ]}
                                                />
                                            )}
                                        </Fragment>
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
