import Link from 'next/link';
import { ReactElement } from 'react';

import { apiResponse } from './SearchBar';

type Props = {
    result: apiResponse;
};

export default function SearchResultsItem({ result }: Props): ReactElement {
    return (
        <div
            className="w-full h-fit rounded-3xl bg-cover bg-center text-white"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 40%, rgba(0,0,0,0.5) 70%), url(https://picsum.photos/seed/${
                    (result.item.name as string) +
                    (result.item.author as string)
                }600/600.webp)`,
            }}>
            <div className="px-6 py-7">
                <div className="flex justify-between text-sm">
                    <span>Discover by @{result.item.author as string}</span>
                    <span>
                        {Math.round(Math.random() * 1761)} Contributions
                    </span>
                </div>
                <div className="mt-44">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xl font-semibold">
                            {result.item.name as string}
                        </h4>
                        <div className="flex text-sm gap-2">
                            <span
                                className="whitespace-nowrap justify-center items-center px-2 py-1 rounded-full"
                                style={{
                                    backgroundColor: 'rgba(165, 255, 174, 0.7)',
                                }}>
                                {(result.item.tags as string[])[0]}
                            </span>
                        </div>
                    </div>
                    <p className="text-ellipsis line-clamp-3 opacity-50">
                        {result.item.description as string}
                    </p>
                </div>
            </div>
            <div className="flex border-t border-gray-400 text-center divide-x divide-gray-400 cursor-pointer">
                <Link
                    href={`/projets/${result.item.id as string}/whitepaper`}
                    className="w-1/2 py-4">
                    Whitepaper
                </Link>
                <Link href={'https://discord.com/'} className="w-1/2 py-4">
                    Communauté
                </Link>
            </div>
        </div>
    );
}
