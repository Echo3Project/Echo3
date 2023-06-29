import Link from 'next/link';
import { ReactElement } from 'react';

import ProjectListItem from '../../Projects/ProjectList/ProjectListItem';
import { apiResponse } from './SearchBar';

type Props = {
    results: apiResponse[];
};

export default function SearchResultsList({ results }: Props): ReactElement {
    return (
        <div
            className="bg-gray w-full max-w-sm rounded-lg px-1 py-4 overflow-y-auto"
            style={{ maxHeight: 'calc(100dvh - 212px)' }}>
            {results.map((result, index) => {
                return (
                    <Link
                        key={index}
                        className="mb-4"
                        href={`/projets/${
                            result.item.id as string
                        }/whitepaper`}>
                        <ProjectListItem project={result.item} />
                    </Link>
                );
            })}
        </div>
    );
}
