import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';

import Layout from '../../Layout';

export default function Collections(): ReactElement {
    return (
        <Layout row={1} style="plain">
            <Link
                href={'/profil/collections'}
                className="relative w-full h-full flex flex-col justify-center items-center">
                <div className="absolute w-full h-full pointer-events-none blur-sm">
                    <Image
                        src="/backgrounds/followed.jpg"
                        alt="Mes projets suivis"
                        height={100}
                        width={300}
                        className="w-screen object-cover object-center"></Image>
                </div>
                <div className="absolute w-full h-full flex justify-center items-center bg-opacif p-2">
                    <h2 className="text-lg">Projets suivis</h2>
                </div>
            </Link>
        </Layout>
    );
}
