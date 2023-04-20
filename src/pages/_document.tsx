import { Head, Html, Main, NextScript } from 'next/document';
import { ReactElement } from 'react';

export default function Document(): ReactElement {
    return (
        <Html lang="en">
            <Head>
                <meta name="description" content="Echo 3" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
