import { useWeb3React } from '@web3-react/core';
import { UserRejectedRequestError } from '@web3-react/injected-connector';
import { ReactElement, useEffect, useState } from 'react';

import { useENSName, useMetaMaskOnboarding } from '@/hooks';
import { injected } from '@/lib';
import { ETHERSCAN_PREFIXES, formatEtherscanLink, shortenHex } from '@/utils';

type AccountProps = {
    triedToEagerConnect: boolean;
};

export function Account({
    triedToEagerConnect,
}: AccountProps): ReactElement | null {
    const { active, error, activate, chainId, account, setError } =
        useWeb3React();

    const {
        isMetaMaskInstalled,
        isWeb3Available,
        startOnboarding,
        stopOnboarding,
    } = useMetaMaskOnboarding();

    // manage connecting state for injected connector
    const [connecting, setConnecting] = useState(false);
    useEffect(() => {
        if (active || error) {
            setConnecting(false);
            stopOnboarding();
        }
    }, [active, error, stopOnboarding]);

    const ENSName = useENSName(account || '');

    if (error) {
        return null;
    }

    if (!triedToEagerConnect) {
        return null;
    }

    if (typeof account !== 'string') {
        return (
            <div>
                {isWeb3Available ? (
                    <button
                        disabled={connecting}
                        onClick={(): void => {
                            setConnecting(true);

                            activate(injected, undefined, true).catch(
                                (error: Error) => {
                                    // ignore the error if it's a user rejected request
                                    if (
                                        error instanceof
                                        UserRejectedRequestError
                                    ) {
                                        setConnecting(false);
                                    } else {
                                        setError(error);
                                    }
                                },
                            );
                        }}>
                        {isMetaMaskInstalled
                            ? 'Connect to MetaMask'
                            : 'Connect to Wallet'}
                    </button>
                ) : (
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    <button onClick={startOnboarding}>Install Metamask</button>
                )}
            </div>
        );
    }

    return (
        <a
            {...{
                href: formatEtherscanLink('Account', [
                    chainId as keyof typeof ETHERSCAN_PREFIXES,
                    account,
                ]),
                target: '_blank',
                rel: 'noopener noreferrer',
            }}>
            {ENSName || `${shortenHex(account, 4)}`}
        </a>
    );
}
