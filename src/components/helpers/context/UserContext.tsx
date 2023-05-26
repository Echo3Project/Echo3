import { createContext, PropsWithChildren, ReactElement } from 'react';

import { getUser } from '@/utils/discord/getUser';
import { DiscordUser } from '@/utils/discord/types';

type Props = PropsWithChildren;

export const User = createContext<DiscordUser | null>(null);

export default function UserProvider({ children }: Props): ReactElement {
    const user = getUser();

    return (
        <User.Provider value={user as DiscordUser}>{children}</User.Provider>
    );
}
