import { ParsedPost, ParsedGildings } from '@/utils/reddit';

export interface RedditState {
    posts: ParsedPost[];
    started: boolean;
}
export enum Mutations {
    ADD_POSTS = 'ADD_POSTS',
    CLEAR_DATA = 'CLEAR_DATA',
    SET_STATUS = 'SET_STATUS',
}
export enum Actions {
    ADD_POSTS = 'addPosts',
    CLEAR_DATA = 'clearData',
    SET_STATUS = 'setStatus',
}
export enum Getters {
    TOTAL_COUNT = 'totalCount',
    SCORE_HOUR_GRID = 'scoreHourGrid',
    POST_COUNT = 'postCount',
    SCORE_TOTAL = 'scoreTotal',
    SCORE_MEDIAN = 'scoreMedian',
    SCORE_MEAN = 'scoreMean',
    SCORE_RANGE = 'scoreRange',
    GILD_COUNTS = 'gildCounts',
}
export interface ChartGilding {
    [key: string]: number[];
}