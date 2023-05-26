import { ReactElement } from 'react';

type Props = {
    id: string;
    banner: string;
    banner_color: string;
};

export default function ProfileBanner({
    id,
    banner,
    banner_color,
}: Props): ReactElement {
    return (
        <div
            className="w-full absolute top-0 -z-10 h-32 bg-red-500 rounded-b-2xl object-cover object-center"
            style={{
                backgroundColor: banner_color ? banner_color : '#000000',
                backgroundImage: banner
                    ? `url('https://cdn.discordapp.com/banners/${id}/${banner}?size=512'`
                    : 'none',
            }}></div>
    );
}
