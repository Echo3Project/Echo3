import { ForwardedRef, forwardRef, ReactElement } from 'react';

import { Filter } from '@/components/helpers/context/FiltersContext';

import FiltersList from './FiltersList';

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
    showFilterInterface: boolean;
    newFilterInterface: boolean;
    toggleShowFilterInterface: () => void;
    toggleNewFilterInterface: () => void;
};

const Header = forwardRef(function Header(
    {
        filtersContext,
        showFilterInterface,
        newFilterInterface,
        toggleShowFilterInterface,
        toggleNewFilterInterface,
    }: Props,
    panelHeader: ForwardedRef<HTMLDivElement>,
): ReactElement {
    const getSearchContext = (): string => {
        const { active } = filtersContext;
        const { customFilters } = filtersContext.list;

        if (active.length === 1) {
            return active[0];
        } else if (active.length > 1) {
            const customFilterTitle = customFilters
                .filter((filter) =>
                    filter.fields.every((field) => active.includes(field)),
                )
                .map((filter) => filter.title);

            if (customFilterTitle.length > 0) {
                return `ces choix`;
            } else {
                return active.join(', ');
            }
        } else {
            return '...';
        }
    };
    const handleGoBack = (): void => {
        if (newFilterInterface) {
            toggleNewFilterInterface(); // Fermer l'interface de création de nouveau filtre
        } else {
            toggleShowFilterInterface(); // Fermer l'interface de filtres
        }
    };

    return (
        <div
            className="w-full flex flex-col justify-center items-center bg-white rounded-t-3xl border-t border-gray pb-2 touch-none"
            ref={panelHeader}>
            <div className="w-12 h-0 my-4 border-2 rounded-full border-gray-400 cursor-grab"></div>
            {!showFilterInterface ? (
                <div className="flex flex-col w-full items-center bg-white max-h-full h-full">
                    {/* Header of main interface */}
                    <div className="flex items-start justify-between w-full px-4">
                        <span className="font-bold text-base">
                            19293 Projets pour {getSearchContext()}
                        </span>
                        <button
                            onClick={toggleShowFilterInterface}
                            className="text-black-500 font-normal py-2 px-4 rounded">
                            Filtres
                        </button>
                    </div>
                    <FiltersList filtersContext={filtersContext} />
                </div>
            ) : (
                <div className="flex flex-col w-full items-center bg-white max-h-full h-full">
                    <div className="flex justify-center items-center w-full px-4">
                        <h1 className="font-bold text-base">Filtres</h1>
                    </div>
                    <div className="flex items-center justify-between w-full px-4">
                        {/* TODO: Use reducer to wrap state and logic of handle */}
                        <button
                            onClick={handleGoBack}
                            className="text-black-500 font-normal py-2 px-4 rounded">
                            Retour
                        </button>
                        <button
                            disabled
                            onClick={toggleShowFilterInterface}
                            className="text-gray-500 font-normal py-2 px-4 rounded">
                            Réinitialiser
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
});

export default Header;
