import { View as ViewImpl } from '@react-three/drei';
import {
    forwardRef,
    MutableRefObject,
    PropsWithChildren,
    ReactElement,
    Suspense,
    useImperativeHandle,
    useRef,
} from 'react';

import { Three } from '@/components/helpers/R3f';

type Props = PropsWithChildren & JSX.IntrinsicElements['div'];

export const View = forwardRef(function View(
    { children, ...props }: Props,
    ref,
): ReactElement {
    const localRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => localRef.current);

    return (
        <>
            <div ref={localRef} {...props} />
            <Three>
                <ViewImpl track={localRef as MutableRefObject<HTMLElement>}>
                    <Suspense>{children}</Suspense>
                </ViewImpl>
            </Three>
        </>
    );
});
