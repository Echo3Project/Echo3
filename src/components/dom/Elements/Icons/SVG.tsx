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
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: color }}
            className="w-6 h-6"
            {...props}>
            <mask
                id="mask"
                style={{ maskType: 'alpha' }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24">
                <rect width="24" height="24" fill="currentColor" />
            </mask>
            <g mask="url(#mask)">{children}</g>
        </svg>
    );
}
