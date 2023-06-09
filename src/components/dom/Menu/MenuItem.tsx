import dynamic from 'next/dynamic';
import Link from 'next/link';
import { PropsWithChildren, ReactElement } from 'react';
const Notifications = dynamic(() => import('../Elements/Notifications'), {
    ssr: false,
});

type Props = PropsWithChildren & {
    route: string;
    title: string;
    active: boolean;
    notifications?: number;
};

export default function Item({
    children,
    route,
    title,
    active,
    notifications,
}: Props): ReactElement {
    return (
        <Link
            href={route}
            className="flex flex-col items-center justify-center relative">
            <div
                className={`flex flex-col justify-center items-center ${
                    active ? 'opacity-100' : 'opacity-25'
                }`}>
                <div className="relative w-6 h-6 flex justify-center items-center">
                    {children}
                </div>
                <span className="text-xs text-center">{title}</span>
            </div>
            {notifications && (
                <div className="absolute -top-1 right-0 translate-x-1/3">
                    <Notifications count={notifications} />
                </div>
            )}
        </Link>
    );
}
