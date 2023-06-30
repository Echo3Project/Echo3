import { animated, useSpring } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import {
    Dispatch,
    ReactElement,
    SetStateAction,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { Clamp } from '@/components/helpers/maths';

import FiltersList from './Header/FiltersList';
import SearchBar from './SearchBar/SearchBar';

type Props = {
    filtersContext: {
        list: {
            fields: string[];
            tags: string[];
            customFilters: { title: string; fields: string[] }[];
        };
        active: string[];
        setActive: Dispatch<SetStateAction<string[]>>;
        addFilter: (filter: { title: string; fields: string[] }) => void;
    };
    showFilterInterface: boolean;
    showNewFilterInterface: boolean;
    showSearchInterface: boolean;
    toggleShowNewFilterInterface: () => void;
};

export default function DragUpPanel({
    filtersContext,
    showFilterInterface,
    showNewFilterInterface,
    showSearchInterface,
    toggleShowNewFilterInterface,
}: Props): ReactElement {
    const [newFilterTitle, setNewFilterTitle] = useState(() => '');

    const steps = useMemo(
        () => [
            -132,
            typeof window !== 'undefined' ? -window.innerHeight + 100 : -500,
        ],
        [],
    );
    const { list, active, setActive, addFilter } = filtersContext;
    const [{ y }, api] = useSpring(() => ({
        y: steps[0],
        config: { tension: 230, friction: 20 },
    }));
    const panelHeader = useRef<HTMLDivElement>(null);

    const handleGrab = (
        y: number,
        down: boolean,
        direction: number,
        last: boolean,
    ): void => {
        let closest = 0;
        if (down || y <= steps[steps.length - 1]) {
            api.start({ y: y });
        } else if (last) {
            closest = Clamp(closest - direction, 0, steps.length - 1);
            api.start({ y: steps[Number(closest)] });
        }
    };

    const handleNewFilterSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        addFilter({
            title: newFilterTitle,
            fields: active,
        });
        setNewFilterTitle('');
        setActive([]);
    };

    const handleFormKeyPress = (e: React.KeyboardEvent): void => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    useEffect(() => {
        if (
            active.length > 0 ||
            showFilterInterface ||
            showNewFilterInterface ||
            showSearchInterface === true
        ) {
            if (y.get() <= steps[1]) return;
            api.start({ y: steps[1] });
        } else {
            api.start({ y: steps[0] });
        }
    }, [
        active,
        api,
        y,
        steps,
        showFilterInterface,
        showNewFilterInterface,
        showSearchInterface,
    ]);

    useEffect(() => {
        const handler = (e: Event): void => e.preventDefault();
        document.addEventListener('gesturestart', handler);
        document.addEventListener('gesturechange', handler);
        document.addEventListener('gestureend', handler);
        return () => {
            document.removeEventListener('gesturestart', handler);
            document.removeEventListener('gesturechange', handler);
            document.removeEventListener('gestureend', handler);
        };
    }, []);

    useGesture(
        {
            onDrag: ({ tap, down, last, offset: [, y], direction: [, dy] }) => {
                if (
                    (active.length > 0 ||
                        showFilterInterface ||
                        showNewFilterInterface ||
                        showSearchInterface === true) &&
                    y &&
                    !tap
                ) {
                    handleGrab(y, down, dy, last);
                }
            },
        },
        {
            target: panelHeader,
            drag: {
                from: () => [0, y.get()],
                filterTaps: true,
                rubberband: true,
                bounds: {
                    top:
                        typeof window !== 'undefined'
                            ? -window.innerHeight
                            : -600,
                    bottom: -132,
                },
                eventOptions: { passive: false },
            },
        },
    );

    return (
        <div className="fixed inset-0 flex z-40 pointer-events-none">
            {showSearchInterface &&
                !showFilterInterface &&
                !showNewFilterInterface && (
                    <animated.div
                        ref={panelHeader}
                        className="fixed -bottom-full w-full h-screen max-h-screen pointer-events-auto flex flex-col"
                        style={{ y }}>
                        <div className="flex flex-col w-full items-center bg-gray-100 max-h-full h-full border-t border-gray pt-5 pb-2 rounded-t-3xl">
                            <div className="h-0.5 w-9 bg-gray-500 self-center mb-4" />
                            <div className="w-full my-2 overflow-x-auto scrollbar-hidden select-none">
                                <div className="flex w-full px-4 text-sm text-black-app">
                                    <SearchBar />
                                </div>
                            </div>
                        </div>
                    </animated.div>
                )}
            {/* If newFilterInterface is true, show form to add new filter title */}
            {showFilterInterface && !showNewFilterInterface && (
                <animated.div
                    ref={panelHeader}
                    className="fixed -bottom-full w-full h-screen max-h-screen pointer-events-auto flex flex-col"
                    style={{ y }}>
                    <div className="flex flex-col w-full items-center bg-gray-100 max-h-full h-full border-t border-gray pt-5 pb-2 rounded-t-3xl">
                        <div className="h-0.5 w-9 bg-gray-500 self-center mb-4" />
                        <h2>Profils de filtres enregistrés</h2>
                        <div className="w-full my-2 overflow-x-auto scrollbar-hidden select-none">
                            <div className="flex w-fit mx-4 text-sm text-black-app">
                                <div className='class="w-full my-2 scrollbar-hidden select-none"'>
                                    <button
                                        className="whitespace-nowrap flex justify-center items-center px-6 py-3 rounded-full border border-gray-400 gap-2 mx-1 first:ml-0 last:mr-0"
                                        onClick={toggleShowNewFilterInterface}>
                                        + Nouveau filtre
                                    </button>
                                </div>
                                <FiltersList filtersContext={filtersContext} />
                            </div>
                        </div>
                        {/* <button className="whitespace-nowrap flex justify-center items-center px-6 py-3 rounded-full border border-gray-400 gap-2 mx-1 first:ml-0 last:mr-0">
                                Supprimer le filtre
                            </button> */}
                    </div>
                </animated.div>
            )}
            {showFilterInterface && showNewFilterInterface && (
                <animated.div
                    ref={panelHeader}
                    className="fixed -bottom-full w-full h-screen max-h-screen pointer-events-auto flex flex-col"
                    style={{ y }}>
                    <div className="flex flex-col w-full items-center bg-gray-100 max-h-full h-full border-t border-gray pt-5 pb-2 rounded-t-3xl">
                        <div className="h-0.5 w-9 bg-gray-500 self-center mb-4" />
                        <div className="w-full">
                            <form
                                onSubmit={handleNewFilterSubmit}
                                onKeyPress={handleFormKeyPress}
                                className="mx-4">
                                <label>
                                    Titre du filtre:
                                    <input
                                        type="text"
                                        value={newFilterTitle}
                                        placeholder="Nom..."
                                        className="w-full whitespace-nowrap flex justify-center items-center px-6 py-3 rounded-full border border-gray-400 gap-2 my-1 first:ml-0 last:mr-0 bg-white"
                                        onChange={(e): void =>
                                            setNewFilterTitle(e.target.value)
                                        }
                                    />
                                </label>
                                <button
                                    type="submit"
                                    className="whitespace-nowrap flex justify-center items-center px-6 py-3 rounded-full border border-gray-400 gap-2 mx-4 first:ml-0 last:mr-0 bg-black text-white rounded-md">
                                    Créer le filtre
                                </button>
                            </form>
                        </div>

                        {/* TODO: create new components like FiltersList, use db instead of fake data and use reducer to wrap logic of filters */}
                        <div className="w-full my-2 overflow-x-auto scrollbar-hidden select-none">
                            <div className="flex w-fit mx-4 text-sm text-black-app">
                                {list.fields.map(
                                    (
                                        field: string,
                                        index: number,
                                    ): ReactElement => (
                                        <button
                                            key={index}
                                            className={`whitespace-nowrap flex justify-center items-center px-6 py-3 rounded-full border border-gray-400 gap-2 mx-1 first:ml-0 last:mr-0 ${
                                                active.includes(field)
                                                    ? 'bg-green-300'
                                                    : 'bg-white'
                                            }`}
                                            onClick={(): void => {
                                                if (active.includes(field)) {
                                                    setActive(
                                                        active.filter(
                                                            (
                                                                item: string,
                                                            ): boolean =>
                                                                item !== field,
                                                        ),
                                                    );
                                                } else {
                                                    setActive([
                                                        ...active,
                                                        field,
                                                    ]);
                                                }
                                            }}>
                                            <div className="bg-filters bg-no-repeat bg-center bg-contain h-4 w-3"></div>
                                            {field}
                                        </button>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                </animated.div>
            )}
        </div>
    );
}
