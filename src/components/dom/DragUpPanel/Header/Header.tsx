import { ForwardedRef, forwardRef, ReactElement } from 'react';

import FiltersList from './FiltersList';

type Props = {
    filtersContext: {
        list: string[];
        active: string[];
        setActive: (value: string[]) => void;
    };
};

const Header = forwardRef(function Header(
    { filtersContext }: Props,
    panelHeader: ForwardedRef<HTMLDivElement>,
): ReactElement {
    function getSearchContext(): string {
        if (filtersContext.active.length === 1) {
            return `${filtersContext.active[0]}`;
        } else if (filtersContext.active.length > 1) {
            return `ces choix`;
        } else {
            return '...';
        }
    }

    return (
        <div
            className="w-full flex flex-col justify-center items-center bg-white rounded-t-3xl border border-gray pb-2 touch-none"
            ref={panelHeader}>
            <div className="w-12 h-0 my-4 border-2 rounded-full border-gray-400 cursor-grab"></div>
            <span className="font-bold text-base">
                19293 Projets pour {getSearchContext()}
            </span>
            <FiltersList filtersContext={filtersContext} />
        </div>
    );
});

export default Header;
