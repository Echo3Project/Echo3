import { ETHERSCAN_PREFIXES } from './etherscanPrefixes';

export function formatEtherscanLink(
    type: 'Account' | 'Transaction',
    data: [keyof typeof ETHERSCAN_PREFIXES, string],
) {
    switch (type) {
        case 'Account': {
            const [chainId, address] = data;
            return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/address/${address}`;
        }
        case 'Transaction': {
            const [chainId, hash] = data;
            return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/tx/${hash}`;
        }
    }
}
