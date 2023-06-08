import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';

type Props = {
    active: boolean;
    avatar: string;
};

export default function Account({ active, avatar }: Props): ReactElement {
    const accountClsx = `rounded-full overflow-hidden border ${
        active ? 'border-white' : 'border-transparent'
    }`;

    return (
        <Link href={'/profil'} className={accountClsx}>
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
