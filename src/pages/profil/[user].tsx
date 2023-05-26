import { ReactElement, useContext } from 'react';

import ProfileHeader from '@/components/dom/Profile/Header';
import { User } from '@/components/helpers/context/UserContext';
import NoSSR from '@/components/helpers/NoSSR';
import { DiscordUser } from '@/utils/discord/types';

export default function UserProfile(): ReactElement {
    const user = useContext(User);

    return (
        <div className="h-screen overflow-y-auto pointer-events-auto">
            <NoSSR>
                <ProfileHeader user={user as DiscordUser} />
            </NoSSR>
        </div>
    );
}
