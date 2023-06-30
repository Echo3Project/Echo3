// import ProjectSwimlaneMask from "./ProjectSwimlaneMask";
import Image from 'next/image';
import { ReactElement } from 'react';

import { dataFormat } from '@/utils/types';

type Props = {
    project: dataFormat;
};

export default function ProjectSwimlaneCard({ project }: Props): ReactElement {
    return (
        <div className="relative" style={{ width: '280px', height: '216px' }}>
            <Image
                src="/masks/mask2.svg"
                alt={`Mask`}
                width={280}
                height={216}
                className="absolute top-0 left-0 w-full"></Image>
            <Image
                src={project.avatarPicture}
                alt={`Image ${project.name as string}`}
                width={280}
                height={216}
                className="mask-project-contain w-full"></Image>
        </div>
    );
}
