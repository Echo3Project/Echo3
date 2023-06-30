import Link from 'next/link';
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
                if (project.id !== undefined) {
                    return (
                        <>
                            <Link
                                href={`/projets/${project.id}/whitepaper`}
                                key={project.id}>
                                <ProjectListItem
                                    project={project}
                                    key={index}
                                />
                            </Link>
                        </>
                    );
                } else {
                    return <ProjectListItem project={project} key={index} />;
                }
            })}
        </div>
    );
}
