import {
    Bloom,
    EffectComposer,
    HueSaturation,
    SMAA,
    Vignette,
} from '@react-three/postprocessing';
import { ReactElement } from 'react';

export function Composer(): ReactElement {
    return (
        <EffectComposer disableNormalPass multisampling={0}>
            {/* <AutoFocusDOF
                bokehScale={5}
                resolution={1024}
                mouseFocus={true}
                focusSpeed={0.03}
                focalLength={0.1}
            />
        */}
            <Vignette offset={0.3} darkness={0.25} eskil={false} />
            <HueSaturation hue={0.1} saturation={0.1} />
            <Bloom mipmapBlur luminanceThreshold={1} />
            <SMAA />
        </EffectComposer>
    );
}
