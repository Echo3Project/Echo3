import Image from 'next/image';
import { ReactElement } from 'react';

import { DiscordUser } from '@/utils/discord/types';

import ProfileBadgesList from './ProfileBadgesList';
import ProfileBanner from './ProfileBanner';
import ProfileStats from './ProfileStats';

type Props = {
    user: DiscordUser;
};

const data = {
    badges: {
        count: 5,
        list: [
            {
                name: 'Music Badge',
                image: '/badges/music.svg',
            },
            {
                name: 'Phone Badge',
                image: '/badges/phone.svg',
            },
            {
                name: 'Underwear Badge',
                image: '/badges/underwear.svg',
            },
            {
                name: 'Verified Badge',
                image: '/badges/verified.svg',
            },
            {
                name: 'Verified Developer Badge',
                image: '/badges/verified_developer.svg',
            },
        ],
    },
    contributions: 18,
    time: 32,
};

export default function ProfileHeader({ user }: Props): ReactElement {
    return (
        <div className="relative">
            <ProfileBanner
                id={user.id}
                banner={user.banner}
                banner_color={user.banner_color}
            />
            <div className="pt-16 flex flex-col items-center w-full">
                <Image
                    src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                    alt={`${user.username}#${user.discriminator}`}
                    width={200}
                    height={200}
                    className="h-28 w-28 rounded-full object-cover object-center"
                />
                <h1 className="mt-4 text-lg leading-5">{`${user.username}#${user.discriminator}`}</h1>
                <ProfileBadgesList badges={data.badges.list} />
                <ProfileStats
                    badgesCount={data.badges.count}
                    contributionsCount={data.contributions}
                    timeCount={data.time}
                />
            </div>
        </div>
    );
}
