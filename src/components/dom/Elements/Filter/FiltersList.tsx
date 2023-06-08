import { ReactElement, useContext, useEffect } from 'react';

import { Filters } from '@/components/helpers/context/FiltersContext';

import { Filter } from './Filter';

export default function FiltersList(): ReactElement {
    const { list, active, setActive } = useContext(Filters);

    useEffect(() => {
        setActive([]);
    }, [setActive]);

    return (
        <div className="w-full h-fit overflow-x-auto scrollbar-hidden select-none">
            <div className="flex w-fit mx-4">
                {list.tags.map(
                    (filter: string, index: number): ReactElement => (
                        <button
                            key={index}
                            className={`whitespace-nowrap mx-1 first:ml-0 last:mr-0 ${
                                active.includes(filter)
                                    ? 'invert sepia'
                                    : 'invert-0 sepia-0'
                            }`}
                            style={
                                active.includes(filter)
                                    ? {
                                          filter: 'invert(56%) sepia(26%) saturate(7049%) hue-rotate(83deg) brightness(123%) contrast(123%)',
                                      }
                                    : undefined
                            }
                            onClick={(): void => {
                                if (active.includes(filter)) {
                                    setActive(
                                        active.filter(
                                            (item: string): boolean =>
                                                item !== filter,
                                        ),
                                    );
                                } else {
                                    setActive([...active, filter]);
                                }
                            }}>
                            <Filter text={filter} />
                        </button>
                    ),
                )}
            </div>
        </div>
    );
}
