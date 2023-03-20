import { useLoader } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Group } from 'three';
import { SVGLoader, SVGResultPaths } from 'three-stdlib';

type CustomSVGResultPaths = SVGResultPaths & {
    userData: {
        style: {
            fillOpacity: number;
        };
    };
};
type Paths = { paths: CustomSVGResultPaths[] };

export function Svg() {
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
        <group position={[-400, -400, 0]} ref={ref}>
            {shapes.map((props) => (
                <mesh key={props.shape.uuid}>
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
    );
}
