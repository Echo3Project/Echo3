import clsx from 'clsx';
import { useRouter } from 'next/router';
import { ReactElement, useContext, useEffect, useState } from 'react';

import { User } from '@/components/helpers/context/UserContext';
import { DiscordUser } from '@/utils/discord/types';

import {
    BellIcon,
    ConnexionIcon,
    ContribIcon,
    ListIcon,
    MapIcon,
} from '../Elements/Icons';
import Account from './Account';
import Item from './MenuItem';

export default function Menu(): ReactElement {
    const notifications = 0;
    const router = useRouter();
    const [user, setUser] = useState<DiscordUser | null>(null);
    const userContext = useContext(User);

    useEffect(() => {
        if (!userContext) return;
        setUser(userContext);
    }, [userContext]);

    function isActive(route: string): boolean {
        return route === router.asPath ? true : false;
    }

    const navClsx = clsx(
        'backdrop-blur-xl backdrop-brightness-90 bg-darker rounded-lg p-4 flex max-w-sm justify-between items-center text-white h-16',
        user ? 'w-full' : 'gap-6 w-fit',
    );

    return (
        <div className="fixed bottom-0 w-full flex justify-center p-2">
            <nav className={navClsx}>
                <Item route="/liste" title="Liste" active={isActive('/liste')}>
                    <ListIcon color="#ffffff" className="w-8 h-8" />
                </Item>
                {!user && (
                    <Item
                        route="/api/auth"
                        title="Login"
                        active={isActive('/api/auth')}>
                        <span className="mx-4">
                            <ConnexionIcon
                                color="#ffffff"
                                className="w-8 h-8"
                            />
                        </span>
                    </Item>
                )}
                <Item route="/carte" title="Carte" active={isActive('/carte')}>
                    <MapIcon color="#ffffff" className="w-8 h-8" />
                </Item>
                {user && (
                    <>
                        <Account
                            active={isActive('/profil')}
                            avatar={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                        />
                        <Item
                            route="/feed"
                            title="Feed"
                            active={isActive('/feed')}
                            notifications={
                                notifications > 0 ? notifications : undefined
                            }>
                            <BellIcon color="#ffffff" className="w-8 h-8" />
                        </Item>
                        <Item
                            route="/contribution"
                            title="Contrib"
                            active={isActive('/contribution')}>
                            <ContribIcon color="#ffffff" className="w-8 h-8" />
                        </Item>
                    </>
                )}
            </nav>
        </div>
    );
}
