import moment from 'moment';
import Head from 'next/head';
import { Fragment, ReactElement, useMemo } from 'react';

import { authorFormat, dataFormat } from '@/utils/types';

import Footer from '../components/dom/Footer/Footer';
import { useFollow } from '../components/helpers/context/FollowContext';

type Props = {
    projects: dataFormat[];
};

export default function Page({ projects }: Props): ReactElement {
    const { followedProjects } = useFollow();

    const followedProjectObjects = useMemo(() => {
        return followedProjects.map((projectId) => {
            return projects.find((project) => project.id === projectId);
        });
    }, [followedProjects, projects]);

    const recentContributions = useMemo(() => {
        const currentDate = moment();
        const allContributions = followedProjectObjects.flatMap(
            (project) => project?.contributions,
        );

        const lastMonthContributions = allContributions.filter(
            (contribution) => {
                const contributionDate = moment(contribution?.date);
                return currentDate.diff(contributionDate, 'months') < 1;
            },
        );

        return lastMonthContributions;
    }, [followedProjectObjects]);

    const hallOfFameContributors = useMemo(() => {
        const authorsData: { [key: string]: authorFormat } = {};

        const oneWeekAgo = moment().subtract(1, 'weeks');

        followedProjectObjects.forEach((project) => {
            if (!project) return;
            project.contributions?.forEach((contribution) => {
                const date = moment(contribution.date);

                // Ignore contributions older than one week
                if (date.isBefore(oneWeekAgo)) {
                    return;
                }

                const author = contribution.pseudo;
                const avatarPicture = contribution.avatarPicture;
                if (!author) return;
                if (!authorsData[author]) {
                    authorsData[author] = {
                        contributions: 0,
                        points: 0,
                        oldestContribution: date.toDate(),
                        avatarPicture: avatarPicture as string,
                    };
                }

                authorsData[author].contributions++;
                authorsData[author].points += 5;

                if (date.isBefore(authorsData[author].oldestContribution)) {
                    authorsData[author].oldestContribution = date.toDate();
                }
            });
        });

        const authorsAndData = Object.keys(authorsData).map((key) => ({
            pseudo: key,
            ...authorsData[key],
        }));

        authorsAndData.sort(
            (a, b) =>
                b.points - a.points ||
                moment(a.oldestContribution).diff(moment(b.oldestContribution)),
        );

        return authorsAndData.slice(0, 5);
    }, [followedProjectObjects]);

    function formatSentenceTimeElapsed(date: Date): string {
        const now = moment();
        const diff = moment.duration(now.diff(date));

        if (diff.years() > 0) {
            return `Il y a ${diff.years()} an${diff.years() > 1 ? 's' : ''}`;
        } else if (diff.months() > 0) {
            return `Il y a ${diff.months()} mois`;
        } else if (diff.days() > 0) {
            return `Il y a ${diff.days()} jour${diff.days() > 1 ? 's' : ''}`;
        } else if (diff.hours() > 0) {
            return `Il y a ${diff.hours()} heure${diff.hours() > 1 ? 's' : ''}`;
        } else if (diff.minutes() > 0) {
            return `Il y a ${diff.minutes()} minute${
                diff.minutes() > 1 ? 's' : ''
            }`;
        } else {
            return `Il y a quelques secondes`;
        }
    }
    return followedProjects.length === 0 ? (
        <>
            <Head>
                <title>Hubble - Actus</title>
                <meta name="description" content="Hubble - Actus" />
            </Head>
            <div className="w-screen h-screen flex flex-col gap-4 justify-center items-center">
                {Array.from({ length: 10 }, () => (
                    <>
                        <h1 className="text-3xl uppercase text-black-app">
                            <span className="font-dot">Aucun</span>
                            <span className="font-jwsans font-light">
                                {' Projets'}
                            </span>
                            <span className="font-dot">{' Suivis'}</span>
                        </h1>
                    </>
                ))}
            </div>
        </>
    ) : (
        <>
            <div className="flex justify-center p-6 pt-0 pb-0 w-full">
                <Head>
                    <title>Hubble - Feed</title>
                    <meta name="description" content="Hubble - Feed" />
                </Head>
                <div className="relative w-full flex flex-col items-center">
                    <div
                        className="absolute top-0 w-full h-full justify-center items-center w-screen"
                        style={{
                            zIndex: -1,
                            backgroundImage: `url(/backgrounds/feed.svg)`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            height: '350px',
                        }}
                    />
                    <h1 className="text-3xl uppercase text-black-app mt-16 mb-4">
                        <span className="font-dot">L&apos;actu</span>
                        <span className="font-jwsans font-light">alité </span>
                        <span className="font-dot">d</span>
                        <span className="font-jwsans font-light">e </span>
                        <span className="font-dot">v</span>
                        <span className="font-jwsans font-light">os </span>
                        <span className="font-dot">pr✴</span>
                        <span className="font-jwsans font-light">jets </span>
                        <span className="font-dot">suiv</span>
                        <span className="font-jwsans font-light">is : </span>
                    </h1>
                    {followedProjectObjects.map((project, index) => (
                        <Fragment key={index}>
                            <div className="flex flex-col text-xs gap-2 pr-4 pl-4 w-screen max-w-sm">
                                <div className="w-full flex">
                                    <div className="w-full flex gap-2">
                                        <div className="w-full flex flex-row items-center gap-2">
                                            <div
                                                style={{
                                                    width: '58px',
                                                    height: '58px',
                                                    backgroundImage: `url(${
                                                        project?.avatarPicture as string
                                                    })`,
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat:
                                                        'no-repeat',
                                                    borderRadius: '50%',
                                                }}
                                            />
                                            <div className="flex flex-col flex-grow">
                                                <div className="flex justify-between">
                                                    <div className="flex flex-col">
                                                        <span className="font-jwsans">
                                                            ✴{' '}
                                                            {
                                                                project?.name as string
                                                            }
                                                        </span>
                                                        <span className="text-green-app">
                                                            {
                                                                recentContributions.length
                                                            }{' '}
                                                            nouvelles
                                                            contributions
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <div className="bg-black w-1 h-1 mt-1 rounded-full mr-2" />
                                                        <span className="font-jwsans font-medium">
                                                            BSC
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span className="font-jwsans font-medium">
                                    {project?.title}
                                </span>
                                <span className="text-gray-500 font-jwsans font-medium">
                                    {project?.content}
                                </span>
                            </div>
                        </Fragment>
                    ))}
                    <h1 className="text-3xl uppercase text-black-app mt-8">
                        <span className="font-dot">🔥 contrib</span>
                        <span className="font-jwsans font-light">utions </span>
                        <span className="font-dot">RÉCEN</span>
                        <span className="font-jwsans font-light">TES :</span>
                    </h1>
                    <div className="w-full flex flex-col items-center gap-4 mt-8">
                        {recentContributions
                            .sort((a, b) => {
                                return (
                                    new Date(b?.date as Date).getDate() -
                                    new Date(a?.date as Date).getDate()
                                );
                            })
                            .map((item, index) => {
                                return (
                                    <Fragment key={index}>
                                        <div
                                            className="w-full flex flex-col font-jwsans font-medium text-xs gap-2 p-5"
                                            style={{
                                                width: '335px',
                                                height: '216px',
                                                backgroundImage:
                                                    'url(/backgrounds/whitepaper_announcements_contributions.svg)',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                            }}>
                                            <div className="w-full flex">
                                                <div className="w-full flex gap-2">
                                                    <div className="w-full flex flex-row items-center gap-2">
                                                        <div
                                                            style={{
                                                                width: '40px',
                                                                height: '40px',
                                                                backgroundImage: `url(${
                                                                    item?.avatarPicture as string
                                                                })`,
                                                                backgroundSize:
                                                                    'cover',
                                                                backgroundRepeat:
                                                                    'no-repeat',
                                                                borderRadius:
                                                                    '50%',
                                                            }}
                                                        />
                                                        <div className="flex flex-col flex-grow">
                                                            <div className="flex justify-between">
                                                                <div className="flex flex-col">
                                                                    <span className="font-bold">
                                                                        {
                                                                            item?.author
                                                                        }
                                                                    </span>
                                                                    <span className="font-light">
                                                                        @{' '}
                                                                        {
                                                                            item?.pseudo
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="flex gap-1">
                                                                    <span>
                                                                        {formatSentenceTimeElapsed(
                                                                            new Date(
                                                                                item?.date as Date,
                                                                            ),
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {item?.type === 'Video' ? (
                                                <div>
                                                    <iframe
                                                        width="300"
                                                        height="125"
                                                        src={item.content}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                        allowFullScreen></iframe>
                                                </div>
                                            ) : (
                                                <span className="text-gray-500">
                                                    {item?.content}
                                                </span>
                                            )}
                                        </div>
                                    </Fragment>
                                );
                            })}
                    </div>
                    <h1 className="text-3xl uppercase text-black-app mt-8">
                        <span className="font-dot">contrib</span>
                        <span className="font-jwsans font-light">uteur</span>
                        <span className="font-dot">⚡ d</span>
                        <span className="font-jwsans font-light">e l</span>
                        <span className="font-dot">a </span>
                        <span className="font-jwsans font-light">sem</span>
                        <span className="font-dot">aine :</span>
                    </h1>
                    <div className="flex flex-col gap-4 mt-4 mb-4">
                        {Array.from({ length: 5 }, (_, index) =>
                            hallOfFameContributors[index] ? (
                                <Fragment key={index}>
                                    <div className="flex flex-row items-center">
                                        <div
                                            className="relative flex mr-2"
                                            style={{
                                                width: '150px',
                                            }}>
                                            <span
                                                className="absolute z-0 font-dot text-black-app"
                                                style={{
                                                    opacity: 0.15,
                                                    fontSize: '78px',
                                                    top: '60%',
                                                    left: '70%',
                                                    transform:
                                                        'translate(-50%, -50%)',
                                                }}>
                                                {index === 0
                                                    ? '❶'
                                                    : index === 1
                                                    ? '❷'
                                                    : index === 2
                                                    ? '❸'
                                                    : index === 3
                                                    ? '❹'
                                                    : index === 4
                                                    ? '❺'
                                                    : null}
                                            </span>
                                            <div
                                                className="z-10"
                                                style={{
                                                    width: '59px',
                                                    height: '59px',
                                                    backgroundImage: `url(${hallOfFameContributors[index].avatarPicture})`,
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat:
                                                        'no-repeat',
                                                    borderRadius: '50%',
                                                }}
                                            />
                                        </div>

                                        <div className="w-full flex flex-row justify-between text-black-app text-xs">
                                            <div className="flex flex-col">
                                                <div className="flex flex-row gap-1  items-center">
                                                    <span className="font-dot">
                                                        ⚡
                                                    </span>
                                                    <span className="font-bold">{`#${hallOfFameContributors[index].pseudo}`}</span>
                                                </div>
                                                <span className="text-green-app">
                                                    {`${hallOfFameContributors[index].contributions} contributions`}
                                                </span>
                                            </div>
                                            <span className="text-black-app font-bold uppercase">
                                                {`+${hallOfFameContributors[index].points}pts`}
                                            </span>
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                <div
                                    className="text-black-app"
                                    key={index}></div>
                            ),
                        )}
                    </div>
                    <Footer />
                </div>
            </div>
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
        const project: dataFormat = new Object() as dataFormat;
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
