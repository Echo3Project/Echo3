import { ReactElement, useEffect } from 'react';

type Props = {
    filtersContext: {
        list: string[];
        active: string[];
        setActive: (value: string[]) => void;
    };
};
export default function FiltersList({ filtersContext }: Props): ReactElement {
    const { list, active, setActive } = filtersContext;

    useEffect(() => {
        setActive([]);
    }, [setActive]);

    return (
        <div className="w-full my-2 overflow-x-auto scrollbar-hidden select-none">
            <div className="flex w-fit mx-4 text-sm text-black">
                {list.map(
                    (filter: string, index: number): ReactElement => (
                        <button
                            key={index}
                            className={`whitespace-nowrap flex justify-center items-center px-6 py-3 rounded-full border border-gray-400 gap-2 mx-1 first:ml-0 last:mr-0 ${
                                active.includes(filter)
                                    ? 'bg-green-300'
                                    : 'bg-white'
                            }`}
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
                            <div className="bg-filters bg-no-repeat bg-center bg-contain h-4 w-3"></div>
                            {filter}
                        </button>
                    ),
                )}
            </div>
        </div>
    );
}
