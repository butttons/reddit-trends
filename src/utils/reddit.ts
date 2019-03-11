import store from '@/store';

interface Gildings {
    gid_1: number;
    gid_2: number;
    gid_3: number;
}
export const enum SubredditSorts {
    HOT = 'hot',
    NEW = 'new',
    CONTROVERSIAL = 'controversial',
    TOP = 'top',
    RISING = 'rising',
}
interface SubredditData {
    subreddit: string;
    type?: SubredditSorts;
    after?: boolean | string;
}
const apiUrl = ({ subreddit, type = SubredditSorts.NEW, after = false }: SubredditData) => {
    const url = new URL('https://www.reddit.com');
    url.pathname = `/r/${subreddit}/${type}/.json`;
    if (after !== false) {
        url.search = `after=${after}`;
    }
    return url.toString();
};
interface ParsedDate {
    hour: number;
    time: number;
}
type ParseDate = (date: number) => ParsedDate;
const parseDate: ParseDate = (date: number): ParsedDate => ({
    hour: new Date(date * 1000).getUTCHours(),
    time: date,
});
export interface ParsedGildings {
    silver: number;
    gold: number;
    platinum: number;
}
type ParseGildings = (Gilding: Gildings) => ParsedGildings;
const parseGildings: ParseGildings = (Gilding: Gildings): ParsedGildings => ({
    silver: Gilding.gid_1,
    gold: Gilding.gid_2,
    platinum: Gilding.gid_3,
});
interface PostTransform {
    key: string;
    transform: boolean | ParseDate | ParseGildings;
}
export interface ParsedPost {
    created_utc: ParsedDate;
    gildings: ParsedGildings;
    num_comments: number;
    num_crossposts: number;
    score: number;
}
const parsePosts = (response: any): ParsedPost[] => {
    const keys: PostTransform[] = [
        { key: 'name', transform: false },
        { key: 'created_utc', transform: parseDate },
        { key: 'gildings', transform: parseGildings },
        { key: 'score', transform: false },
        { key: 'num_comments', transform: false },
        { key: 'num_crossposts', transform: false },
    ];
    const children = response.data.children;
    return children.map((node: any) => {
        const post = node.data;
        return keys.reduce((acc: any, cell) => {
            // @ts-ignore
            acc[cell.key] = cell.transform === false ? post[cell.key] : cell.transform(post[cell.key]);
            return acc;
        }, {});
    });
};
export const fetchSubReddit = async (fetchConfig: SubredditData) => {
    const url = apiUrl(fetchConfig);
    const response = await fetch(url)
        .then((res) => res.json())
        .catch((e) => {
            return false;
        });
    if (response !== false) {
        return {
            nodes: parsePosts(response),
            after: response.data.after !== undefined ? response.data.after : false,
        };
    }
    return false;
};
export const streamPosts = async (fetchConfig: SubredditData, limit: number) => {
    const posts = await fetchSubReddit(fetchConfig);
    const counter = store.getters['reddit/totalCount'];
    if (counter < limit && store.state.reddit.started) {
        if (posts === false) {
            return;
        }
        const newConfig = {
            ...fetchConfig,
            after: posts.after,
        };
        store.dispatch('reddit/addPosts', { posts: posts.nodes });
        await streamPosts(newConfig, limit);
    } else {
        store.dispatch('reddit/setStatus', { status: false });
    }
    return posts;
};
