import { PropsWithChildren, ReactElement } from 'react';
import tunnel from 'tunnel-rat';

type Props = PropsWithChildren & {
    active: boolean;
};

export const modal = tunnel();

export default function Modal({ children, active }: Props): ReactElement {
    return (
        <modal.In>
            {active && (
                <div className="fixed top-0 left-0 p-8 h-screen w-full flex justify-center items-center bg-opacifier pointer-events-auto z-50">
                    <div className="rounded-xl bg-white p-4">{children}</div>
                </div>
            )}
        </modal.In>
    );
}
