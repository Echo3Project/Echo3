export const debounce = (func: void, timingWaited: number): (() => void) => {
    let timer: NodeJS.Timeout | null;
    return function (...args: []): void {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            (func as unknown as () => void).apply(window, args);
        }, timingWaited);
    };
};
