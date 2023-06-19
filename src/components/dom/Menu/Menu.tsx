import clsx from 'clsx';
import { useRouter } from 'next/router';
import {
    ReactElement,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';

import { User } from '@/components/helpers/context/UserContext';
import { debounce } from '@/components/helpers/events/debounce';
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
    const timeout = useRef<NodeJS.Timeout | undefined>();
    const [user, setUser] = useState<DiscordUser | null>(null);
    const [open, setOpen] = useState<boolean>(true);
    const [y, setY] = useState<number>(0);

    const userContext = useContext(User);

    function isActive(route: string): boolean {
        return route === router.asPath ? true : false;
    }

    const handleNavigation = useCallback(
        (e: Event) => {
            function handleClose(): void {
                setOpen(false);
                if (timeout.current) clearTimeout(timeout.current);
                timeout.current = setTimeout(() => {
                    timeout.current = undefined;
                    setOpen(true);
                }, 3000);
            }
            const window = e.currentTarget as Window;
            if (y > window.scrollY) {
                if (timeout.current) clearTimeout(timeout.current);
                debounce(setOpen(true), 1000);
            } else if (y < window.scrollY) {
                if (timeout.current) clearTimeout(timeout.current);
                debounce(handleClose(), 1000);
            }
            setY(window.scrollY);
        },
        [y],
    );

    useEffect(() => {
        if (!userContext) return;
        setUser(userContext);
    }, [userContext]);

    useEffect(() => {
        setY(window.scrollY);
        window.addEventListener('scroll', handleNavigation);
        return () => {
            window.removeEventListener('scroll', handleNavigation);
        };
    }, [handleNavigation]);

    const menuClsx = clsx(
        'fixed bottom-0 w-full flex justify-center p-2 transition-transform duration-500 ease-in-out z-20',
        open ? 'translate-y-0' : 'translate-y-full',
    );

    const navClsx = clsx(
        'backdrop-blur-xl backdrop-brightness-90 bg-darker rounded-lg p-4 flex max-w-sm justify-between items-center text-white h-16',
        user ? 'w-full' : 'gap-6 w-fit',
    );

    return (
        <div className={menuClsx}>
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
