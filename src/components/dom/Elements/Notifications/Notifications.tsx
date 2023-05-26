import { ReactElement } from 'react';

type Props = {
    count: number;
};

export default function Notifications({ count }: Props): ReactElement {
    return (
        <div className="rounded-full bg-red-500 text-white text-xs flex justify-center items-center px-2 py-1 min-w-fit scale-90">
            <span>{count}</span>
        </div>
    );
}
