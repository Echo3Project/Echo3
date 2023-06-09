import { ReactElement } from 'react';

import { BellIcon, CrossIcon } from '../../Icons';

type Props = {
    slug: string;
    notification: boolean;
};

export default function NotificationSwitch({
    slug,
    notification,
}: Props): ReactElement {
    return (
        <label
            htmlFor={`notification-${slug}`}
            className="relative block h-7 w-12 cursor-pointer">
            <input
                defaultChecked={notification}
                type="checkbox"
                id={`notification-${slug}`}
                className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
            />

            <span className="absolute inset-y-0 start-0 z-10 m-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white transition-all peer-checked:start-5">
                <CrossIcon
                    color={'#000000'}
                    className="h-4 w-4 opacity-80"
                    data-unchecked-icon
                />
                <BellIcon
                    color={'#000000'}
                    className="hidden h-4 w-4 opacity-80"
                    data-checked-icon
                />
            </span>

            <span className="absolute inset-0 rounded-full bg-white opacity-70 border border border-gray-400"></span>
        </label>
    );
}
