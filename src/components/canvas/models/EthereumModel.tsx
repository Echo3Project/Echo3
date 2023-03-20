import { useGLTF } from '@react-three/drei';
import { Mesh, MeshStandardMaterial } from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
    nodes: {
        Object_2: Mesh;
    };
    materials: {
        ['default']: MeshStandardMaterial;
    };
};

export function EthereumModel(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/models/ethereum.glb') as GLTFResult;
    return (
        <group {...props} dispose={null} scale={[0.02, 0.02, 0.02]}>
            <mesh
                geometry={nodes.Object_2.geometry}
                material={materials['default']}
                rotation={[-Math.PI / 2, 0, 0]}
            />
        </group>
    );
}

useGLTF.preload('/models/ethereum.glb');
