import { ReactElement } from 'react';

export default function ProfileCTA(): ReactElement {
    return (
        <div className="mt-16 px-4 flex gap-2 text-white">
            <button className="bg-black rounded-lg w-1/2 py-2">
                S&apos;actualiser
            </button>
            <button className="bg-black rounded-lg w-1/2 py-2">
                Contribuer
            </button>
        </div>
    );
}
