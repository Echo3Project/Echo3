import { PerspectiveCamera } from '@react-three/drei';
import Head from 'next/head';
import { ReactElement, useContext, useState } from 'react';

import dynamic from 'next/dynamic';

import DragUpPanel from '@/components/dom/DragUpPanel';
import MapHeader from '@/components/dom/MapHeader/MapHeader';
import { Filters } from '@/components/helpers/context/FiltersContext';

import { dataFormat } from '@/utils/types';

const MapControls = dynamic(
    () => import('@/components/canvas/controls/MapControls'),
    { ssr: false },
);
const ObjectChunk = dynamic(
    () =>
        import('@/components/canvas/map/ObjectChunk').then(
            (mod) => mod.ObjectChunk,
        ),
    { ssr: false },
);
// const Loader = dynamic(() => import('@/components/dom/Loader'), { ssr: false });
const Three = dynamic(
    () => import('@/components/helpers/R3f').then((mod) => mod.Three),
    {
        ssr: false,
    },
);

const initialRotation = -Math.PI / 2 + (Math.PI / 4) * (1 - 100 / 1000);

export type dataFormat = {
    name?: string;
    author?: string;
    description?: string;
    tags?: string[];
    fields?: string[];
};

type Props = {
    projects: dataFormat[];
};

export default function Page({ projects }: Props): ReactElement {
    const [showFilterInterface, setShowFilterInterface] = useState(() => false);
    const [showNewFilterInterface, setShowNewFilterInterface] = useState(
        () => false,
    );
    const [showSearchInterface, setShowSearchInterface] = useState(() => false);

    const filtersContext = useContext(Filters);

    const toggleShowFilterInterface = (): void => {
        setShowFilterInterface((prev) => !prev);
    };

    const toggleShowNewFilterInterface = (): void => {
        setShowNewFilterInterface((prev) => !prev);
    };

    const toggleShowSearchInterface = (): void => {
        setShowSearchInterface((prev) => !prev);
    };

    const handleCloseInterface = (): void => {
        showSearchInterface && toggleShowSearchInterface(); // Close search interface
        showFilterInterface && toggleShowFilterInterface(); // Close filter interface
        showNewFilterInterface && toggleShowNewFilterInterface(); // Close creation new filter interface
    };

    return (
        <>
            <Head>
                <title>Echo 3 - Map</title>
                <meta name="description" content="Echo 3 Map" />
            </Head>
            <header className="fixed h-screen w-full flex justify-center">
                <MapHeader
                    filtersContext={filtersContext}
                    showFilterInterface={showFilterInterface}
                    showNewFilterInterface={showNewFilterInterface}
                    showSearchInterface={showSearchInterface}
                    toggleShowFilterInterface={toggleShowFilterInterface}
                    toggleShowNewFilterInterface={toggleShowNewFilterInterface}
                    toggleShowSearchInterface={toggleShowSearchInterface}
                    handleCloseInterface={handleCloseInterface}
                />
            </header>
            <main className="h-screen w-full flex justify-center">
                <DragUpPanel
                    filtersContext={filtersContext}
                    showFilterInterface={showFilterInterface}
                    showNewFilterInterface={showNewFilterInterface}
                    showSearchInterface={showSearchInterface}
                    toggleShowFilterInterface={toggleShowFilterInterface}
                    toggleShowNewFilterInterface={toggleShowNewFilterInterface}
                    toggleShowSearchInterface={toggleShowSearchInterface}
                />
            </main>
            <Three>
                <PerspectiveCamera
                    rotation={[initialRotation, 0, 0]}
                    position={[0, 100, 0]}
                    fov={75}
                    near={0.1}
                    far={1000}
                    makeDefault
                />
                <MapControls />
                <color attach="background" args={[243, 243, 243]} />
                <ObjectChunk projects={projects} />
            </Three>
        </>
    );
}

type ServerProps = {
    props: Props;
};

export function getServerSideProps(): ServerProps {
    const fakeData: dataFormat[] =
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('@/pages/api/data/fake.json') as dataFormat[];
    const projects: dataFormat[] = [];
    fakeData.forEach((item: dataFormat): void => {
        const project: dataFormat = {};
        ['name', 'tags', 'fields'].forEach((key: string): void => {
            // eslint-disable-next-line no-prototype-builtins
            item.hasOwnProperty(key) &&
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                (project[key] = item[key as keyof ItemType]);
        });
        projects.push(project);
    });

    return {
        props: {
            projects: projects,
        },
    };
}
