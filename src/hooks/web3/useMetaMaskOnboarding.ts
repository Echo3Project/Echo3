import detectEthereumProvider from '@metamask/detect-provider';
import type MetaMaskOnboarding from '@metamask/onboarding';
import { useEffect, useRef, useState } from 'react';

type superchargedWindow = typeof window & {
    ethereum: Boolean;
};

export function useMetaMaskOnboarding() {
    const onboarding = useRef<MetaMaskOnboarding>();

    const [isMetaMaskInstalled, isMetaMaskInstalledSet] = useState<boolean>();

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        async function checkForMetaMask() {
            const provider = await detectEthereumProvider({
                timeout: 1000,
                mustBeMetaMask: true,
            });

            if (provider) {
                isMetaMaskInstalledSet(true);
            } else {
                isMetaMaskInstalledSet(false);
            }
        }

        checkForMetaMask().catch((error: Error) => {
            console.log(error);
        });
    }, []);

    async function startOnboarding() {
        const MetaMaskOnboarding = await import('@metamask/onboarding').then(
            (m) => m.default,
        );

        onboarding.current = new MetaMaskOnboarding();

        onboarding.current?.startOnboarding();
    }

    function stopOnboarding() {
        if (onboarding?.current) {
            onboarding.current.stopOnboarding();
        }
    }

    const isWeb3Available: Boolean =
        typeof window !== 'undefined' &&
        (window as superchargedWindow)?.ethereum;

    return {
        startOnboarding,
        stopOnboarding,
        isMetaMaskInstalled,
        isWeb3Available,
    };
}
