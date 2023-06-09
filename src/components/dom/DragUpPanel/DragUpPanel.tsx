import { animated, useSpring } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import {
    ReactElement,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { Filters } from '@/components/helpers/context/FiltersContext';
import { Clamp } from '@/components/helpers/maths';

import Header from './Header';
import FiltersList from './Header/FiltersList';
import SearchBar from './SearchBar';

export default function DragUpPanel(): ReactElement {
    const [showFilterInterface, setShowFilterInterface] = useState(() => false);
    const [newFilterInterface, setNewFilterInterface] = useState(() => false);
    const [newFilterTitle, setNewFilterTitle] = useState(() => '');

    const steps = useMemo(
        () => [
            -132,
            -300,
            typeof window !== 'undefined' ? -window.innerHeight : -600,
        ],
        [],
    );
    const filtersContext = useContext(Filters);
    const { list, active, setActive, addFilter } = filtersContext;
    const [{ y }, api] = useSpring(() => ({
        y: steps[0],
        config: { tension: 230, friction: 20 },
    }));
    const panelHeader = useRef<HTMLDivElement>(null);

    const toggleShowFilterInterface = (): void => {
        setShowFilterInterface((prev) => !prev);
    };

    const toggleNewFilterInterface = (): void => {
        setNewFilterInterface((prev) => !prev);
    };

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
        if (active.length > 0 || showFilterInterface === true) {
            if (y.get() <= steps[1]) return;
            api.start({ y: steps[1] });
        } else {
            api.start({ y: steps[0] });
        }
    }, [active, showFilterInterface, api, y, steps]);

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
                    (active.length > 0 || showFilterInterface === true) &&
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
        <div className="fixed inset-0 flex">
            {!showFilterInterface ? (
                <animated.div
                    className="fixed -bottom-full w-full h-screen max-h-screen pointer-events-auto flex flex-col"
                    style={{ y }}>
                    <Header
                        filtersContext={filtersContext}
                        ref={panelHeader}
                        showFilterInterface={showFilterInterface}
                        newFilterInterface={newFilterInterface}
                        toggleShowFilterInterface={toggleShowFilterInterface}
                        toggleNewFilterInterface={toggleNewFilterInterface}
                    />
                    <SearchBar />
                </animated.div>
            ) : (
                <animated.div
                    className="fixed -bottom-full w-full h-screen max-h-screen pointer-events-auto flex flex-col"
                    style={{ y }}>
                    <Header
                        filtersContext={filtersContext}
                        ref={panelHeader}
                        showFilterInterface={showFilterInterface}
                        newFilterInterface={newFilterInterface}
                        toggleShowFilterInterface={toggleShowFilterInterface}
                        toggleNewFilterInterface={toggleNewFilterInterface}
                    />
                    {/* If newFilterInterface is true, show form to add new filter title */}
                    {newFilterInterface ? (
                        <div className="flex flex-col w-full items-center bg-white max-h-full h-full border-t border-gray pt-5 pb-2">
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
                                                setNewFilterTitle(
                                                    e.target.value,
                                                )
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
                                <div className="flex w-fit mx-4 text-sm text-black">
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
                                                    if (
                                                        active.includes(field)
                                                    ) {
                                                        setActive(
                                                            active.filter(
                                                                (
                                                                    item: string,
                                                                ): boolean =>
                                                                    item !==
                                                                    field,
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
                    ) : (
                        <div className="flex flex-col w-full items-center bg-white max-h-full h-full border-t border-gray pt-5 pb-2">
                            <h2>Profils de filtres enregistrés</h2>
                            <div className="w-full my-2 overflow-x-auto scrollbar-hidden select-none">
                                <div className="flex w-fit mx-4 text-sm text-black">
                                    <div className='class="w-full my-2 scrollbar-hidden select-none"'>
                                        <button
                                            className="whitespace-nowrap flex justify-center items-center px-6 py-3 rounded-full border border-gray-400 gap-2 mx-1 first:ml-0 last:mr-0"
                                            onClick={toggleNewFilterInterface}>
                                            + Nouveau filtre
                                        </button>
                                    </div>
                                    <FiltersList
                                        filtersContext={filtersContext}
                                    />
                                </div>
                            </div>
                            {/* <button className="whitespace-nowrap flex justify-center items-center px-6 py-3 rounded-full border border-gray-400 gap-2 mx-1 first:ml-0 last:mr-0">
                                Supprimer le filtre
                            </button> */}
                        </div>
                    )}
                </animated.div>
            )}
        </div>
    );
}
