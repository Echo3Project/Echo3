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
const typesContributionList = ['Video', 'Opinion']; // , 'Analysis', 'Events', 'Threads'

const generateContributionContent = (type) => {
    if (type === 'Video') {
        return 'https://www.youtube.com/embed/jNQXAC9IVRw';
    } else {
        return faker.lorem.paragraph(1);
    }
};


const projects = Array.from({ length: 463 }, (_, index) => {
    const projectName = faker.name.firstName();
    const baseContributions = Array.from({ length: faker.datatype.number({ min: 1, max: 5 }) }, (_, index) => {
        const contributionType = typesContributionList[Math.floor(Math.random() * typesContributionList.length)];
        return {
            author: faker.name.fullName(),
            pseudo: faker.internet.userName(),
            avatarPicture: faker.internet.avatar(),
            date: faker.date.past(2),
            content: generateContributionContent(contributionType),
            type: contributionType,
        }
    });
    const recentContributions = Array.from({ length: 5 }, (_, index) => {
        const contributionType = index === 0 ? 'Paragraph' : typesContributionList[Math.floor(Math.random() * typesContributionList.length)];
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return {
            author: faker.name.fullName(),
            pseudo: faker.internet.userName(),
            avatarPicture: faker.internet.avatar(),
            date: faker.date.between(oneWeekAgo, new Date()),
            content: generateContributionContent(contributionType),
            type: contributionType,
        }
    });


    return {
        id: `${projectName}-${index}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]|[^a-zA-Z0-9]/g, ""),
        name: projectName,
        author: faker.name.firstName(),
        date: faker.date.past(20),
        discord: faker.datatype.number({ min: 5000, max: 25000 }),
        twitter: faker.datatype.number({ min: 5000, max: 25000 }),
        avatarPicture: faker.image.avatar(),
        coverPicture: faker.image.imageUrl(800, 600),
        description: faker.lorem.paragraph(),
        announcements: Array.from({ length: faker.datatype.number({ min: 1, max: 5 }) }, (_, index) => {
            return {
                author: faker.name.fullName(),
                title: faker.lorem.sentence(),
                content: faker.lorem.paragraph(1)
            }
        }),
        contributions: [...baseContributions, ...recentContributions],
        tags: [tagsList[Math.floor(Math.random() * tagsList.length)]],
        fields: [fieldsList[Math.floor(Math.random() * fieldsList.length)]],
    };
});


fs.writeFileSync(
    './src/pages/api/data/fake.json',
    JSON.stringify(projects, null, 4),
);
