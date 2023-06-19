// import { useLoader } from '@react-three/fiber';
// import { memo, useMemo } from 'react';
// import { PointsMaterial, TextureLoader } from 'three';
// import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';

// type Props = {
//     plyPath: string;
//     texturePath: string;
// };

// export const CloudPoints = memo(function CloudPoints({
//     plyPath,
//     texturePath,
// }: Props) {
//     const plyData = useLoader(PLYLoader, plyPath);
//     const texture = useLoader(TextureLoader, texturePath);
//     const geometry = useMemo(() => plyData, [plyData]);

//     // const colors = useMemo(() => {
//     //     const colorsArray: number[] = [];
//     //     console.log('geometry.attributes.color', geometry.attributes.color);
//     //     console.log('geometry.attributes', geometry.attributes);

//     //     const positionAttribute = geometry.attributes
//     //         .position as Float32BufferAttribute;
//     //     const uvAttribute = geometry.attributes.color as Float32BufferAttribute;
//     //     console.log('positionAttribute', positionAttribute);

//     //     if (!positionAttribute || !uvAttribute) {
//     //         return colorsArray;
//     //     }

//     //     console.log('positionAttribute', positionAttribute);

//     //     for (let i = 0; i < positionAttribute.count; i++) {
//     //         const color = new Color();
//     //         const uvX = uvAttribute.getX(i);
//     //         const uvY = uvAttribute.getY(i);
//     //         color.setRGB(uvX, uvY, 0);
//     //         colorsArray.push(color.r, color.g, color.b);
//     //     }

//     //     return colorsArray;
//     // }, [geometry]);

//     // const colorAttribute = useMemo(
//     //     () => new Float32BufferAttribute(colors, 3),
//     //     [colors],
//     // );

//     const material = useMemo(
//         () =>
//             new PointsMaterial({
//                 map: texture,
//                 size: 0.01,
//                 vertexColors: true,
//             }),
//         [texture],
//     );

//     // geometry.setAttribute('color', colorAttribute);

//     return <points geometry={geometry} material={material} />;
// });

import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { memo, useMemo, useRef } from 'react';
import { Intersection, PointsMaterial } from 'three';

import { GLTFResult } from '../models/EthereumModel';

type Props = {
    glbPath: string;
};

export const CloudPoints = memo(function CloudPoints({ glbPath }: Props) {
    const { nodes, gl } = useGLTF(glbPath) as GLTFResult;
    console.log(nodes);

    // const cloudPointsNode = 'Object_2';
    const geometry = useMemo(
        // () => (nodes.Object_2 as THREE.Points).geometry,
        () => (nodes.model as THREE.Points).geometry,
        [nodes],
    );

    const material = useMemo(
        () =>
            new PointsMaterial({
                size: 5,
                vertexColors: true,
                transparent: false,
                depthTest: false,
                depthWrite: false,
            }),
        [],
    );

    const pointsRef = useRef<Points>(null);
    const { raycaster, mouse } = useThree();

    const handleClick = (event: Intersection) => {
        if (pointsRef.current) {
            const index = event.index;
            const id =
                pointsRef.current.geometry.attributes.position.array[index];
            console.log('Clicked on point with ID:', id);
        }
    };

    useFrame(({ camera }) => {
        if (pointsRef.current) {
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects([pointsRef.current]);
            if (intersects.length > 0) {
                handleClick(intersects[0]);
            }
        }
    });

    return (
        <points
            ref={pointsRef}
            // position={[0, 0, 500]}
            // rotation={[200 * (Math.PI / 180), 0, Math.PI / 2]}
            // scale={[100, 100, 100]}
            scale={[100, 100, 100]}
            geometry={geometry}
            material={material}
        />
    );
});
