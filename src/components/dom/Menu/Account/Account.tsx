import Image from 'next/image';
import Link from 'next/link';
import { ReactElement, useContext, useEffect, useState } from 'react';

import { User } from '@/components/helpers/context/UserContext';

export default function Account(): ReactElement {
    const user = useContext(User);
    const [avatar, setAvatar] = useState<string>('/icons/user.svg');
    const [direction, setDirection] = useState<string>('/api/auth');

    useEffect(() => {
        if (user) {
            setAvatar(
                `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
            );
            setDirection('/profil');
        }
    }, [user]);

    return (
        <Link
            href={direction}
            className="fixed left-0 ml-4 mt-4 h-12 w-12 bg-black rounded-lg flex justify-center items-center cursor-pointer overflow-hidden">
            <Image
                src={avatar}
                alt="Account icon"
                width={20}
                height={20}
                className="w-5/6 h-5/6 object-cover object-center rounded-md"
            />
        </Link>
    );
}
