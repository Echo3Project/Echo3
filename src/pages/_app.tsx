import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ReactElement, Suspense } from 'react';

import { modal } from '@/components/dom/Elements/Modal';
import Menu from '@/components/dom/Menu';
import FiltersProvider from '@/components/helpers/context/FiltersContext';
import UserProvider from '@/components/helpers/context/UserContext';

import { FollowProvider } from '../components/helpers/context/FollowContext';

const Loader = dynamic(() => import('@/components/dom/Loader'), { ssr: false });
const Scene = dynamic(() => import('@canvas/Scene'), { ssr: false });

export default function App({ Component, pageProps }: AppProps): ReactElement {
    const route = useRouter().pathname;
    return (
        <UserProvider>
            <div className="w-full">
                <header className="fixed w-full flex justify-between z-50"></header>
                <FollowProvider>
                    <FiltersProvider>
                        <div className="absolute top-0 w-full z-10">
                            <Menu />
                            <div
                                className={`absolute top-0 flex justify-center w-full ${
                                    route === '/projets'
                                        ? 'pointer-events-none'
                                        : 'pointer-events-auto'
                                }`}>
                                <Component {...pageProps} />
                            </div>
                        </div>
                        <Suspense fallback={null}>
                            <Scene eventPrefix="client" />
                            <Loader totalProjects={125} />
                        </Suspense>
                    </FiltersProvider>
                </FollowProvider>

                <modal.Out />
                {/* <footer className="fixed w-full flex justify-between z-50"></footer> */}
            </div>
        </UserProvider>
    );
}
