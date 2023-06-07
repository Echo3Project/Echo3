import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { ContribIcon, FeedIcon, ListIcon, MapIcon } from '../Elements/Icons';
import Account from './Account';
import Item from './Item';

export default function Menu(): ReactElement {
    const notifications = 0;
    const router = useRouter();

    function isActive(route: string): boolean {
        return route === router.asPath ? true : false;
    }

    return (
        <div className="fixed bottom-0 w-full flex justify-center p-8">
            <nav className="backdrop-blur-lg backdrop-brightness-90 bg-lighter rounded-lg p-4 flex w-full max-w-sm justify-between items-center text-white h-16">
                <Item route="/liste" title="Liste" active={isActive('/liste')}>
                    <ListIcon color="#ffffff" />
                </Item>
                <Item route="/carte" title="Carte" active={isActive('/carte')}>
                    <MapIcon color="#ffffff" />
                </Item>
                <Account active={isActive('/profil')} />
                <Item
                    route="/feed"
                    title="Feed"
                    active={isActive('/feed')}
                    notifications={
                        notifications > 0 ? notifications : undefined
                    }>
                    <FeedIcon color="#ffffff" />
                </Item>
                <Item
                    route="/contribution"
                    title="Contrib"
                    active={isActive('/contribution')}>
                    <ContribIcon color="#ffffff" />
                </Item>
            </nav>
        </div>
    );
}
