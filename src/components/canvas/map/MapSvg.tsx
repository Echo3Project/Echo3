import { Sphere } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { ReactElement, useMemo, useRef } from 'react';
import { Group } from 'three';
import { SVGLoader, SVGResultPaths } from 'three-stdlib';

import { useZoom } from '@/hooks';

type CustomSVGResultPaths = SVGResultPaths & {
    userData: {
        style: {
            fillOpacity: number;
        };
    };
};
type Paths = { paths: CustomSVGResultPaths[] };

export function Svg(): ReactElement {
    const ref = useRef<Group>(null);
    const { paths }: Paths = useLoader(SVGLoader, '/map.svg');

    const shapes = useMemo(
        () =>
            paths.flatMap((p: CustomSVGResultPaths) =>
                p.toShapes(true).map((shape) => ({
                    shape,
                    color: p.color,
                    fillOpacity: p.userData.style.fillOpacity,
                })),
            ),
        [paths],
    );

    return (
        <group>
            <Sphere args={[100]} visible={useZoom() >= 2}>
                <meshBasicMaterial color="hotpink" />
            </Sphere>
            <group position={[-400, 0, 400]} ref={ref}>
                {shapes.map((props) => (
                    <mesh key={props.shape.uuid} rotation-x={-Math.PI / 2}>
                        <meshBasicMaterial
                            color={props.color}
                            opacity={props.fillOpacity}
                            depthWrite={false}
                            transparent
                        />
                        <shapeGeometry args={[props.shape]} />
                    </mesh>
                ))}
            </group>
        </group>
    );
}
