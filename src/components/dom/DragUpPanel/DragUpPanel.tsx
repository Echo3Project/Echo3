import { animated, useSpring } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { ReactElement, useContext, useEffect, useMemo, useRef } from 'react';

import { Filters } from '@/components/helpers/FiltersContext';
import { Clamp } from '@/components/helpers/Maths';

import Header from './Header';
import SearchBar from './SearchBar';

export default function DragUpPanel(): ReactElement {
    const steps = useMemo(
        () => [
            -132,
            -300,
            typeof window !== 'undefined' ? -window.innerHeight : -600,
        ],
        [],
    );
    const filtersContext = useContext(Filters);
    const { active } = filtersContext;
    const [{ y }, api] = useSpring(() => ({
        y: steps[0],
        config: { tension: 230, friction: 20 },
    }));
    const panelHeader = useRef<HTMLDivElement>(null);
    let closest = 0;

    function handleGrab(
        y: number,
        down: boolean,
        direction: number,
        last: boolean,
    ): void {
        if (down || y <= steps[steps.length - 1]) {
            api.start({ y: y });
        } else if (last) {
            closest = Clamp(closest - direction, 0, steps.length - 1);
            api.start({ y: steps[Number(closest)] });
        }
    }

    useEffect(() => {
        if (active.length > 0) {
            if (y.get() <= steps[1]) return;
            api.start({ y: steps[1] });
        } else {
            api.start({ y: steps[0] });
        }
    }, [active, api, y, steps]);

    useGesture(
        {
            onDrag: ({ tap, down, last, offset: [, y], direction: [, dy] }) => {
                if (active.length > 0 && y && !tap) {
                    handleGrab(y, down, dy, last);
                }
            },
        },
        {
            target: panelHeader,
            drag: {
                from: () => [0, y.get()],
                filterTaps: true,
                rubberband: true,
                bounds: {
                    top:
                        typeof window !== 'undefined'
                            ? -window.innerHeight
                            : -600,
                    bottom: -132,
                },
                eventOptions: { passive: false },
            },
        },
    );

    useEffect(() => {
        const handler = (e: Event): void => e.preventDefault();
        document.addEventListener('gesturestart', handler);
        document.addEventListener('gesturechange', handler);
        document.addEventListener('gestureend', handler);
        return () => {
            document.removeEventListener('gesturestart', handler);
            document.removeEventListener('gesturechange', handler);
            document.removeEventListener('gestureend', handler);
        };
    }, []);

    return (
        <animated.div
            className="fixed -bottom-full w-full h-screen max-h-screen pointer-events-auto flex flex-col"
            style={{ y }}>
            <Header filtersContext={filtersContext} ref={panelHeader} />
            <SearchBar />
        </animated.div>
    );
}
