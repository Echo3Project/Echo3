import { getCookie } from 'cookies-next';

import { DiscordUser } from './types';

function parseJwt(token: string): DiscordUser | null {
    if (!token) {
        return null;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64)) as DiscordUser | null;
}

export function getUser(): DiscordUser | null {
    const cookie = getCookie('discord_token');

    if (!cookie) {
        return null;
    }

    try {
        const user = parseJwt(cookie as string);
        return user;
    } catch (e) {
        return null;
    }
}
