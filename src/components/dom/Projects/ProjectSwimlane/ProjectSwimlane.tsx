import Link from 'next/link';
import { ReactElement } from 'react';

import { dataFormat } from '@/utils/types';

import ProjectSwimlaneCard from './ProjectSwimlaneCard';

type Props = {
    projects: dataFormat[];
};

export default function ProjectSwimlane({ projects }: Props): ReactElement {
    return (
        <div className="w-screen overflow-x-auto px-4 scrollbar-hidden">
            <div className="w-fit flex gap-4">
                {projects.map((project: dataFormat) => {
                    if (project.id !== undefined) {
                        return (
                            <>
                                <Link
                                    href={`/projets/${project.id}/whitepaper`}
                                    key={project.id}>
                                    <ProjectSwimlaneCard project={project} />
                                </Link>
                            </>
                        );
                    } else {
                        return (
                            <ProjectSwimlaneCard
                                project={project}
                                key={project.name}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
}
