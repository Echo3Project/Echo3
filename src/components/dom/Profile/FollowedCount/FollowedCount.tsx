import Image from 'next/image';
import { ReactElement } from 'react';

type Props = {
    count: number;
};

export default function FollowedCount({ count }: Props): ReactElement {
    return (
        <div className="flex justify-center items-center w-full mb-4">
            <div className="flex flex-col justify-center items-center font-bold">
                <span className="text-4xl relative">
                    {count}
                    <Image
                        src="/icons/arrow_upward.svg"
                        alt="Arrow upward"
                        width={16}
                        height={16}
                        className="absolute bottom-1.5 -right-5"
                    />
                </span>
                <span className="text-2xl uppercase">Projets suivis</span>
            </div>
        </div>
    );
}
