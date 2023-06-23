export type dataFormat = {
    id?: string;
    name?: string;
    title?: string;
    author?: string;
    content?: string;
    date: Date;
    discord: number;
    twitter: number;
    avatarPicture?: string;
    coverPicture?: string;
    description?: string;
    announcements?: {
        author?: string;
        title?: string;
        content?: string;
    }[];
    contributions?: {
        author?: string;
        pseudo?: string;
        avatarPicture?: string;
        date?: Date;
        content?: string;
        type?: string;
    }[];
    tags?: string[];
    fields?: string[];
};

export type authorFormat = {
    pseudo?: string;
    contributions: number;
    points: number;
    oldestContribution: Date;
    avatarPicture: string;
};
