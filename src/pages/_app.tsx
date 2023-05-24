import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';

import Account from '@/components/dom/Account';
import Menu from '@/components/dom/Menu';
import FiltersProvider from '@/components/helpers/context/FiltersContext';

const Scene = dynamic(() => import('@canvas/Scene'), { ssr: false });

export default function App({ Component, pageProps }: AppProps): ReactElement {
    return (
        <div className="absolute h-[100dvh] w-full overflow-hidden">
            <header className="fixed w-full flex justify-between z-50">
                <Menu />
                <Account />
            </header>
            <FiltersProvider>
                <div className="absolute top-0 w-full h-screen z-10 pointer-events-none">
                    <Component {...pageProps} />
                </div>
                <Scene eventPrefix="client" />
            </FiltersProvider>
        </div>
    );
}
