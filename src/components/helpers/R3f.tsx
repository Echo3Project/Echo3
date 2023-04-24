import { PropsWithChildren, ReactElement } from 'react';
import tunnel from 'tunnel-rat';

type Props = PropsWithChildren;

export const r3f = tunnel();

export function Three({ children }: Props): ReactElement {
    return <r3f.In>{children}</r3f.In>;
}
