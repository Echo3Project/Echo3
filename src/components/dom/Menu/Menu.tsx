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

import { useFollow } from '@/components/helpers/context/FollowContext';
import { User } from '@/components/helpers/context/UserContext';
import { DiscordUser } from '@/utils/discord/types';

import {
    ConnectionIcon,
    ContributionIcon,
    FollowIcon,
    ProjectIcon,
    ShareIcon,
} from '../Elements/Icons';
import Account from './Account';
import Item from './MenuItem';

export default function Menu(): ReactElement {
    const notifications = 0;
    const router = useRouter();
    const isWhitepaperPage = router.pathname.includes('whitepaper');
    const timeout = useRef<NodeJS.Timeout | undefined>();
    const [user, setUser] = useState<DiscordUser | null>(null);
    const [open, setOpen] = useState<boolean>(true);
    const [y, setY] = useState<number>(0);

    const userContext = useContext(User);
    const { followedProjects, setFollowedProjects } = useFollow();
    const { id: idProjectsToFollow } = router.query;
    const isFollowed = followedProjects.includes(idProjectsToFollow as string);

    function isActive(route: string): boolean {
        return route === router.asPath ? true : false;
    }

    function debounce(fn: void, delay: number): void {
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            timeout.current = undefined;
            fn;
        }, delay);
    }

    function handleClose(): void {
        setY(window.scrollY);
        setOpen(false);
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            timeout.current = undefined;
            setOpen(true);
        }, 3000);
    }

    function handleOpen(): void {
        setY(window.scrollY);
        setOpen(true);
        if (timeout.current) clearTimeout(timeout.current);
    }

    const handleNavigation = useCallback(() => {
        if (y > window.scrollY) {
            if (timeout.current) clearTimeout(timeout.current);
            if (Math.abs(window.scrollY - y) > 75) debounce(handleOpen(), 1000);
        } else if (y < window.scrollY) {
            if (window.scrollY < 25) return;
            if (timeout.current) clearTimeout(timeout.current);
            if (Math.abs(window.scrollY - y) > 75)
                debounce(handleClose(), 1000);
        }
    }, [y]);

    const handleFollow = (): void => {
        if (!isFollowed) {
            setFollowedProjects((prev) => [
                ...prev,
                idProjectsToFollow as string,
            ]);
        }
    };

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
        'max-w-sm h-16 flex justify-between items-center px-4 bg-black-app/10 backdrop-blur-xl rounded-lg text-black-app ',
        user ? 'w-full' : 'gap-6 w-fit',
    );

    return (
        <div className={menuClsx}>
            <nav className={navClsx}>
                {!isWhitepaperPage ? (
                    <>
                        <Item
                            route="/projets"
                            title="Projets"
                            active={isActive('/projets')}>
                            <ProjectIcon className="w-8 h-8 text-black-app" />
                        </Item>
                        {!user && (
                            <Item
                                route="/api/auth"
                                title="Login"
                                active={isActive('/api/auth')}>
                                <ConnectionIcon className="w-8 h-8 text-black-app" />
                            </Item>
                        )}
                        <Item
                            route="/actus"
                            title="actus"
                            active={isActive('/actus')}>
                            <FollowIcon className="w-8 h-8 text-black-app" />
                        </Item>
                        {user && (
                            <>
                                <Account
                                    active={isActive('/profil')}
                                    avatar={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                                />
                                <Item
                                    route="/actus"
                                    title="Actus"
                                    active={isActive('/actus')}
                                    notifications={
                                        notifications > 0
                                            ? notifications
                                            : undefined
                                    }>
                                    <FollowIcon
                                        color="#ffffff"
                                        className="w-8 h-8"
                                    />
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
                    </>
                ) : (
                    <>
                        <Item
                            route="/projets"
                            title="Partager"
                            active={isActive('/projets')}>
                            <ShareIcon color="#000000" className="w-6 h-6" />
                        </Item>
                        <button onClick={handleFollow} disabled={isFollowed}>
                            <div className="flex flex-col items-center justify-center relative">
                                <div className="relative flex justify-center items-center mb-1 w-14">
                                    <FollowIcon
                                        color="#000000"
                                        className="w-6 h-6"
                                    />
                                </div>
                                <span className="text-xs text-center uppercase">
                                    {isFollowed ? 'Suivi' : 'Suivre'}
                                </span>
                            </div>
                        </button>
                        <Item
                            route="/projets"
                            title="Contrib"
                            active={isActive('/projets')}>
                            <ContributionIcon
                                color="#000000"
                                className="w-6 h-6"
                            />
                        </Item>
                    </>
                )}
            </nav>
        </div>
    );
}
