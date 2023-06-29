import { ReactElement } from 'react';

import { Filter } from '@/components/helpers/context/FiltersContext';

import FiltersList from '../DragUpPanel/Header/FiltersList';

type Props = {
    viewState: {
        view: 'map' | 'list';
        setView: (value: 'map' | 'list') => void;
    };
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
    showNewFilterInterface: boolean;
    showSearchInterface: boolean;
    toggleShowFilterInterface: () => void;
    toggleShowNewFilterInterface: () => void;
    toggleShowSearchInterface: () => void;
    handleCloseInterface: () => void;
};

export default function MapHeader({
    viewState,
    filtersContext,
    showFilterInterface,
    showNewFilterInterface,
    showSearchInterface,
    toggleShowFilterInterface,
    toggleShowSearchInterface,
    handleCloseInterface,
}: Props): ReactElement {
    return (
        <div className="fixed pt-4 top-0 left-0 right-0 w-full flex flex-col pointer-events-auto bg-gradient-to-b from-black to-transparent via-[rgba(0,0,0,0.4)] z-50">
            {!showFilterInterface &&
            !showNewFilterInterface &&
            !showSearchInterface ? (
                <div className="relative flex justify-end gap-2 px-2">
                    <button
                        className={`absolute left-1/2 transform -translate-x-1/2 before:bg-[url(/buttons/switch_menu_button.svg)] before:absolute before:top-0 before:left-0 before:h-full before:w-full ${
                            viewState.view === 'list' ? 'before:rotate-180' : ''
                        }`}
                        style={{
                            width: '140px',
                            height: '36px',
                        }}
                        onClick={(): void => {
                            viewState.view === 'map'
                                ? viewState.setView('list')
                                : viewState.setView('map');
                        }}>
                        <div className="absolute inset-0 flex items-center justify-between px-4 text-white text-xs uppercase">
                            <span>Carte</span>
                            <span className="text-white/40">Liste</span>
                        </div>
                    </button>
                    <button
                        className="relative"
                        style={{
                            backgroundImage:
                                'url(/buttons/filter_menu_button.svg)',
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
                                'url(/buttons/search_menu_button.svg)',
                            width: '36px',
                            height: '36px',
                        }}
                        onClick={(): void => toggleShowSearchInterface()}
                    />
                </div>
            ) : (
                <div className="flex gap-20 justify-center">
                    <button
                        className="relative text-white text-xs text-center uppercase"
                        onClick={(): void => handleCloseInterface()}>
                        <div className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full" />
                        <div className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full" />
                        <div className="absolute bottom-0 left-0 w-1 h-1 bg-white rounded-full" />
                        <div className="absolute bottom-0 right-0 w-1 h-1 bg-white rounded-full" />
                        <div className="px-4 py-2">Fermer</div>
                    </button>
                </div>
            )}
            <FiltersList filtersContext={filtersContext} />
        </div>
    );
}
