import { Effects } from '@react-three/drei';
import { extend, Object3DNode, useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

import VignetteShader from './Shaders/VignetteShader';

declare module '@react-three/fiber' {
    /* eslint-disable-next-line @typescript-eslint/consistent-type-definitions */
    interface ThreeElements {
        bokehPass: Object3DNode<BokehPass, typeof BokehPass>;
    }
}

extend({ BokehPass, ShaderPass });

export function Composer() {
    const { scene, camera } = useThree();
    const params = useMemo(
        () => ({ focus: 20, aperture: 0.0002, maxblur: 0.005 }),
        [],
    );

    return (
        <Effects
            multisamping={8}
            renderIndex={1}
            disableGamma={false}
            disableRenderPass={false}
            disableRender={false}>
            <shaderPass args={[VignetteShader]} />
            <bokehPass args={[scene, camera, params]} />
        </Effects>
    );
}
