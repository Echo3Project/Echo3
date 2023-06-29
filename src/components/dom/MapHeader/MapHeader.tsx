import dynamic from 'next/dynamic';
import { ReactElement, useContext } from 'react';

import { Audio as AudioContext } from '@/components/helpers/context/AudioContext';
import { Filter } from '@/components/helpers/context/FiltersContext';

import FiltersList from '../DragUpPanel/Header/FiltersList';
const SoundButton = dynamic(
    () => import('@/components/dom/Elements/SoundButton/SoundButton'),
    {
        ssr: false,
    },
);

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
    const audio = new Audio('/sounds/button.mp3');
    const { playing } = useContext(AudioContext);

    function playSound(): void {
        if (!playing) return;
        audio.currentTime = 0;
        void audio.play();
    }

    return (
        <div
            className={`fixed pt-4 pb-1 top-0 left-0 right-0 w-full flex flex-col pointer-events-auto z-50 ${
                viewState.view === 'map'
                    ? 'bg-gradient-to-b from-[rgba(255,255,255,0.8)] to-transparent'
                    : 'bg-white'
            }`}>
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
                            playSound();
                            viewState.view === 'map'
                                ? viewState.setView('list')
                                : viewState.setView('map');
                        }}>
                        <div className="absolute inset-0 flex items-center justify-between px-4 text-black text-xs uppercase">
                            <span
                                className={
                                    viewState.view === 'map'
                                        ? 'text-black'
                                        : 'text-black/40'
                                }>
                                Carte
                            </span>
                            <span
                                className={
                                    viewState.view === 'list'
                                        ? 'text-black'
                                        : 'text-black/40'
                                }>
                                Liste
                            </span>
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
                        className="relative text-black text-xs text-center uppercase"
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
            {viewState.view === 'map' && (
                <div className="px-2 flex justify-end">
                    <SoundButton />
                </div>
            )}
        </div>
    );
}
