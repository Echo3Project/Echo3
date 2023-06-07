import {
    createContext,
    Dispatch,
    PropsWithChildren,
    ReactElement,
    SetStateAction,
    useState,
} from 'react';

type Props = PropsWithChildren;
type ReturnType = {
    list: {
        fields: string[];
        tags: string[];
        customFilters: { title: string; fields: string[] }[];
    };
    active: string[];
    setActive: Dispatch<SetStateAction<string[]>>;
    addFilter: (filter: { title: string; fields: string[] }) => void;
};
export type Filter = { title: string; fields: string[] };

const listTags = [
    'NFT',
    'Token',
    'PFP',
    'Shitcoin',
    'Chain',
    'DAO',
    'DeFi',
    'DEX',
    'Lending',
    'Staking',
    'Yield',
    'Farm',
    'Liquidity',
    'Mining',
    'Governance',
    'Oracles',
    'Cross-chain',
    'Wallet',
];
const listFields = ['Entertainment', 'Art'];
export const Filters = createContext({
    list: {
        fields: [] as string[],
        tags: [] as string[],
        customFilters: [] as Filter[],
    },
    active: [] as string[],
    setActive: () => {},
    addFilter: () => {},
} as ReturnType);

export default function FiltersProvider({ children }: Props): ReactElement {
    const [active, setActive] = useState<string[]>(() => []);
    const [list, setList] = useState(() => ({
        fields: [...listFields],
        tags: [...listTags],
        customFilters: [] as Filter[],
    }));

    const addFilter = (filter: { title: string; fields: string[] }): void => {
        setList((prevList) => ({
            ...prevList,
            customFilters: [...prevList.customFilters, filter],
        }));
    };

    return (
        <Filters.Provider
            value={{
                list,
                active,
                setActive,
                addFilter,
            }}>
            {children}
        </Filters.Provider>
    );
}
