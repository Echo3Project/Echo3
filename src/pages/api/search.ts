import Fuse from 'fuse.js';
import type { NextApiRequest, NextApiResponse } from 'next';

import { dataFormat } from '@/utils/types';

import fakeData from './data/fake.json';

type RequestData = {
    search: string;
};

type ResponseData = {
    data: Fuse.FuseResult<dataFormat>[] | string;
};

const options = {
    includeScore: false,
    shouldSort: true,
    findAllMatches: false,
    threshold: 0.4,
    ignoreLocation: true,
    keys: [
        {
            name: 'name',
            weight: 1,
        },
        {
            name: 'author',
            weight: 0.5,
        },
    ],
};
const fuse = new Fuse(fakeData as [], options);

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
): void {
    const requestMethod = req.method;
    const body: RequestData = JSON.parse(req.body as string) as RequestData;
    let result = null;
    switch (requestMethod) {
        case 'POST':
            result = fuse.search(body.search, { limit: 20 });
            res.status(200).json({ data: result });
            break;
        default:
            res.status(403).json({ data: 'Oops' });
    }
}

// The following code is used to generate fake data
// import { faker } from '@faker-js/faker';
// import { faker as faker2 } from '@faker-js/faker/locale/fr';
// const fs = require('fs');

// const tagsList = ['NFT', 'Token', 'PFP', 'Shitcoin', 'Chain', 'DAO', 'DeFi', 'DEX', 'Lending', 'Staking', 'Yield', 'Farm', 'Liquidity', 'Mining', 'Governance', 'Oracles', 'Cross-chain', 'Wallet'];
// const fieldsList = ['Entertainment', 'Art'];
// const projects = [
//     ...Array(1000).fill(null).map(() => ({
//         name: faker2.name.firstName(),
//         author: faker2.name.firstName(),
//         description: faker2.lorem.paragraph(),
//         tags: [tagsList[Math.floor(Math.random() * tagsList.length)]],
//         fields: [fieldsList[Math.floor(Math.random() * fieldsList.length)]],
//     })),
// ]
// fs.writeFileSync('fake.json', JSON.stringify(projects, null, 4));
