import Link from 'next/link';
import { ReactElement } from 'react';

import AccountMask from './AccountMask';

type Props = {
    active: boolean;
    avatar: string;
};

export default function Account({ avatar }: Props): ReactElement {
    return (
        <Link href={'/profil'} className="overflow-hidden h-16 w-16">
            <AccountMask link={avatar} />
        </Link>
    );
}
