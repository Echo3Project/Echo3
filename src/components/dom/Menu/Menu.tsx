import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

export default function Menu(): ReactElement {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect((): void => {
        setOpen(false);
    }, [router.asPath]);

    return (
        <>
            <button
                className="fixed right-0 mr-4 mt-4 h-12 w-12 bg-black rounded-lg flex justify-center items-center cursor-pointer"
                onClick={(): void => setOpen(true)}>
                <Image
                    src="/menu_open.svg"
                    alt="Menu icon open"
                    width={20}
                    height={20}
                />
            </button>
            <div
                className={`fixed top-0 left-0 h-full w-full bg-black text-white uppercase font-medium flex flex-col items-center justify-center z-50 gap-4 ${
                    open ? 'block' : 'hidden'
                }`}>
                <button
                    className="fixed top-0 right-0 mr-4 mt-4 h-12 w-12 flex justify-center items-center cursor-pointer"
                    onClick={(): void => setOpen(false)}>
                    <Image
                        src="/menu_open.svg"
                        alt="Menu icon close"
                        width={20}
                        height={20}
                    />
                </button>
                <Link href="/">Home</Link>
                <Link href="/map">Map</Link>
            </div>
        </>
    );
}
