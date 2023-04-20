import { useCallback, useEffect, useState } from 'react';

type msNavigator = Navigator & {
    msMaxTouchPoints: number;
};

export function useIsTouchDevice(): boolean {
    const check = useCallback(
        (): boolean =>
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            (navigator as msNavigator).msMaxTouchPoints > 0,
        [],
    );

    const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

    const onResize = useCallback(() => {
        setIsTouchDevice(check());
    }, [check]);

    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize, { passive: true });

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, [onResize]);

    return isTouchDevice;
}
