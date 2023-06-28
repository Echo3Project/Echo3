/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.4 -t hubble.gltf
*/

import { useGLTF, useKTX2 } from '@react-three/drei';
import React, { ReactElement } from 'react';
import { Mesh } from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
    nodes: {
        Anneaux003: Mesh;
        Anneaux004: Mesh;
        Anneaux005: Mesh;
        Anneaux02: Mesh;
        Grand_anneaux: Mesh;
        Cylinder: Mesh;
        trèfles: Mesh;
        Sol: Mesh;
        arbre001: Mesh;
    };
};

export function Hubble(props: JSX.IntrinsicElements['group']): ReactElement {
    const { nodes } = useGLTF('/models/hubble.glb') as GLTFResult;
    const [arbres, matcap, sol, sol_alpha, trefles, trefles_alpha] = useKTX2([
        '/models/textures/arbres.ktx2',
        '/models/textures/matcap.ktx2',
        '/models/textures/sol.ktx2',
        '/models/textures/sol_alpha.ktx2',
        '/models/textures/trefles.ktx2',
        '/models/textures/trefles_alpha.ktx2',
    ]);

    return (
        <group
            {...props}
            dispose={null}
            scale={100}
            position={[-800, -185, 1024]}>
            <group position={[0, 12.178, 0]}>
                <mesh
                    geometry={nodes.Anneaux003.geometry}
                    position={[-0.073, 0.003, 1.383]}
                    rotation={[2.443, 0, -Math.PI]}
                    scale={[-5.168, -0.05, -5.168]}>
                    <meshMatcapMaterial matcap={matcap} />
                </mesh>
                <mesh
                    geometry={nodes.Anneaux004.geometry}
                    position={[-0.073, -1.162, 2.835]}
                    rotation={[2.804, 0, -Math.PI]}
                    scale={[-3.634, -0.035, -3.634]}>
                    <meshMatcapMaterial matcap={matcap} />
                </mesh>
                <mesh
                    geometry={nodes.Anneaux005.geometry}
                    position={[-0.073, 0.022, 4.234]}
                    rotation={[2.443, 0, -Math.PI]}
                    scale={[-1.837, -0.018, -1.837]}>
                    <meshMatcapMaterial matcap={matcap} />
                </mesh>
                <mesh
                    geometry={nodes.Anneaux02.geometry}
                    position={[-0.073, -1.236, 1.48]}
                    rotation={[-2.831, 0, -Math.PI]}
                    scale={[-6.009, -0.058, -6.009]}>
                    <meshMatcapMaterial matcap={matcap} />
                </mesh>
                <mesh
                    geometry={nodes.Grand_anneaux.geometry}
                    position={[0.009, 0.126, 0.798]}
                    rotation={[-2.915, 0, -Math.PI]}
                    scale={[-6.273, -2.025, -6.222]}>
                    <meshMatcapMaterial matcap={matcap} />
                    <mesh
                        geometry={nodes.Cylinder.geometry}
                        position={[-0.994, -0.01, 0.064]}
                        rotation={[0.289, -0.196, -1.616]}
                        scale={[0.233, 0.003, 0.088]}>
                        <meshMatcapMaterial matcap={matcap} />
                    </mesh>
                </mesh>
            </group>
            <mesh
                geometry={nodes.trèfles.geometry}
                position={[0.561, 1.222, -1.115]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={[37.415, 25.752, 32.205]}
                renderOrder={500}>
                <meshStandardMaterial
                    attach="material"
                    map={trefles}
                    alphaMap={trefles_alpha}
                    transparent
                />
            </mesh>
            <mesh
                geometry={nodes.Sol.geometry}
                position={[0, 0.4, 0]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={[72.96, 35, 62.801]}>
                <meshStandardMaterial
                    attach="material"
                    map={sol}
                    alphaMap={sol_alpha}
                    transparent
                />
            </mesh>
            <mesh
                geometry={nodes.arbre001.geometry}
                position={[15.516, 0.848, 35.336]}
                rotation={[-Math.PI / 2, 0, -1.909]}
                scale={3.138}
                // material={materials['Material.001']}
            >
                <meshStandardMaterial attach="material" map={arbres} />
            </mesh>
        </group>
    );
}

useGLTF.preload('/models/hubble.glb');