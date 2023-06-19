import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { memo, useEffect, useMemo, useRef } from 'react';
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
        // () => (nodes.model as THREE.Points).geometry,
        () => (nodes.Object_2 as THREE.Points).geometry,
        [nodes],
    );

    const material = useMemo(() => {
        return new ShaderMaterial({
            uniforms: {
                pointTexture: {
                    value: new TextureLoader().load('/models/circle.png'),
                },
                pointSize: { value: 5.0 },
                alphaTest: { value: 0.5 },
                time: { value: 0.0 },
            },
            vertexShader: `
                #define PI 3.14159265359

                uniform float pointSize;
                uniform float time;

                varying vec3 vColor;

                float rand(vec2 n) {
                    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
                }

                float noise(vec2 n) {
                    const vec2 d = vec2(0.0, 1.0);
                  vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
                    return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
                }

                void main() {
                    vColor = color.rgb;
                    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

                    // utilisez le bruit pour obtenir une valeur unique pour chaque point
                    vec2 posTime = vec2(position.x + time, position.y + time); // modifiez cette ligne pour créer un vec2 unique
                    float noiseValue = noise(posTime);

                    // utilisez une fonction sinusoïdale pour faire varier la taille du point
                    float size = pointSize * (1.0 + sin(noiseValue * 2.0 * PI));

                    gl_PointSize = size * 300.0 / -mvPosition.z;
                    gl_Position = projectionMatrix * mvPosition;
                }

            `,
            fragmentShader: `
                uniform sampler2D pointTexture;
                uniform float alphaTest;

                varying vec3 vColor;

                void main() {
                    vec4 textureColor = texture2D( pointTexture, gl_PointCoord );
                    gl_FragColor = vec4( vColor, textureColor.a );
                    if( gl_FragColor.a < alphaTest ) discard;
                }
            `,
            blending: NormalBlending,
            transparent: true,
            vertexColors: true,
        });
    }, []);

    const pointsRef = useRef<Points>(null);
    const { raycaster, mouse, clock } = useThree();

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
        if (material) {
            material.uniforms.time.value = clock.getElapsedTime();
        }
    });

    useEffect(() => {
        return (): void => {
            material.dispose();
        };
    }, [material]);

    return (
        <points
            ref={pointsRef}
            position={[0, 0, 500]}
            rotation={[200 * (Math.PI / 180), 0, Math.PI / 2]}
            scale={[100, 100, 100]}
            geometry={geometry}
            material={material}
        />
    );
});
