import { ReactElement } from 'react';

type Props = {
    badgesCount: number;
    contributionsCount: number;
    timeCount: number;
};

export default function ProfileStats({
    badgesCount,
    contributionsCount,
    timeCount,
}: Props): ReactElement {
    return (
        <div className="flex justify-center mt-4">
            <div className="absolute flex flex-col items-center mr-48">
                <span className="font-semibold leading-4">{badgesCount}</span>
                <span className="text-xs tracking-tighter">Badges</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="font-semibold leading-4">
                    {contributionsCount}
                </span>
                <span className="text-xs tracking-tighter">Contributions</span>
            </div>
            <div className="absolute flex flex-col items-center ml-48">
                <span className="font-semibold leading-4">{timeCount} min</span>
                <span className="text-xs tracking-tighter">Temps passé</span>
            </div>
        </div>
    );
}
