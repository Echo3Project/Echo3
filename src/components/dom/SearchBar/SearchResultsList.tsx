import { ReactElement } from 'react';

import { apiResponse } from './SearchBar';
import SearchResultsItem from './SearchResultsItem';

type Props = {
    results: apiResponse[];
};

export default function SearchResultsList({ results }: Props): ReactElement {
    return (
        <div className="bg-white w-full max-w-sm rounded-lg px-4 py-3">
            {results.map((result, index) => {
                return (
                    <div key={index}>
                        <SearchResultsItem result={result} />
                    </div>
                );
            })}
        </div>
    );
}
