import { PropsWithChildren, ReactElement } from 'react';

type Props = PropsWithChildren & {
    color: string;
};

export function SVG({
    color,
    children,
    ...props
}: Props & JSX.IntrinsicElements['svg']): ReactElement {
    return (
        <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: color }}
            className="w-6 h-6"
            {...props}>
            {children}
        </svg>
    );
}
