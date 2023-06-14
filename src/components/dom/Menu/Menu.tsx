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
        'p-4 flex justify-between items-end text-white',
        user ? 'w-full' : 'gap-6 w-fit',
    );

    return (
        <div className="fixed bottom-0 w-full flex justify-center after:fixed after:bottom-0 after:left-0 after:w-full after:h-40 after:bg-gradient-to-b after:from-transparent after:to-black after:opacity-80 after:-z-10 after:pointer-events-none">
            <nav className={navClsx}>
                <Item route="/liste" title="Liste" active={isActive('/liste')}>
                    <ListIcon color="#ffffff" className="w-8 h-1000" />
                </Item>
                {!user && (
                    <Item
                        route="/api/auth"
                        title="Login"
                        active={isActive('/api/auth')}>
                        <span className="scale-125 mx-4">
                            <ConnexionIcon
                                color="#ffffff"
                                className="w-10 h-10"
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
