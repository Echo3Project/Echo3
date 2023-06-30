import Head from 'next/head';
import { ReactElement, useState } from 'react';

import { Modal } from '@/components/dom/Elements';

export default function Page(): ReactElement {
    const [active, setActive] = useState(false);

    return (
        <>
            <Head>
                <title>Hubble - Home</title>
                <meta name="description" content="Hubble - Home" />
            </Head>
            <main className="h-screen w-full">
                <button
                    className="block bg-white text-black border border-black rounded-md mx-auto mt-24 p-2 pointer-events-auto"
                    onClick={(): void => {
                        setActive(true);
                    }}>
                    Open Modal
                </button>
                <Modal active={active}>
                    <div className="p-4 flex flex-col items-center max-w-sm">
                        <span className="text-lg mb-1">
                            Supprimer le filtre
                        </span>
                        <span>(Exemple de modal)</span>
                        <p className="text-sm text-center font-light">
                            Êtes vous sur de vouloir supprimer ce filtre
                            définitivement?
                        </p>
                    </div>
                    <div className="mt-4 flex justify-between gap-2">
                        <button
                            className="py-2 w-1/2 bg-white text-black border border-black rounded-md"
                            onClick={(): void => {
                                setActive(false);
                            }}>
                            Annuler
                        </button>
                        <button
                            className="py-2 w-1/2 bg-black text-white border border-white rounded-md"
                            onClick={(): void => {
                                setActive(false);
                            }}>
                            Confirmer
                        </button>
                    </div>
                </Modal>
            </main>
        </>
    );
}
