import store from '@/store';
import {
    SubredditData,
    SubredditSorts,
    ParseDate,
    ParsedDate,
    ParseGildings,
    Gildings,
    ParsedGildings,
    ParsedPost,
    PostTransform,
    FetchSubreddit,
    FetchSubredditResponse,
} from './@types-reddit';

const apiUrl = ({ subreddit, type = SubredditSorts.NEW, after = false }: SubredditData) => {
    const url = new URL('https://www.reddit.com');
    url.pathname = `/r/${subreddit}/${type}/.json`;
    const searchParams = new URLSearchParams('limit=100');
    if (after !== false) {
        searchParams.set('after', after as string);
    }
    url.search = searchParams.toString();
    return url.toString();
};
const parseDate: ParseDate = (date: number): ParsedDate => ({
    hour: new Date(date * 1000).getUTCHours(),
    time: date,
});
const parseGildings: ParseGildings = (Gilding: Gildings): ParsedGildings => ({
    silver: Gilding.gid_1,
    gold: Gilding.gid_2,
    platinum: Gilding.gid_3,
});
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
export const fetchSubReddit = async (fetchConfig: SubredditData): Promise<FetchSubreddit> => {
    const url = apiUrl(fetchConfig);
    const response = await fetch(url)
        .then((res) => res.json())
        .catch((e) => {
            return false;
        });
    if (response !== false) {
        const posts = parsePosts(response);
        store.dispatch('reddit/addPosts', { posts });
        return {
            nodes: posts,
            after: response.data.after !== null ? response.data.after : false,
        };
    }
    return false;
};
export const streamPosts = async (fetchConfig: SubredditData, limit: number) => {
    const hasToStop = !store.state.reddit.started;
    if (hasToStop) {
        store.dispatch('reddit/setStatus', { status: false });
        return false;
    }
    const posts = await fetchSubReddit(fetchConfig);
    const counter = store.getters['reddit/totalCount'];
    if (counter < limit && posts !== false && (posts as FetchSubredditResponse).after !== false) {
        const newConfig = {
            ...fetchConfig,
            after: (posts as FetchSubredditResponse).after,
        };
        await streamPosts(newConfig, limit);
    } else {
        store.dispatch('reddit/setStatus', { status: false });
    }
    return posts;
};
