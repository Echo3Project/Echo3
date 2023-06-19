import { ReactElement } from 'react';

import { Filter } from '@/components/helpers/context/FiltersContext';

import FiltersList from '../DragUpPanel/Header/FiltersList';

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
    handleGoBack: () => void;
};

export default function MapHeader({
    filtersContext,
    showFilterInterface,
    newFilterInterface,
    toggleShowFilterInterface,
    toggleNewFilterInterface,
    handleGoBack,
}: Props): ReactElement {
    return (
        <div className="fixed pt-4 top-0 left-0 right-0 w-full flex flex-col pointer-events-auto bg-gradient-to-b from-black to-transparent via-[rgba(0,0,0,0.4)]">
            {!showFilterInterface && !newFilterInterface ? (
                <div className="flex justify-end gap-2">
                    <button
                        className="relative text-white text-xs text-center uppercase"
                        onClick={(): void => {
                            console.log('voyager');
                        }}>
                        <div className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full" />
                        <div className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full" />
                        <div className="absolute bottom-0 left-0 w-1 h-1 bg-white rounded-full" />
                        <div className="absolute bottom-0 right-0 w-1 h-1 bg-white rounded-full" />
                        <div className="px-4 py-2">Cartes</div>
                    </button>
                    <button
                        className="relative text-white text-xs text-center uppercase"
                        onClick={(): void => toggleShowFilterInterface()}>
                        <div className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full" />
                        <div className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full" />
                        <div className="absolute bottom-0 left-0 w-1 h-1 bg-white rounded-full" />
                        <div className="absolute bottom-0 right-0 w-1 h-1 bg-white rounded-full" />
                        <div className="px-4 py-2">Liste</div>
                    </button>
                    <button
                        className="relative"
                        style={{
                            backgroundImage:
                                'url(/backgrounds/filterButton.svg)',
                            width: '36px',
                            height: '36px',
                        }}
                        onClick={(): void =>
                            toggleShowFilterInterface()
                        }></button>
                    <button
                        className="relative"
                        style={{
                            backgroundImage:
                                'url(/backgrounds/searchButton.svg)',
                            width: '36px',
                            height: '36px',
                        }}
                        onClick={(): void => console.log('Rechercher')}
                    />
                </div>
            ) : (
                <div className="flex gap-20 justify-center">
                    <button
                        className="relative text-white text-xs text-center uppercase"
                        onClick={(): void => handleGoBack()}>
                        <div className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full" />
                        <div className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full" />
                        <div className="absolute bottom-0 left-0 w-1 h-1 bg-white rounded-full" />
                        <div className="absolute bottom-0 right-0 w-1 h-1 bg-white rounded-full" />
                        <div className="px-4 py-2">Fermer</div>
                    </button>
                </div>
            )}
            {/* <SearchBar /> */}
            <FiltersList filtersContext={filtersContext} />
        </div>
    );
}
