import Image from 'next/image';
import Link from 'next/link';
import { ReactElement, useContext, useEffect, useState } from 'react';

import { User } from '@/components/helpers/context/UserContext';

type Props = {
    active: boolean;
};

export default function Account({ active }: Props): ReactElement {
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

    const accountClsx = `rounded-full overflow-hidden border ${
        active ? 'border-white' : 'border-transparent'
    }`;

    return (
        <Link href={direction} className={accountClsx}>
            <Image
                src={avatar}
                alt="Account icon"
                width={68}
                height={68}
                className="h-18 w-18 object-cover object-center"
            />
        </Link>
    );
}
