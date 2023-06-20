import dynamic from 'next/dynamic';
import Head from 'next/head';
import { ReactElement, Suspense } from 'react';

import DragUpPanel from '@/components/dom/DragUpPanel';
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

type Props = {
    projects: dataFormat[];
};

export default function Page({ projects }: Props): ReactElement {
    return (
        <>
            <Head>
                <title>Echo 3 - Map</title>
                <meta name="description" content="Echo 3 Map" />
            </Head>
            <main className="h-screen w-full flex justify-center">
                <DragUpPanel></DragUpPanel>
            </main>
            <Three>
                <Suspense fallback={null}>
                    <MapControls />
                    <ObjectChunk projects={projects} />
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
