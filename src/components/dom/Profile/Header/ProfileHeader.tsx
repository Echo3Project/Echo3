import Image from 'next/image';
import { ReactElement } from 'react';

import { DiscordUser } from '@/utils/discord/types';

type Props = {
    user: DiscordUser;
    showName?: boolean;
};

export default function ProfileHeader({
    user,
    showName = true,
}: Props): ReactElement {
    return (
        <div className="flex flex-col items-center w-full p-4 pb-2">
            <Image
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                alt={`${user.username}#${user.discriminator}`}
                width={80}
                height={80}
                className="h-20 w-20 rounded-full object-cover object-center"
            />
            {showName && (
                <h1 className="mt-3 mb-6 text-lg leading-5">{`${user.username}#${user.discriminator}`}</h1>
            )}
        </div>
    );
}
