import clsx from 'clsx';
import { useRouter } from 'next/router';
import { ReactElement, useContext, useEffect, useState } from 'react';

import { User } from '@/components/helpers/context/UserContext';
import { DiscordUser } from '@/utils/discord/types';

import {
    BellIcon,
    ConnectionIcon,
    ContributionIcon,
    ProjectIcon,
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
        user ? 'w-full' : 'gap-4 w-fit',
    );

    return (
        <div className="w-full flex justify-center">
            <div
                className="fixed bottom-4 w-64 flex justify-center items-center"
                style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: '8px',
                }}>
                <nav className={navClsx}>
                    <Item
                        route="/projets"
                        title="projets"
                        active={isActive('/projets')}>
                        <ProjectIcon color="#ffffff" className="w-8 h-8" />
                    </Item>
                    {!user && (
                        <Item route="/api/auth" active={isActive('/api/auth')}>
                            <span className="scale-125 mx-4">
                                <ConnectionIcon
                                    color="#ffffff"
                                    className="w-10 h-10"
                                />
                            </span>
                        </Item>
                    )}
                    <Item route="/feed" title="Feed" active={isActive('/feed')}>
                        <BellIcon color="#ffffff" className="w-8 h-1000" />
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
                                    notifications > 0
                                        ? notifications
                                        : undefined
                                }>
                                <BellIcon color="#ffffff" className="w-8 h-8" />
                            </Item>
                            <Item
                                route="/contribution"
                                title="Contrib"
                                active={isActive('/contribution')}>
                                <ContributionIcon
                                    color="#ffffff"
                                    className="w-8 h-8"
                                />
                            </Item>
                        </>
                    )}
                </nav>
            </div>
        </div>
    );
}
