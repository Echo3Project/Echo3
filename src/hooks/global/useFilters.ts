import { Dispatch, SetStateAction, useState } from 'react';

export type returnType = {
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

export function useFilters(): returnType {
    const [active, setActive] = useState<string[]>([]);

    return {
        list,
        active,
        setActive,
    };
}
