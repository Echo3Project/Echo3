import { Head, Html, Main, NextScript } from 'next/document';
import { ReactElement } from 'react';

export default function Document(): ReactElement {
    return (
        <Html lang="en">
            <Head>
                <meta name="description" content="Hubble" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
