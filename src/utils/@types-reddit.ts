export interface Gildings {
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
export interface SubredditData {
    subreddit: string;
    type?: SubredditSorts;
    after?: boolean | string;
}

export interface ParsedDate {
    hour?: number;
    time: number;
}
export type ParseDate = (date: number) => ParsedDate;

export interface ParsedGildings {
    silver: number;
    gold: number;
    platinum: number;
}
export type ParseGildings = (Gilding: Gildings) => ParsedGildings;

export interface PostTransform {
    key: string;
    transform: boolean | ParseDate | ParseGildings;
}
export interface ParsedPost {
    created_utc: number;
    gildings: ParsedGildings;
    num_comments: number;
    num_crossposts: number;
    score: number;
}
export interface FetchSubredditResponse {
    nodes: ParsedPost[];
    after: boolean | string;
}
export type FetchSubreddit = boolean | FetchSubredditResponse;
export type ParseFn = (payload: any) => void;
