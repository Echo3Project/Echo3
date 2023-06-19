import { PerspectiveCamera } from '@react-three/drei';
import Head from 'next/head';
import { ReactElement } from 'react';

import MapControls from '@/components/canvas/controls/MapControls';
import { CloudPoints } from '@/components/canvas/map/CloudPoints';
import DragUpPanel from '@/components/dom/DragUpPanel';
import { Three } from '@/components/helpers/R3f';

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
                {/* <color attach="background" args={[0, 0, 0]} /> */}
                {/* <ObjectChunk projects={projects} /> */}
                {/* <CloudPoints
                    plyPath={'/models/flower/flower.ply'}
                    texturePath={'/models/flower/flower.jpg'}
                /> */}
                {/* <CloudPoints glbPath={'/models/peony_point_cloud.glb'} /> */}
                <CloudPoints glbPath={'/models/test7.glb'} />
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
