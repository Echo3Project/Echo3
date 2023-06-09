import Link from 'next/link';
import { ReactElement } from 'react';

import NotificationSwitch from '../Notifications/Switch';

type Props = {
    project: {
        slug: string;
        name: string;
        image: string;
        notification: boolean;
    };
};

export default function ProjectCard({ project }: Props): ReactElement {
    return (
        <div
            className="w-full h-fit rounded-2xl bg-cover bg-center text-white"
            style={{
                backgroundImage: `linear-gradient(to bottom right, rgba(34,34,34,0.8), rgba(34,34,34,0.05)), url(${project.image})`,
            }}>
            <div className="px-6 pt-4 mb-12 flex justify-between items-center">
                <h4 className="text-3xl font-semibold">{project.name}</h4>
                <NotificationSwitch
                    slug={project.slug}
                    notification={project.notification}
                />
            </div>
            <div className="flex border-t border-gray-400 text-center text-sm divide-x divide-gray-400 cursor-pointer">
                <Link href={'https://google.com/'} className="w-1/2 py-2">
                    Contenus vérifiés
                </Link>
                <Link href={'https://discord.com/'} className="w-1/2 py-2">
                    Contenus organique
                </Link>
            </div>
        </div>
    );
}
