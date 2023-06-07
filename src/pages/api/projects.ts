import type { NextApiRequest, NextApiResponse } from 'next';

import fakeData from './data/fake.json';

type RequestData = {
    get: string[];
};

type ItemType = {
    name?: string;
    author?: string;
    description?: string;
    tags?: string[];
    fields?: string[];
};

type ResponseData = {
    data: ItemType[] | string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
): void {
    const requestMethod = req.method;
    const body: RequestData = JSON.parse(req.body as string) as RequestData;
    const result: ItemType[] = [];

    switch (requestMethod) {
        case 'POST':
            fakeData.forEach((item: ItemType): void => {
                const project = {};
                body.get.forEach((key: string): void => {
                    // eslint-disable-next-line no-prototype-builtins
                    item.hasOwnProperty(key) &&
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        (project[key] = item[key as keyof ItemType]);
                });
                result.push(project);
            });
            res.status(200).json({ data: result });
            break;
        default:
            res.status(403).json({ data: 'Oops' });
    }
    // res.status(200).json({ data: 'Ok' });
}
