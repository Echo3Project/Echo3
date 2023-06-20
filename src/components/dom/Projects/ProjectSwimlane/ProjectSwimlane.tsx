import { ReactElement } from 'react';

import { dataFormat } from '@/utils/types';

import ProjectSwimlaneCard from './ProjectSwimlaneCard';

type Props = {
    projects: dataFormat[];
};

export default function ProjectSwimlane({ projects }: Props): ReactElement {
    return (
        <div className="w-screen overflow-x-auto px-4">
            <div className="w-fit flex gap-4">
                {projects.map((project: dataFormat) => (
                    <ProjectSwimlaneCard project={project} key={project.name} />
                ))}
            </div>
        </div>
    );
}
