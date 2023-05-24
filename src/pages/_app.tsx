import '@/styles/globals.css';

import { Web3ReactProvider } from '@web3-react/core';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';

import { Account } from '@/components/dom/Account';
import Menu from '@/components/dom/Menu';
import FiltersProvider from '@/components/helpers/FiltersContext';
import { useEagerConnect } from '@/hooks';
import { getLibrary } from '@/lib';

const Scene = dynamic(() => import('@canvas/Scene'), { ssr: false });

type Props = AppProps & {
    Component: AppProps['Component'] & {
        canvas: (props: AppProps['pageProps']) => JSX.Element;
    };
};

export default function App({ Component, pageProps }: Props): ReactElement {
    const triedToEagerConnect = useEagerConnect();

    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <div className="absolute h-[100dvh] w-full overflow-hidden">
                <header className="fixed w-full flex justify-between z-50">
                    <Menu />
                    <div className="mr-8 py-4 px-8 bg-black rounded-b-lg text-white hidden">
                        <Account
                            triedToEagerConnect={triedToEagerConnect}></Account>
                    </div>
                </header>
                <FiltersProvider>
                    <div className="absolute top-0 w-full h-screen z-10 pointer-events-none">
                        <Component {...pageProps} />
                        {/* <DragUpPanel></DragUpPanel> */}
                    </div>
                    <Scene eventPrefix="client" />
                </FiltersProvider>
            </div>
        </Web3ReactProvider>
    );
}
