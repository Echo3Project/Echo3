export type DiscordUser = {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    locale: string;
    mfa_enabled: boolean;
    premium_type: number;
    banner_color: string;
    accent_color: string;
    banner: string;
};
