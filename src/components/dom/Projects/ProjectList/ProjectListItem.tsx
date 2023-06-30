import Image from 'next/image';
import { ReactElement } from 'react';

import { pad } from '@/components/helpers/formatters';
import { dataFormat } from '@/utils/types';

type Props = {
    project: dataFormat;
};

export default function ProjectListItem({ project }: Props): ReactElement {
    const date = new Date(Date.now());

    const dateFormatter = (date: Date): string => {
        return `${pad(date.getDay().toString(), '10')}.${pad(
            date.getMonth().toString(),
            '10',
        )}`;
    };

    return (
        <div className="max-w-full flex gap-4 mb-4">
            <Image
                src={project.avatarPicture as string}
                alt={`Image ${project.name as string}`}
                width={60}
                height={60}
                className="rounded-full w-16 h-16"></Image>
            <div>
                <div className="flex justify-between">
                    <div className="flex">
                        <span className="font-dot leading-none mt-1.5 mr-1">
                            ✴
                        </span>
                        <h2>{project.name}</h2>
                    </div>
                    <span className="relative before:h-1 before:w-1 before:rounded-full before:bg-black before:absolute before:-left-2 before:top-1/2 before:-translate-y-1/2">
                        {project.tags?.slice(0, 1)}
                    </span>
                </div>
                <div className="flex justify-between text-yellow-400 text-sm -mt-1">
                    <span>Ajouté par @{project.author}</span>
                    <span>{dateFormatter(date)}</span>
                </div>
                <p className="line-clamp-1 w-10/12 mt-1 text-gray-400 text-sm">
                    {project.description}
                </p>
            </div>
        </div>
    );
}
