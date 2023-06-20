// import ProjectSwimlaneMask from "./ProjectSwimlaneMask";
import Image from 'next/image';
import { ReactElement } from 'react';

import { dataFormat } from '@/utils/types';

type Props = {
    project: dataFormat;
};

export default function ProjectSwimlaneCard({ project }: Props): ReactElement {
    return (
        <div className="relative w-72 h-auto">
            <Image
                src="/masks/mask2.svg"
                alt={`Mask`}
                width={280}
                height={216}
                className="absolute top-0 left-0 w-full"></Image>
            <Image
                src={`https://picsum.photos/seed/${
                    project.name as string
                }/280/216.webp`}
                alt={`Image ${project.name as string}`}
                width={280}
                height={216}
                className="mask-project w-full"></Image>
        </div>
    );
}
