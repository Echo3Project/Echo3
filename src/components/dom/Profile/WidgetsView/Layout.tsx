import { clsx } from 'clsx';
import { PropsWithChildren, ReactElement } from 'react';

import { Clamp } from '@/components/helpers/maths';

type Props = PropsWithChildren & {
    col?: number;
    row?: number;
    direction?: 'row' | 'column';
    style?: 'default' | 'plain' | 'empty';
};

export default function Layout({
    children,
    col = 2,
    row = 1,
    direction = 'row',
    style = 'default',
}: Props): ReactElement {
    const defaultStyle = 'flex gap-2';
    const plainStyle = 'bg-gray-300';
    const emptyStyle = 'border border border-gray-300 border-dashed';

    const colSize = (col: number): string => {
        if (Clamp(col, 1, 2) === 1) {
            return 'w-1/2';
        } else {
            return 'w-full';
        }
    };
    const rowSize = (row: number): string => {
        if (Clamp(row, 1, 2) === 1) {
            return 'h-28';
        } else {
            return 'h-56';
        }
    };

    const classNames = clsx(
        'rounded-xl overflow-hidden',
        colSize(col),
        rowSize(row),
        direction === 'row' ? 'flex flex-row' : 'flex flex-col',
        style === 'plain' && plainStyle,
        style === 'empty' && emptyStyle,
        style === 'default' && defaultStyle,
    );

    return <div className={classNames}>{children}</div>;
}
