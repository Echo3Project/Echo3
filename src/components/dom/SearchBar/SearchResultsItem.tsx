import { ReactElement } from 'react';

import { apiResponse } from './*';

type Props = {
    result: apiResponse;
};

export default function SearchResultsItem({ result }: Props): ReactElement {
    return <span>{result.item.name}</span>;
}
