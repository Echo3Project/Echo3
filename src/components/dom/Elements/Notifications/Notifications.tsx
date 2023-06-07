import { ReactElement } from 'react';

type Props = {
    count: number;
};

export default function Notifications({ count }: Props): ReactElement {
    function fixedCount(count: number): string {
        return count > 99 ? '99+' : count.toString();
    }
    return (
        <div className="rounded-full bg-neutral-300 text-black text-xs flex justify-center items-center px-1 min-w-fit">
            <span>{fixedCount(count)}</span>
        </div>
    );
}
