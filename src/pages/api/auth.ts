import axios from 'axios';
import { serialize } from 'cookie';
import dayjs from 'dayjs';
import { sign } from 'jsonwebtoken';
import type { NextApiHandler } from 'next';
import urlcat from 'urlcat';

import { DiscordUser } from '@/utils/discord/types';

const CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || '';
// const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || '';
// const JWT_SECRET = process.env.JWT_SECRET || '';
// const CLIENT_ID = '1110930236738121919';
const CLIENT_SECRET = 'mxvCH6cBIUYHYBEzNe5yCnEZEG12wMxV';
const JWT_SECRET = 'TestJWTSecret';

const REDIRECT_URI = `${
    process.env.NEXT_PUBLIC_APP_URI || 'http://localhost:3000/'
}/api/auth`;
const scope = ['identify'].join(' ');

const OAUTH_URL = urlcat('https://discord.com/api/oauth2/authorize', {
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope,
});

async function exchangeCode(code: string): Promise<{
    user: DiscordUser;
    auth: { access_token: string; token_type: string };
}> {
    const body = new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
        code,
        scope,
    }).toString();

    const { data: auth } = await axios.post<{
        access_token: string;
        token_type: string;
    }>('https://discord.com/api/oauth2/token', body, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const { data: user }: { data: DiscordUser } = await axios.get(
        'https://discord.com/api/users/@me',
        { headers: { Authorization: `Bearer ${auth.access_token}` } },
    );

    return { user, auth };
}

function getCookieHeader(token: string): string {
    return serialize('discord_token', token, {
        // httpOnly: true,
        httpOnly: false,
        path: '/',
        // secure: process.env.NODE_ENV !== 'development',
        secure: false,
        expires: dayjs().add(1, 'day').toDate(),
        sameSite: 'lax',
    });
}

const handler: NextApiHandler = async (req, res) => {
    const { code = null } = req.query as { code?: string };

    if (typeof code !== 'string') {
        res.redirect(OAUTH_URL);
        return;
    }

    const { user } = await exchangeCode(code);
    const token = sign(user, JWT_SECRET, { expiresIn: '24h' });
    const cookie = getCookieHeader(token);
    res.setHeader('Set-Cookie', cookie);
    res.redirect('/');
};

export default handler;
