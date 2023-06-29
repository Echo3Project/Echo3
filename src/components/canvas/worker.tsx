import { Preload } from '@react-three/drei';
import { render } from '@react-three/offscreen';

import { r3f } from '../helpers/R3f';

render(
    <>
        <r3f.Out />
        <Preload all />
    </>,
);
