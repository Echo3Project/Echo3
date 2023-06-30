import moment from 'moment';
import Head from 'next/head';
import Link from 'next/link';
import { Fragment, ReactElement, useEffect, useMemo, useState } from 'react';

import { authorFormat, dataFormat } from '@/utils/types';

import { Footer } from '../../../components/dom/Footer/Footer';

type Props = {
    project: dataFormat;
};

export default function Page({ project }: Props): ReactElement {
    const [switchInterface, setSwitchInterface] = useState(
        (): boolean => false,
    );
    const [switchBackgroundImage, setSwitchBackgroundImage] = useState(
        (): string => 'url(/buttons/switch_whitepaper_button.svg)',
    );
    const [showAll, setShowAll] = useState((): boolean => false);

    const [allFilterIsActive, setAllFilterIsActive] = useState(
        (): boolean => true,
    );
    const [videoFilterIsActive, setVideoFilterIsActive] = useState(
        (): boolean => false,
    );

    const handleAllClick = (): void => {
        if (!allFilterIsActive) {
            setAllFilterIsActive(true);
            setVideoFilterIsActive(false);
        }
    };

    const handleVideoClick = (): void => {
        if (!videoFilterIsActive) {
            setAllFilterIsActive(false);
            setVideoFilterIsActive(true);
        }
    };

    const hallOfFameContributors = useMemo((): authorFormat[] => {
        const authorsData: { [key: string]: authorFormat } = {};

        project.contributions?.forEach((contribution) => {
            const author = contribution.pseudo;
            const date = new Date(contribution.date as Date);
            const avatarPicture = contribution.avatarPicture;
            if (!author) return;
            if (!authorsData[author]) {
                authorsData[author] = {
                    contributions: 0,
                    points: 0,
                    oldestContribution: date,
                    avatarPicture: avatarPicture as string,
                };
            }

            authorsData[author].contributions++;
            authorsData[author].points += 5;

            if (date < authorsData[author].oldestContribution) {
                authorsData[author].oldestContribution = date;
            }
        });

        const authorsAndData = Object.keys(authorsData).map((key) => ({
            pseudo: key,
            ...authorsData[key],
        }));

        authorsAndData.sort(
            (a, b) =>
                b.points - a.points ||
                a.oldestContribution.getDate() - b.oldestContribution.getDate(),
        );

        return authorsAndData.slice(0, 5);
    }, [project.contributions]);

    useEffect(() => {
        moment.locale('fr');
    }, []);

    useEffect(() => {
        const newSwitchBackgroundImage = switchInterface
            ? 'url(/buttons/switch_inverted_whitepaper_button.svg)'
            : 'url(/buttons/switch_whitepaper_button.svg)';
        setSwitchBackgroundImage(newSwitchBackgroundImage);
    }, [switchInterface]);

    const fields = project.fields;
    const tags = project.tags;
    const types = fields && tags ? fields.concat(tags) : null;

    // TODO: Export in helpers
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

    function formatNumberWithK(number: number): number | string {
        if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'K';
        }
        return number;
    }

    if (project === null) {
        return (
            <div className="flex w-full h-full justify-center items-center">
                <h1>Projet non trouvés</h1>
            </div>
        );
    } else {
        return (
            <>
                <Head>
                    <title>Hubble - Whitepaper</title>
                    <meta name="description" content="Hubble - Whitepaper" />
                </Head>
                <div className="w-full flex flex-col justify-center pt-0 pb-0">
                    <div className="relative w-full flex flex-col items-center">
                        <div
                            className="relative w-full flex justify-center items-center"
                            style={{
                                height: '215px',
                            }}>
                            <div
                                className="absolute top-0 w-full h-full justify-center items-center"
                                style={{
                                    zIndex: -1,
                                    backgroundImage: `url(${
                                        project.coverPicture as string
                                    })`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    maskImage:
                                        'url(/backgrounds/whitepaper_mask.svg)',
                                    maskSize: 'cover',
                                    maskRepeat: 'no-repeat',
                                    WebkitMaskImage:
                                        'url(/backgrounds/whitepaper_mask.svg)',
                                    WebkitMaskSize: 'cover',
                                    WebkitMaskRepeat: 'no-repeat',
                                }}
                            />
                            <button className="absolute top-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black-app text-xs text-center uppercase font-jwsans font-bold">
                                <div className="absolute top-0 left-0 w-1 h-1 bg-black-app rounded-full" />
                                <div className="absolute top-0 right-0 w-1 h-1 bg-black-app rounded-full" />
                                <div className="absolute bottom-0 left-0 w-1 h-1 bg-black-app rounded-full" />
                                <div className="absolute bottom-0 right-0 w-1 h-1 bg-black-app rounded-full" />
                                <div className="px-4 py-2">
                                    <Link href={`/projets`}>Fermer</Link>
                                </div>
                            </button>
                        </div>
                        <div
                            className="w-full flex flex-col"
                            style={{
                                width: '335px',
                            }}>
                            <div className="flex flex-col">
                                <h1 className="text-5xl uppercase">
                                    <span className="font-dot">
                                        {project.name?.slice(
                                            0,
                                            Math.ceil(project.name.length / 2),
                                        )}
                                    </span>
                                    <span className="font-jwsans font-light">
                                        {project.name?.slice(
                                            Math.ceil(project.name.length / 2),
                                        )}
                                    </span>
                                </h1>
                                <div className="flex justify-between gap-2 mt-2">
                                    <div className="flex gap-1 font-jwsans font-medium">
                                        <span className="text-gray-500">
                                            Date de création:
                                        </span>
                                        <span className="text-black">
                                            {new Date(
                                                project.date,
                                            ).getFullYear()}
                                        </span>
                                    </div>
                                    <div className="flex gap-1">
                                        <span className="font-jwsans font-medium text-gray-500">
                                            Type:
                                        </span>
                                        {types?.map((item, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <div
                                                        className="flex justify-center items-center "
                                                        style={{
                                                            width: '48px',
                                                            height: '28px',
                                                            backgroundImage: `url(/backgrounds/type.svg)`,
                                                            backgroundSize:
                                                                'cover',
                                                            backgroundRepeat:
                                                                'no-repeat',
                                                        }}>
                                                        <span className="m-2 text-xs text-bold truncate">
                                                            {item}
                                                        </span>
                                                    </div>
                                                </Fragment>
                                            );
                                        })}
                                    </div>
                                </div>
                                <p className="font-jwsans font-medium text-gray-500 mt-5">
                                    {project.description}
                                </p>
                                <div className="flex justify-between items-center mt-5">
                                    <div className="flex gap-4">
                                        <div className="flex gap-1 items-center">
                                            <div
                                                style={{
                                                    backgroundImage:
                                                        'url(/icons/discord.svg)',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat:
                                                        'no-repeat',
                                                    width: '22px',
                                                    height: '18px',
                                                }}
                                            />
                                            <span className="font-jwsans font-medium text-gray-400">
                                                {formatNumberWithK(
                                                    project.discord,
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex gap-1 items-center">
                                            <div
                                                style={{
                                                    backgroundImage:
                                                        'url(/icons/twitter.svg)',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat:
                                                        'no-repeat',
                                                    width: '22px',
                                                    height: '18px',
                                                }}
                                            />
                                            <span className="font-jwsans font-medium text-gray-400">
                                                {formatNumberWithK(
                                                    project.twitter,
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <Link
                                        href={'https://google.com/'}
                                        style={{
                                            backgroundImage:
                                                'url(/buttons/whitepaper_redirection_button.svg)',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            width: '36px',
                                            height: '36px',
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="w-full flex justify-center pt-20">
                                <button
                                    style={{
                                        backgroundImage: switchBackgroundImage,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        width: '335px',
                                        height: '36px',
                                    }}
                                    onClick={(): void =>
                                        setSwitchInterface(!switchInterface)
                                    }>
                                    <div className="flex items-center justify-between text-xs uppercase font-jwsans font-bold">
                                        <span
                                            className={`ml-11 ${
                                                switchInterface
                                                    ? 'text-black/40'
                                                    : ''
                                            }`}>
                                            {`${formatNumberWithK(
                                                project.announcements
                                                    ? project.announcements
                                                          .length
                                                    : 0,
                                            )} Annonces`}
                                        </span>
                                        <span
                                            className={`mr-8 ${
                                                !switchInterface
                                                    ? 'text-black/40'
                                                    : ''
                                            }`}>
                                            {`${formatNumberWithK(
                                                project.contributions
                                                    ? project.contributions
                                                          .length
                                                    : 0,
                                            )} Contributions`}
                                        </span>
                                    </div>
                                </button>
                            </div>

                            {switchInterface === false ? (
                                <div className="w-full flex flex-col items-center gap-4 mt-4 mb-4">
                                    {project.announcements
                                        ?.slice(
                                            0,
                                            showAll
                                                ? project.announcements.length
                                                : 2,
                                        )
                                        .map((item, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <div
                                                        className="w-full flex flex-col text-xs gap-2 p-5"
                                                        style={{
                                                            width: '335px',
                                                            height: '215px',
                                                            backgroundImage:
                                                                'url(/backgrounds/whitepaper_announcements_contributions.svg)',
                                                            backgroundSize:
                                                                'cover',
                                                            backgroundRepeat:
                                                                'no-repeat',
                                                        }}>
                                                        <div className="w-full flex">
                                                            <div className="w-full flex gap-2">
                                                                <div className="w-full flex flex-row items-center gap-2">
                                                                    <div
                                                                        style={{
                                                                            width: '40px',
                                                                            height: '40px',
                                                                            backgroundImage: `url(${
                                                                                project.avatarPicture as string
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
                                                                                <span className="font-jwsans font-bold">
                                                                                    Équipe{' '}
                                                                                    {
                                                                                        project.name
                                                                                    }
                                                                                </span>
                                                                                <span className="font-jwsans font-light">
                                                                                    @
                                                                                    {
                                                                                        item.author
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <div className="flex gap-1">
                                                                                <span className="font-jwsans font-medium">
                                                                                    Vérifié
                                                                                </span>
                                                                                <div className="bg-black w-1 h-1 mt-1 rounded-full mr-2" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span className="font-jwsans font-medium">
                                                            {item.title}
                                                        </span>
                                                        <span className="text-gray-500 font-jwsans font-medium">
                                                            {item.content}
                                                        </span>
                                                    </div>
                                                </Fragment>
                                            );
                                        })}
                                    {project.announcements &&
                                        project.announcements.length > 2 &&
                                        !showAll && (
                                            <button
                                                className="font-jwsans font-bold text-xs uppercase"
                                                style={{
                                                    backgroundImage:
                                                        'url(/buttons/more_whitepaper_button.svg)',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat:
                                                        'no-repeat',
                                                    width: '335px',
                                                    height: '45px',
                                                }}
                                                onClick={(): void =>
                                                    setShowAll(true)
                                                }>
                                                Voir toutes
                                            </button>
                                        )}
                                </div>
                            ) : (
                                <div>
                                    <div className="flex gap-1 mt-6">
                                        <button
                                            className="font-jwsans font-bold text-xs"
                                            style={{
                                                backgroundImage:
                                                    allFilterIsActive
                                                        ? 'url(/buttons/contribution_total_filter_button_active.svg)'
                                                        : 'url(/buttons/contribution_total_filter_button.svg)',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                                width: '68px',
                                                height: '35px',
                                            }}
                                            onClick={(): void =>
                                                handleAllClick()
                                            }>
                                            Tout
                                        </button>
                                        <button
                                            className="font-jwsans font-bold text-xs"
                                            style={{
                                                backgroundImage:
                                                    videoFilterIsActive
                                                        ? 'url(/buttons/contribution_video_filter_button_active.svg)'
                                                        : 'url(/buttons/contribution_video_filter_button.svg)',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                                width: '80px',
                                                height: '36px',
                                            }}
                                            onClick={(): void =>
                                                handleVideoClick()
                                            }>
                                            <span className="ml-4">Video</span>
                                        </button>
                                    </div>

                                    <div className="w-full flex flex-col items-center gap-4 mt-4">
                                        {project.contributions
                                            ?.filter((item) => {
                                                return videoFilterIsActive
                                                    ? item.type === 'Video'
                                                    : true;
                                            })
                                            .sort((a, b) => {
                                                return (
                                                    new Date(
                                                        b.date as Date,
                                                    ).getTime() -
                                                    new Date(
                                                        a.date as Date,
                                                    ).getTime()
                                                );
                                            })
                                            .slice(
                                                0,
                                                showAll
                                                    ? project.contributions
                                                          .length
                                                    : 2,
                                            )
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
                                                                backgroundSize:
                                                                    'cover',
                                                                backgroundRepeat:
                                                                    'no-repeat',
                                                            }}>
                                                            <div className="w-full flex">
                                                                <div className="w-full flex gap-2">
                                                                    <div className="w-full flex flex-row items-center gap-2">
                                                                        <div
                                                                            style={{
                                                                                width: '40px',
                                                                                height: '40px',
                                                                                backgroundImage: `url(${
                                                                                    item.avatarPicture as string
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
                                                                                            item.author
                                                                                        }
                                                                                    </span>
                                                                                    <span className="font-light">
                                                                                        @
                                                                                        {
                                                                                            item.pseudo
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                                <div className="flex gap-1">
                                                                                    <span>
                                                                                        {formatSentenceTimeElapsed(
                                                                                            new Date(
                                                                                                item.date as Date,
                                                                                            ),
                                                                                        )}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {item.type ===
                                                            'Video' ? (
                                                                <div className="rounded-xl overflow-hidden w-full h-fit">
                                                                    {/* {item.content} */}
                                                                    <iframe
                                                                        width="100%"
                                                                        height="100%"
                                                                        src={
                                                                            item.content
                                                                        }
                                                                        frameBorder="0"
                                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                                        allowFullScreen></iframe>
                                                                </div>
                                                            ) : (
                                                                <span className="text-gray-500">
                                                                    {
                                                                        item.content
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    </Fragment>
                                                );
                                            })}
                                        {project.contributions &&
                                            project.contributions.length > 2 &&
                                            !showAll && (
                                                <button
                                                    className="text-xs text-bold uppercase"
                                                    style={{
                                                        backgroundImage:
                                                            'url(/buttons/more_whitepaper_button.svg)',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat:
                                                            'no-repeat',
                                                        width: '335px',
                                                        height: '45px',
                                                    }}
                                                    onClick={(): void =>
                                                        setShowAll(true)
                                                    }>
                                                    Voir toutes
                                                </button>
                                            )}
                                    </div>
                                    <div className="flex flex-col my-8 gap-4">
                                        <h2 className="text-3xl uppercase">
                                            <div>
                                                <span className="font-dot">
                                                    Les meill
                                                </span>
                                                <span className="font-light">
                                                    eurs
                                                </span>
                                            </div>
                                            <div>
                                                <span className="font-dot">
                                                    Contrib
                                                </span>
                                                <span className="font-light">
                                                    uteurs:
                                                </span>
                                            </div>
                                        </h2>
                                        <div className="flex flex-col gap-4">
                                            {Array.from(
                                                { length: 5 },
                                                (_, index) =>
                                                    hallOfFameContributors[
                                                        index
                                                    ] ? (
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
                                                                            fontSize:
                                                                                '78px',
                                                                            top: '60%',
                                                                            left: '70%',
                                                                            transform:
                                                                                'translate(-50%, -50%)',
                                                                        }}>
                                                                        {index ===
                                                                        0
                                                                            ? '❶'
                                                                            : index ===
                                                                              1
                                                                            ? '❷'
                                                                            : index ===
                                                                              2
                                                                            ? '❸'
                                                                            : index ===
                                                                              3
                                                                            ? '❹'
                                                                            : index ===
                                                                              4
                                                                            ? '❺'
                                                                            : null}
                                                                    </span>
                                                                    <div
                                                                        className="z-10"
                                                                        style={{
                                                                            width: '59px',
                                                                            height: '59px',
                                                                            backgroundImage: `url(${hallOfFameContributors[index].avatarPicture})`,
                                                                            backgroundSize:
                                                                                'cover',
                                                                            backgroundRepeat:
                                                                                'no-repeat',
                                                                            borderRadius:
                                                                                '50%',
                                                                        }}
                                                                    />
                                                                </div>

                                                                <div className="w-full flex flex-row justify-between text-black-app text-xs">
                                                                    <div className="flex flex-col">
                                                                        <div className="flex flex-row gap-1  items-center">
                                                                            <span className="font-dot">
                                                                                ⚡
                                                                            </span>
                                                                            <span className="font-bold">{`#${
                                                                                hallOfFameContributors[
                                                                                    index
                                                                                ]
                                                                                    .pseudo as string
                                                                            }`}</span>
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
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <Footer />
                </div>
            </>
        );
    }
}

type ServerProps = {
    props: Props;
};

export function getServerSideProps(context: {
    params: { id: string };
}): ServerProps {
    const fakeData: dataFormat[] =
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('@/pages/api/data/fake.json') as dataFormat[];

    const projectId = context.params.id;
    const project = fakeData.find((item: dataFormat) => item.id === projectId);

    return {
        props: {
            project: project as dataFormat,
        },
    };
}
