import { useProgress } from '@react-three/drei';
import clsx from 'clsx';
import { ReactElement, useEffect, useState } from 'react';

import NoSSR from '@/components/helpers/NoSSR';

const defaultDataInterpolation = (p: number): string => `${p.toFixed(0)}%`;

export default function Load({
    dataInterpolation = defaultDataInterpolation,
    initialState = (active: boolean): boolean => active,
}): ReactElement {
    const { active, progress, total } = useProgress();
    const [shown, setShown] = useState<boolean>(initialState(total > 0));
    const [progressState, setProgressState] = useState<number>(0);

    useEffect((): void => {
        if (progressState === progress) return;
        setProgressState(progress);
    }, [progress, progressState]);

    useEffect((): (() => void) => {
        let timeout: NodeJS.Timeout;
        if (active !== shown)
            timeout = setTimeout((): void => setShown(active), 1200);
        return (): void => clearTimeout(timeout);
    }, [shown, active]);

    const loaderClsx = clsx(
        'fixed h-screen w-full top-0 z-50 bg-white flex justify-center items-center transition-opacity duration-700 ease-out',
        shown ? 'opacity-100' : 'pointer-events-none opacity-0',
    );
    const loadAnimationClsx = clsx(
        'w-1/6 flex flex-wrap',
        active ? 'animate-loading' : 'animate-none',
    );

    return (
        <NoSSR>
            <div className={loaderClsx}>
                <div className={loadAnimationClsx}>
                    <div className="w-1/2 aspect-square rounded-full bg-black" />
                    <div className="w-1/2 aspect-square rounded-full bg-black" />
                    <div className="w-1/2 aspect-square rounded-full bg-black" />
                    <div className="w-1/2 aspect-square rounded-full bg-black" />
                </div>
                <div className="absolute mt-36">
                    <span>{dataInterpolation(progressState)}</span>
                </div>
            </div>
        </NoSSR>
    );
}
