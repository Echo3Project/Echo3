import { ShaderMaterial } from 'three';

const VignetteShader = new ShaderMaterial({
    uniforms: {
        tDiffuse: { value: null },
        offset: { value: 0.15 },
        darkness: { value: 0.5 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }`,
    fragmentShader: `
      uniform float offset;
      uniform float darkness;
      uniform sampler2D tDiffuse;
      varying vec2 vUv;
      void main() {
        vec4 color = texture2D( tDiffuse, vUv );
        float dist = distance( vUv, vec2( 0.5 ) );
        color.rgb *= smoothstep( 0.8, offset * 0.799, dist *( darkness + offset ) );
        gl_FragColor = color;
      }`,
});

export default VignetteShader;
