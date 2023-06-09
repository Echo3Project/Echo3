import Head from 'next/head';
import { ReactElement, useContext } from 'react';

import ProfileHeader from '@/components/dom/Profile/Header';
import WidgetsView from '@/components/dom/Profile/WidgetsView';
import { User } from '@/components/helpers/context/UserContext';
import NoSSR from '@/components/helpers/NoSSR';
import { DiscordUser } from '@/utils/discord/types';

export default function Page(): ReactElement {
    const user = useContext(User);

    return (
        <>
            <Head>
                <title>Echo 3 - Profil</title>
                <meta name="description" content="Echo 3 Profil" />
            </Head>
            <main className="h-screen bg-neutral-800 text-white scrollable">
                <NoSSR>
                    <ProfileHeader user={user as DiscordUser} />
                    <WidgetsView />
                </NoSSR>
            </main>
        </>
    );
}
