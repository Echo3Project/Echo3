const { faker } = require('@faker-js/faker');
const fs = require('fs');

faker.locale = 'fr';

const tagsList = [
    'NFT',
    'Token',
    'PFP',
    'Shitcoin',
    'Chain',
    'DAO',
    'DeFi',
    'DEX',
    'Lending',
    'Staking',
    'Yield',
    'Farm',
    'Liquidity',
    'Mining',
    'Governance',
    'Oracles',
    'Cross-chain',
    'Wallet',
];
const fieldsList = ['Entertainment', 'Art'];

const projects = Array.from({ length: 1000 }, () => ({
    name: faker.name.firstName(),
    author: faker.name.firstName(),
    description: faker.lorem.paragraph(),
    tags: [tagsList[Math.floor(Math.random() * tagsList.length)]],
    fields: [fieldsList[Math.floor(Math.random() * fieldsList.length)]],
}));

fs.writeFileSync(
    './src/pages/api/data/fake.json',
    JSON.stringify(projects, null, 4),
);
