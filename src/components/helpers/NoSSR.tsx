import dynamic from 'next/dynamic';
import { PropsWithChildren, ReactElement } from 'react';

type Props = PropsWithChildren;

function NoSSR({ children }: Props): ReactElement {
    return <>{children}</>;
}

export default dynamic(() => Promise.resolve(NoSSR), {
    ssr: false,
});
