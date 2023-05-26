import Image from 'next/image';
import { ReactElement } from 'react';

type Props = {
    badges: {
        name: string;
        image: string;
    }[];
};
export default function ProfileBadgesList({ badges }: Props): ReactElement {
    return (
        <div className="mt-1 flex gap-2">
            {badges.map((badge, index) => {
                return (
                    <Image
                        key={index}
                        width={16}
                        height={16}
                        className="w-4 h-4 object-contain object-center"
                        src={badge.image}
                        alt={badge.name}
                        title={badge.name}
                    />
                );
            })}
        </div>
    );
}
