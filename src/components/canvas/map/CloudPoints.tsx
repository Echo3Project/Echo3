import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { memo, useMemo, useRef } from 'react';
import {
    Intersection,
    NormalBlending,
    ShaderMaterial,
    TextureLoader,
} from 'three';

import { GLTFResult } from '../models/EthereumModel';

type Props = {
    glbPath: string;
};

export const CloudPoints = memo(function CloudPoints({ glbPath }: Props) {
    const { nodes } = useGLTF(glbPath) as GLTFResult;
    console.log(nodes);

    const geometry = useMemo(
        () => (nodes.model as THREE.Points).geometry,
        [nodes],
    );

    const material = useMemo(() => {
        return new ShaderMaterial({
            uniforms: {
                pointTexture: {
                    value: new TextureLoader().load('/models/circle.png'),
                },
                pointSize: { value: 10.0 },
                alphaTest: { value: 0.5 },
            },
            vertexShader: `
                uniform float pointSize;

                varying vec3 vColor;

                void main() {
                    vColor = color.rgb;
                    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                    gl_PointSize = pointSize * 300.0 / -mvPosition.z;
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform sampler2D pointTexture;
                uniform float alphaTest;

                varying vec3 vColor;

                void main() {
                    vec4 textureColor = texture2D( pointTexture, gl_PointCoord );
                    gl_FragColor = vec4( vColor, 1.0 ) * textureColor;
                    if( gl_FragColor.a < alphaTest ) discard;
                }
            `,
            blending: NormalBlending,
            transparent: true,
            vertexColors: true,
        });
    }, []);

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
            scale={[100, 100, 100]}
            geometry={geometry}
            material={material}
        />
    );
});
