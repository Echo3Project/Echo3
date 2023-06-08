import { ReactElement } from 'react';

import ProjectCard from '../../Elements/ProjectCard';

type Props = {
    projects: {
        slug: string;
        name: string;
        image: string;
        notification: boolean;
    }[];
};

export default function ProjectList({ projects }: Props): ReactElement {
    return (
        <div className="px-4 py-12">
            {projects.map((project, index) => (
                <div key={index} className="mb-2">
                    <ProjectCard project={project} />
                </div>
            ))}
        </div>
    );
}
