import Head from 'next/head';
import { ReactElement, useContext } from 'react';

import FiltersList from '@/components/dom/Elements/Filter';
import FollowedCount from '@/components/dom/Profile/FollowedCount';
import ProfileHeader from '@/components/dom/Profile/Header';
import ProjectList from '@/components/dom/Profile/ProjectList';
import { User } from '@/components/helpers/context/UserContext';
import NoSSR from '@/components/helpers/NoSSR';
import { DiscordUser } from '@/utils/discord/types';

const projects = [
    {
        slug: 'project-1',
        name: 'Project 1',
        image: 'https://picsum.photos/seed/1/600.webp',
        notification: false,
    },
    {
        slug: 'project-2',
        name: 'Project 2',
        image: 'https://picsum.photos/seed/2/600.webp',
        notification: true,
    },
    {
        slug: 'project-3',
        name: 'Project 3',
        image: 'https://picsum.photos/seed/3/600.webp',
        notification: false,
    },
    {
        slug: 'project-4',
        name: 'Project 4',
        image: 'https://picsum.photos/seed/4/600.webp',
        notification: false,
    },
    {
        slug: 'project-5',
        name: 'Project 5',
        image: 'https://picsum.photos/seed/5/600.webp',
        notification: false,
    },
];

export default function Page(): ReactElement {
    const user = useContext(User);

    return (
        <>
            <Head>
                <title>Echo 3 - Suivis</title>
                <meta name="description" content="Echo 3 Projets Suivis" />
            </Head>
            <main className="h-screen bg-neutral-800 text-white scrollable">
                <NoSSR>
                    <ProfileHeader
                        user={user as DiscordUser}
                        showName={false}
                    />
                    <FollowedCount count={projects.length - 1} />
                    <FiltersList />
                    <ProjectList projects={projects} />
                </NoSSR>
            </main>
        </>
    );
}
