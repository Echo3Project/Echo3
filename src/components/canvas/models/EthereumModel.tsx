import { useGLTF } from '@react-three/drei';
import { ReactElement } from 'react';
import { Mesh, MeshStandardMaterial } from 'three';
import { GLTF } from 'three-stdlib';

export type GLTFResult = GLTF & {
    nodes: {
        Object_2: Mesh;
    };
    materials: {
        ['default']: MeshStandardMaterial;
    };
};

export function EthereumModel(
    props: JSX.IntrinsicElements['group'],
): ReactElement {
    const { nodes, materials } = useGLTF('/models/ethereum.glb') as GLTFResult;
    return (
        <group {...props} dispose={null} scale={0.1} position-y={100}>
            <mesh
                geometry={nodes.Object_2.geometry}
                material={materials['default']}
                rotation={[-Math.PI / 2, 0, 0]}
            />
        </group>
    );
}

useGLTF.preload('/models/ethereum.glb');
