import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';

import { modal } from '@/components/dom/Elements/Modal';
import Loader from '@/components/dom/Loader';
import Menu from '@/components/dom/Menu';
import Account from '@/components/dom/Menu/Account';
import FiltersProvider from '@/components/helpers/context/FiltersContext';
import UserProvider from '@/components/helpers/context/UserContext';

const Scene = dynamic(() => import('@canvas/Scene'), { ssr: false });

export default function App({ Component, pageProps }: AppProps): ReactElement {
    return (
        <UserProvider>
            <div className="absolute h-screen w-full overflow-hidden">
                <header className="fixed w-full flex justify-between z-50">
                    <Menu />
                    <Account />
                </header>
                <FiltersProvider>
                    <div className="absolute top-0 w-full h-screen z-10 pointer-events-none">
                        <Component {...pageProps} />
                    </div>
                    <Scene eventPrefix="client" />
                    <Loader />
                </FiltersProvider>
                <modal.Out />
            </div>
        </UserProvider>
    );
}
