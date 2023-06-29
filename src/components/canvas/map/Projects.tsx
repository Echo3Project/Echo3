import { Fragment, ReactElement, useMemo } from 'react';

import { dataFormat } from '@/utils/types';

import Chunk from './Chunk';

type Props = {
    projects: dataFormat[];
    toggleShowProjectPanel: () => void;
    setClickedProjectData: (data: dataFormat) => void;
};

export default function Projects({
    projects,
    toggleShowProjectPanel,
    setClickedProjectData,
}: Props): ReactElement {
    const rows = 5;
    const columns = 5;

    const context = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const context = canvas.getContext('2d', { willReadFrequently: true });
        return context as CanvasRenderingContext2D;
    }, []);

    return (
        <group rotation-y={Math.PI}>
            {/* eslint-disable-next-line prefer-spread */}
            {Array.apply(null, Array(rows)).map((_, rowIndex) => (
                <Fragment key={rowIndex}>
                    {/* eslint-disable-next-line prefer-spread */}
                    {Array.apply(null, Array(columns)).map((_, columnIndex) => (
                        <group
                            key={columnIndex}
                            position={[
                                ((columns - 1) / 2 - columnIndex) * 1024 + 1200,
                                0,
                                (rowIndex - rows / 2) * 1024 - 2048,
                            ]}>
                            <Chunk
                                row={4 - rowIndex}
                                column={4 - columnIndex}
                                projects={projects}
                                toggleShowProjectPanel={toggleShowProjectPanel}
                                setClickedProjectData={setClickedProjectData}
                                context={context}
                                count={
                                    /* eslint-disable @typescript-eslint/no-var-requires */
                                    (
                                        require(`./data/${
                                            4 - columnIndex + 1
                                        }_${4 - rowIndex + 1}.json`) as {
                                            l: number;
                                        }
                                    ).l
                                    /* eslint-enable @typescript-eslint/no-var-requires */
                                }
                            />
                        </group>
                    ))}
                </Fragment>
            ))}
        </group>
    );
}
