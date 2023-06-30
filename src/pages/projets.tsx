import { animated, useSpring } from '@react-spring/web';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { ReactElement, Suspense, useContext, useState } from 'react';

import { Filters } from '@/components/helpers/context/FiltersContext';
import { dataFormat } from '@/utils/types';

import { Footer } from '../components/dom/Footer/Footer';

const ProjectList = dynamic(
    () => import('@/components/dom/Projects').then((mod) => mod.ProjectList),
    {
        ssr: true,
    },
);
const ProjectSwimlane = dynamic(
    () =>
        import('@/components/dom/Projects').then((mod) => mod.ProjectSwimlane),
    {
        ssr: true,
    },
);

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
    const [view, setView] = useState<'map' | 'list'>('map');
    const [showFilterInterface, setShowFilterInterface] = useState(
        (): boolean => false,
    );
    const [showNewFilterInterface, setShowNewFilterInterface] = useState(
        (): boolean => false,
    );
    const [showSearchInterface, setShowSearchInterface] = useState(
        (): boolean => false,
    );
    const [showProjectPanel, setShowProjectPanel] = useState(
        (): boolean => false,
    );
    const [clickedProjectData, setClickedProjectData] =
        useState<dataFormat | null>(null);

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

    const toggleShowProjectPanel = (): void => {
        setShowProjectPanel((prev) => !prev);
    };

    const handleCloseInterface = (): void => {
        showSearchInterface && toggleShowSearchInterface(); // Close search interface
        showFilterInterface && toggleShowFilterInterface(); // Close filter interface
        showNewFilterInterface && toggleShowNewFilterInterface(); // Close creation new filter interface
    };

    const animation = useSpring({
        scaleX: showProjectPanel ? 1 : 0,
        // boxShadow: `0 0 ${showProjectPanel ? '100px' : '0px'} ${
        //     showProjectPanel ? '30px' : '0px'
        // } rgba(255, 255, 255, ${showProjectPanel ? '0.4' : '0'})`,
        // height: '120px',
        config: { tension: 1000, friction: 60 },
    });

    return (
        <>
            <header className="fixed w-full flex justify-center pointer-events-none z-50">
                <Suspense fallback={null}>
                    <MapHeader
                        viewState={{ view, setView }}
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
            {view === 'map' && (
                <>
                    <Head>
                        <title>Hubble - Map</title>
                        <meta name="description" content="Hubble - Map" />
                    </Head>
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
                            {showProjectPanel && (
                                <div
                                    className="w-full h-screen flex justify-center items-center pointer-events-auto"
                                    onClick={(): void =>
                                        setShowProjectPanel(false)
                                    }>
                                    <animated.div
                                        className="flex w-[287px] justify-center items-center bg-black-app/10 backdrop-blur-xl rounded-lg px-8 py-4 relative"
                                        style={animation}>
                                        <div className="flex flex-col justify-center items-center font-jwsans text-black-app">
                                            <div
                                                className="absolute top-0 w-full h-full justify-center items-center rounded-lg"
                                                style={{
                                                    zIndex: -1,
                                                    backgroundImage: `url(${
                                                        clickedProjectData?.coverPicture as string
                                                    })`,
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat:
                                                        'no-repeat',
                                                    maskImage:
                                                        'url(/backgrounds/whitepaper_mask.svg)',
                                                    maskSize: 'cover',
                                                    maskRepeat: 'no-repeat',
                                                    WebkitMaskImage:
                                                        'url(/backgrounds/whitepaper_mask.svg)',
                                                    WebkitMaskSize: 'cover',
                                                    WebkitMaskRepeat:
                                                        'no-repeat',
                                                    opacity: 0.2,
                                                }}
                                            />
                                            <span className="text-xs">
                                                {`Date de création: ${new Date(
                                                    clickedProjectData?.date as Date,
                                                ).getFullYear()}`}
                                            </span>
                                            <div className="text-4xl uppercase mb-2">
                                                <span className="font-dot">
                                                    {clickedProjectData?.name?.slice(
                                                        0,
                                                        Math.ceil(
                                                            clickedProjectData
                                                                .name.length /
                                                                2,
                                                        ),
                                                    )}
                                                </span>
                                                <span className="font-jwsans">
                                                    {clickedProjectData?.name?.slice(
                                                        Math.ceil(
                                                            clickedProjectData
                                                                .name.length /
                                                                2,
                                                        ),
                                                    )}
                                                </span>
                                            </div>
                                            <Link
                                                href={`/projets/${
                                                    clickedProjectData?.id as string
                                                }/whitepaper`}
                                                className="text-xs font-bold uppercase">
                                                Découvrir
                                            </Link>
                                        </div>
                                    </animated.div>
                                </div>
                            )}
                        </Suspense>
                    </main>
                    <Three>
                        <Suspense fallback={null}>
                            <ProjectScene
                                projects={projects}
                                toggleShowProjectPanel={toggleShowProjectPanel}
                                setClickedProjectData={setClickedProjectData}
                            />
                        </Suspense>
                    </Three>
                </>
            )}
            {view === 'list' && (
                <>
                    <Head>
                        <title>Hubble - Liste</title>
                        <meta
                            name="description"
                            content="Hubble - Whitepaper"
                        />
                    </Head>
                    <main className="overflow-x-hidden pt-32 pointer-events-auto bg-white">
                        <div className="w-full">
                            <h1 className="w-fit text-3xl uppercase w-3/4 px-4 mb-12 font-jwsans text-black-app">
                                <span className="font-dot">No</span>s{' '}
                                <span className="font-dot">
                                    {projects.length} pr✴j
                                </span>
                                ets <span className="font-dot">référ</span>
                                encés:
                            </h1>
                            <ProjectSwimlane projects={projects.slice(0, 10)} />
                            <ProjectList projects={projects.slice(11, 70)} />
                        </div>
                        <Footer />
                    </main>
                </>
            )}
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
        [
            'id',
            'name',
            'author',
            'date',
            'discord',
            'twitter',
            'avatarPicture',
            'coverPicture',
            'description',
            'announcements',
            'contributions',
            'tags',
            'fields',
        ].forEach((key: string): void => {
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
