import { Bvh, Environment, PerspectiveCamera } from '@react-three/drei';
import Head from 'next/head';
import { ReactElement } from 'react';

import { Composer } from '@/components/canvas/Composer';
import { EthereumModel } from '@/components/canvas/Models/EthereumModel';
import { ForestModel } from '@/components/canvas/Models/ForestModel';
import { Modal } from '@/components/dom/Elements';
import { Three } from '@/components/helpers/R3f';

export default function Page(): ReactElement {
    return (
        <>
            <Head>
                <title>Echo 3 - Home</title>
                <meta name="description" content="Echo 3 Home" />
            </Head>
            <main className="h-screen w-full flex justify-center">
                <Modal>
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
                        <button className="py-2 w-1/2 bg-white text-black border border-black rounded-md">
                            Annuler
                        </button>
                        <button className="py-2 w-1/2 bg-black text-white border border-white rounded-md">
                            Confirmer
                        </button>
                    </div>
                </Modal>
            </main>
            <Three>
                <PerspectiveCamera
                    makeDefault
                    position={[0, 100, 300]}
                    fov={75}
                    rotation-x={-Math.PI / 15}
                />
                <Bvh>
                    <ForestModel />
                    <EthereumModel />
                </Bvh>
                <Environment preset="studio" background={true} blur={1.5} />
                <Composer />
            </Three>
        </>
    );
}
