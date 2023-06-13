import { useProgress } from '@react-three/drei';
import clsx from 'clsx';
import { ReactElement, useEffect, useRef, useState } from 'react';

import NoSSR from '@/components/helpers/NoSSR';

type Props = {
    totalProjects: number;
    initialState?: (active: boolean) => boolean;
};

const pad = (s: string, t: string): string => s.padStart(t.length, '0');
const dataInterpolation = (p: number, total: number): string =>
    `${pad(((p * total) / 100).toFixed(0), total.toString())}`;

export default function Load({
    totalProjects,
    initialState = (active: boolean): boolean => active,
}: Props): ReactElement {
    const { active, progress, total } = useProgress();
    const [shown, setShown] = useState<boolean>(initialState(total > 0));
    const [progressState, setProgressState] = useState<number>(0);
    const currentProgress = useRef<number>(0);

    function animateProgress(progress: number): void {
        const diff = progress - currentProgress.current;
        const step = diff / 100;
        const interval = setInterval((): void => {
            currentProgress.current += step;
            if (currentProgress.current >= progress) {
                clearInterval(interval);
                currentProgress.current = progress;
            }
            setProgressState(currentProgress.current);
        }, 120);
    }

    useEffect((): void => {
        if (progressState === progress) return;
        animateProgress(progress);
        // setProgressState(progress);
    }, [progress, progressState]);

    useEffect((): (() => void) => {
        let timeout: NodeJS.Timeout;
        if (active !== shown)
            timeout = setTimeout((): void => setShown(active), 2000);
        return (): void => clearTimeout(timeout);
    }, [shown, active]);

    const loaderClsx = clsx(
        'fixed h-screen w-full top-0 p-4 z-50 bg-white flex items-end transition-opacity duration-700 ease-out bg-loader bg-center bg-repeat-space',
        shown ? 'opacity-100' : 'pointer-events-none opacity-0',
    );
    const loadAnimationClsx = clsx(
        'w-1/6 flex flex-wrap',
        active ? 'animate-loading' : 'animate-none',
    );

    return (
        <NoSSR>
            <div className={loaderClsx}>
                <div className="w-full h-20 pt-2 flex justify-between items-end">
                    <p className="text-8xl font-dot">
                        <span className="leading-50 align-bottom">
                            {dataInterpolation(progressState, totalProjects)}
                        </span>
                    </p>
                    <div className="h-full flex flex-col justify-between self-stretch items-end">
                        <span className="block">/ {totalProjects} projets</span>
                        <div className={loadAnimationClsx}>
                            <div className="w-1/2 aspect-square rounded-full bg-black" />
                            <div className="w-1/2 aspect-square rounded-full bg-black" />
                            <div className="w-1/2 aspect-square rounded-full bg-black" />
                            <div className="w-1/2 aspect-square rounded-full bg-black" />
                        </div>
                    </div>
                </div>
            </div>
        </NoSSR>
    );
}
