import dynamic from 'next/dynamic';
import Head from 'next/head';
import { ReactElement, Suspense, useContext, useState } from 'react';

import { Filters } from '@/components/helpers/context/FiltersContext';
import { dataFormat } from '@/utils/types';

const DragUpPanel = dynamic(() => import('@/components/dom/DragUpPanel'), {
    ssr: false,
});
const MapHeader = dynamic(
    () => import('@/components/dom/MapHeader/MapHeader'),
    {
        ssr: false,
    },
);
const ProjectScene = dynamic(
    () => import('@/components/canvas/scenes/ProjectScene'),
    {
        ssr: false,
    },
);
const Three = dynamic(
    () => import('@/components/helpers/R3f').then((mod) => mod.Three),
    {
        ssr: false,
    },
);

type Props = {
    projects: dataFormat[];
};

export default function Page({ projects }: Props): ReactElement {
    const [showFilterInterface, setShowFilterInterface] = useState(
        (): boolean => false,
    );
    const [showNewFilterInterface, setShowNewFilterInterface] = useState(
        (): boolean => false,
    );
    const [showSearchInterface, setShowSearchInterface] = useState(
        (): boolean => false,
    );

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
            <header className="fixed w-full flex justify-center pointer-events-none">
                <Suspense fallback={null}>
                    <MapHeader
                        filtersContext={filtersContext}
                        showFilterInterface={showFilterInterface}
                        showNewFilterInterface={showNewFilterInterface}
                        showSearchInterface={showSearchInterface}
                        toggleShowFilterInterface={toggleShowFilterInterface}
                        toggleShowNewFilterInterface={
                            toggleShowNewFilterInterface
                        }
                        toggleShowSearchInterface={toggleShowSearchInterface}
                        handleCloseInterface={handleCloseInterface}
                    />
                </Suspense>
            </header>
            <main className="h-screen w-full flex justify-center pointer-events-none">
                <Suspense fallback={null}>
                    <DragUpPanel
                        filtersContext={filtersContext}
                        showFilterInterface={showFilterInterface}
                        showNewFilterInterface={showNewFilterInterface}
                        showSearchInterface={showSearchInterface}
                        toggleShowNewFilterInterface={
                            toggleShowNewFilterInterface
                        }
                    />
                </Suspense>
            </main>
            <Three>
                <Suspense fallback={null}>
                    <ProjectScene projects={projects} />
                </Suspense>
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
