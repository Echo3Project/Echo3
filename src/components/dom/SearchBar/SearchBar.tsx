import { ChangeEvent, FormEvent, ReactElement, useState } from 'react';

import SearchResultsList from './SearchResultsList';

export type dataFormat = {
    name: string;
    author: string;
    description: string;
    tags: string[];
};
export type apiResponse = {
    item: dataFormat;
    refIndex: number;
};

export default function SearchBar(): ReactElement {
    const [searchData, setSearchData] = useState<string>('');
    const [searchResults, setSearchResults] = useState<apiResponse[]>([]);

    function handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        search(searchData);
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setSearchData(e.target.value);
        search(e.target.value);
    }

    function search(input: string): void {
        const postData = async (): Promise<{ data: apiResponse[] }> => {
            const data = { search: input };
            const response = await fetch('/api/search', {
                method: 'POST',
                body: JSON.stringify(data),
            });
            return response.json() as Promise<{ data: apiResponse[] }>;
        };
        postData()
            .then((response): void => {
                setSearchResults(response.data);
            })
            .catch((error): void => {
                console.error(error);
            });
    }

    return (
        <div className="flex flex-col w-full items-center">
            <form className="w-full max-w-sm mb-2" onSubmit={handleSubmit}>
                <div className="bg-white rounded-lg px-4 py-1">
                    <div className="flex items-center py-2">
                        <input
                            className="appearance-none bg-transparent border-none w-full text-black-800 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            type="text"
                            placeholder="Echo 3"
                            aria-label="Search"
                            value={searchData}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </form>
            {searchResults.length > 0 && (
                <SearchResultsList results={searchResults} />
            )}
        </div>
    );
}
