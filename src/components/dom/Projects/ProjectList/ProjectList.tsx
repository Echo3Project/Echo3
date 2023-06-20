import { ReactElement } from 'react';

import { dataFormat } from '@/utils/types';

import ProjectListItem from './ProjectListItem';

type Props = {
    projects: dataFormat[];
};

export default function ProjectList({ projects }: Props): ReactElement {
    return (
        <div className="py-6 px-4">
            {projects.map((project, index) => {
                return <ProjectListItem project={project} key={index} />;
            })}
        </div>
    );
}
