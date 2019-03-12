import { ParsedPost } from '@/utils/@types-reddit';

export interface RedditState {
    raw: any[];
    posts: ParsedPost[];
    started: boolean;
    timezone: string;
}
export enum Mutations {
    ADD_POSTS = 'ADD_POSTS',
    ADD_RAW_POSTS = 'ADD_RAW_POSTS',
    CLEAR_DATA = 'CLEAR_DATA',
    SET_STATUS = 'SET_STATUS',
    SET_TIMEZONE = 'SET_TIMEZONE',
}
export enum Actions {
    ADD_POSTS = 'addPosts',
    ADD_RAW_POSTS = 'addRawPosts',
    CLEAR_DATA = 'clearData',
    SET_STATUS = 'setStatus',
    SET_TIMEZONE = 'setTimezone',
    EXPORT_DATA = 'exportData',
}
export enum Getters {
    TOTAL_COUNT = 'totalCount',
    KEY_HOUR_GRID = 'keyHourGrid',
    POST_COUNT = 'postCount',
    SCORE_TOTAL = 'scoreTotal',
    SCORE_MEDIAN = 'scoreMedian',
    SCORE_MEAN = 'scoreMean',
    SCORE_RANGE = 'scoreRange',
    GILD_COUNTS = 'gildCounts',
    COMMENT_TOTAL = 'commentTotal',
    COMMENT_MEAN = 'commentMean',
    COMMENT_SCORE_RATIO = 'commentScoreRatio',
    OLDEST_POST = 'oldestPost',
}
export interface ChartGilding {
    [key: string]: number[];
}
