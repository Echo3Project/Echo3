import { ReactElement, useEffect } from 'react';

import { Filter } from '@/components/helpers/context/FiltersContext';

type Props = {
    filtersContext: {
        list: {
            fields: string[];
            tags: string[];
            customFilters: Filter[];
        };
        active: string[];
        setActive: (value: string[]) => void;
    };
};
export default function FiltersList({ filtersContext }: Props): ReactElement {
    const { list, active, setActive } = filtersContext;
    const { customFilters } = list;

    useEffect(() => {
        setActive([]);
    }, [setActive]);

    const isFilterActive = (filter: string): boolean => {
        if (list.tags.includes(filter)) {
            return active.includes(filter);
        }
        const customFilter = customFilters.find((f) => f.title === filter);
        if (customFilter) {
            return customFilter.fields.every((field) => active.includes(field));
        }
        return false;
    };

    return (
        <div className="w-full my-2 overflow-x-auto scrollbar-hidden select-none">
            <div className="flex w-fit mx-4 text-sm text-black">
                {list.tags
                    .concat(customFilters.map((filter) => filter.title))
                    .map(
                        (filter: string, index: number): ReactElement => (
                            <button
                                key={index}
                                className={`whitespace-nowrap flex justify-center items-center px-6 py-3 rounded-full border border-gray-400 gap-2 mx-1 first:ml-0 last:mr-0 ${
                                    isFilterActive(filter)
                                        ? 'bg-green-300'
                                        : 'bg-white'
                                }`}
                                onClick={(): void => {
                                    const customFilter = customFilters.find(
                                        (cf) => cf.title === filter,
                                    );
                                    if (customFilter) {
                                        const isActive =
                                            customFilter.fields.every((field) =>
                                                active.includes(field),
                                            );
                                        let newActiveFilters;
                                        if (isActive) {
                                            // Si le filtre personnalisé est actif, nous retirons tous ses champs
                                            newActiveFilters = active.filter(
                                                (activeFilter) =>
                                                    !customFilter.fields.includes(
                                                        activeFilter,
                                                    ),
                                            );
                                        } else {
                                            // Si le filtre personnalisé n'est pas actif, nous ajoutons tous ses champs
                                            newActiveFilters = [
                                                ...active,
                                                ...customFilter.fields.filter(
                                                    (field) =>
                                                        !active.includes(field),
                                                ),
                                            ];
                                        }
                                        setActive(newActiveFilters);
                                    } else {
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
                                    }
                                }}>
                                <div className="bg-filters bg-no-repeat bg-center bg-contain h-4 w-3"></div>
                                {filter}
                            </button>
                        ),
                    )}
            </div>
        </div>
    );
}
