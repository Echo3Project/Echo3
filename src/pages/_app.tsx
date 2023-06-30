import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { modal } from '@/components/dom/Elements/Modal';
import Menu from '@/components/dom/Menu';
import AudioProvider from '@/components/helpers/context/AudioContext';
import FiltersProvider from '@/components/helpers/context/FiltersContext';
import UserProvider from '@/components/helpers/context/UserContext';

import { FollowProvider } from '../components/helpers/context/FollowContext';
import { Suspense } from 'react';

const Loader = dynamic(() => import('@/components/dom/Loader'), { ssr: false });
const Scene = dynamic(() => import('@canvas/Scene'), { ssr: false });

export default function App({ Component, pageProps }: AppProps): ReactElement {
    const route = useRouter().pathname;
    return (
        <UserProvider>
            <div className="w-full">
                <FollowProvider>
                    <FiltersProvider>
                        <AudioProvider>
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
                            <Scene eventPrefix="client" />
                            <Loader totalProjects={463} />
                        </AudioProvider>
                    </FiltersProvider>
                </FollowProvider>
                <modal.Out />
            </div>
        </UserProvider>
    );
}
