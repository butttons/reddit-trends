import { RedditState } from './reddit/@types';

export interface RootState {
    version: number;
    reddit: RedditState;
}
