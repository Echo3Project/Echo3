import { ReactElement, useContext } from 'react';

import ProfileCTA from '@/components/dom/Profile/CTA';
import ProfileHeader from '@/components/dom/Profile/Header';
import WidgetsView from '@/components/dom/Profile/WidgetsView';
import { User } from '@/components/helpers/context/UserContext';
import NoSSR from '@/components/helpers/NoSSR';
import { DiscordUser } from '@/utils/discord/types';

export default function Profile(): ReactElement {
    const user = useContext(User);

    return (
        <div className="h-screen overflow-y-auto pointer-events-auto">
            <NoSSR>
                <ProfileHeader user={user as DiscordUser} />
                <ProfileCTA />
                <WidgetsView />
            </NoSSR>
        </div>
    );
}
