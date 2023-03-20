import '@/styles/globals.css';

import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "@/lib";
import { useEagerConnect } from "@/hooks";
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { MutableRefObject, useRef } from 'react';
import { Account } from '@/components/dom/Account';

const Scene = dynamic(() => import('@canvas/Scene'), { ssr: false });

type Props = AppProps & {
    Component: AppProps['Component'] & {
        canvas: (props: AppProps['pageProps']) => JSX.Element;
    };
};

export default function App({ Component, pageProps }: Props) {
    const eventsOriginElement = useRef<HTMLDivElement>(
        null,
    ) as MutableRefObject<HTMLDivElement>;
    const triedToEagerConnect = useEagerConnect();

    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <div
                ref={eventsOriginElement}
                className="absolute h-screen w-full overflow-hidden">
                <header className="flex justify-between">
                    <div className="ml-8 py-4 px-8 bg-black inline-block rounded-b-lg text-white">
                        <Link href="/" className="mr-4">
                            Home
                        </Link>
                        <Link href="/map">Map</Link>
                    </div>
                    <div className="mr-8 py-4 px-8 bg-black rounded-b-lg text-white">
                        <Account triedToEagerConnect={triedToEagerConnect}></Account>
                    </div>
                </header>
                <Component {...pageProps} />
                {Component?.canvas && (
                    <Scene eventSource={eventsOriginElement} eventPrefix="client">
                        {Component.canvas(pageProps)}
                    </Scene>
                )}
            </div>
        </Web3ReactProvider>
    );
}
