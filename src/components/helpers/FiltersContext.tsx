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
    list: string[];
    active: string[];
    setActive: Dispatch<SetStateAction<string[]>>;
};

const list = [
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
export const Filters = createContext({} as ReturnType);

export default function FiltersProvider({ children }: Props): ReactElement {
    const [active, setActive] = useState<string[]>([]);

    return (
        <Filters.Provider value={{ list, active, setActive }}>
            {children}
        </Filters.Provider>
    );
}
