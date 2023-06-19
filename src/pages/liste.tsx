import { ReactElement } from 'react';

import { ProjectList, ProjectSwimlane } from '@/components/dom/Projects';
import { dataFormat } from '@/utils/types';

type Props = {
    projects: dataFormat[];
};

export default function Page({ projects }: Props): ReactElement {
    const projectsCount = 125;
    return (
        <main className="overflow-x-hidden">
            <div className="w-full">
                <h1 className="text-3xl uppercase w-3/4 px-4 mb-12">
                    <span className="font-dot">No</span>s{' '}
                    <span className="font-dot">{projectsCount} pr✴j</span>ets{' '}
                    <span className="font-dot">référ</span>encés:
                </h1>
                <ProjectSwimlane projects={projects} />
                <ProjectList projects={projects} />
            </div>
        </main>
    );
}

type ServerProps = {
    props: Props;
};

export function getServerSideProps(): ServerProps {
    const fakeData: dataFormat[] =
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('@/pages/api/data/fake.json') as dataFormat[];
    const projects: dataFormat[] = [];

    for (let i = 0; i < 10; i++) {
        const project: dataFormat = {};
        ['name', 'author', 'tags', 'description'].forEach(
            (key: string): void => {
                // eslint-disable-next-line no-prototype-builtins
                fakeData[i].hasOwnProperty(key) &&
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    (project[key] = fakeData[i][key as keyof ItemType]);
            },
        );
        projects.push(project);
    }

    return {
        props: {
            projects: projects,
        },
    };
}
