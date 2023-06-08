import { ReactElement } from 'react';

type Props = {
    text: string;
};

export function Filter({ text }: Props): ReactElement {
    return (
        <div className="h-8 w-20 bg-filters bg-center bg-contain bg-no-repeat flex items-center justify-center">
            <span className="pl-4 font-medium overflow-hidden text-clip w-14">
                {text}
            </span>
        </div>
    );
}
