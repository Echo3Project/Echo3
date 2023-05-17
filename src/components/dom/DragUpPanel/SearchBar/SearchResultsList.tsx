import { ReactElement } from 'react';

import { apiResponse } from './SearchBar';
import SearchResultsItem from './SearchResultsItem';

type Props = {
    results: apiResponse[];
};

export default function SearchResultsList({ results }: Props): ReactElement {
    return (
        <div
            className="bg-white w-full max-w-sm rounded-lg px-4 overflow-y-auto"
            style={{ maxHeight: 'calc(100% - 210px)' }}>
            {results.map((result, index) => {
                return (
                    <div key={index} className="mb-4">
                        <SearchResultsItem result={result} />
                    </div>
                );
            })}
        </div>
    );
}
