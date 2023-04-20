// 1 - wrap <Component {...pageProps} /> with <Scroll /> in _app.jsx
// 2 - add <ScrollTicker /> wherever in the canvas
// 3 - enjoy
import { addEffect, useFrame } from '@react-three/fiber';
import Lenis from '@studio-freight/lenis';
import { ReactElement, ReactNode, useEffect, useRef } from 'react';
import { MathUtils } from 'three';

type Props = {
    children: ReactNode;
};
type StateType = {
    scroll: number;
    progress: number;
};

const state = {
    top: 0,
    progress: 0,
};
const { damp } = MathUtils;

export default function Scroll({ children }: Props): ReactElement {
    const content = useRef<HTMLDivElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const lenis = new Lenis({
            wrapper: wrapper.current as HTMLDivElement,
            content: content.current as HTMLDivElement,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        lenis.on('scroll', ({ scroll, progress }: StateType): void => {
            state.top = scroll;
            state.progress = progress;
        });
        const effectSub = addEffect((time) => lenis.raf(time));
        return () => {
            effectSub();
            lenis.destroy();
        };
    }, []);

    return (
        <div
            ref={wrapper}
            style={{
                position: 'absolute',
                overflow: 'hidden',
                width: '100%',
                height: '100%',
                top: 0,
            }}>
            <div
                ref={content}
                style={{
                    position: 'relative',
                    minHeight: '200vh',
                }}>
                {children}
            </div>
        </div>
    );
}

export const ScrollTicker = ({ smooth = 9999999 }): null => {
    useFrame(({ viewport, camera }, delta) => {
        camera.position.y = damp(
            camera.position.y,
            -state.progress * viewport.height,
            smooth,
            delta,
        );
    });

    return null;
};
