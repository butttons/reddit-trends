import { GetterTree } from 'vuex';
import { RootState } from './../@types';
import { RedditState, Getters, ChartGilding } from './@types';
import {
    emptyData,
    findMedian,
    findRange,
    findTotal,
    findCount,
} from '@/utils/charts';
export const getters: GetterTree<RedditState, RootState> = {
    [Getters.OLDEST_POST]: (state) => {
        if (!state.posts.length) {
            return 'none';
        }
        const dates = state.posts.map((post) => post.created_utc.time);
        const oldest = Math.min(...dates);
        return new Date(oldest * 1000).toUTCString();
    },
    [Getters.TOTAL_COUNT]: (state) => state.posts.length,
    [Getters.GILD_COUNTS]: (state) => {
        const dataset: ChartGilding = {
            silver: emptyData(),
            gold: emptyData(),
            platinum: emptyData(),
        };
        state.posts.forEach((post) => {
            const hour = post.created_utc.hour;
            dataset.silver[hour] += post.gildings.silver;
            dataset.gold[hour] += post.gildings.gold;
            dataset.platinum[hour] += post.gildings.platinum;
        });
        return dataset;
    },
    [Getters.KEY_HOUR_GRID]: (state) => (key: string = 'score') =>
        state.posts.reduce((acc: any, post: any) => {
            const hour = post.created_utc.hour;
            if (acc[hour] === undefined) {
                acc[hour] = [];
            }
            acc[hour].push(post[key]);
            return acc;
        }, Array.from({ length: 24 })),
    [Getters.POST_COUNT]: (_, moduleGetters) =>
        moduleGetters[Getters.KEY_HOUR_GRID]('score').map(findCount),
    [Getters.SCORE_TOTAL]: (_, moduleGetters) =>
        moduleGetters[Getters.KEY_HOUR_GRID]('score').map(findTotal),
    [Getters.SCORE_MEAN]: (_, moduleGetters) => {
        const dataset = emptyData();
        const scoreTotals = moduleGetters[Getters.SCORE_TOTAL];
        const postCounts = moduleGetters[Getters.POST_COUNT];
        return dataset.map((n, i) =>
            postCounts[i] > 0 ? Math.ceil(scoreTotals[i] / postCounts[i]) : 0,
        );
    },
    [Getters.SCORE_MEDIAN]: (_, moduleGetters) =>
        moduleGetters[Getters.KEY_HOUR_GRID]('score').map(findMedian),
    [Getters.SCORE_RANGE]: (_, moduleGetters) =>
        moduleGetters[Getters.KEY_HOUR_GRID]('score').map(findRange),
    [Getters.COMMENT_TOTAL]: (_, moduleGetters) =>
        moduleGetters[Getters.KEY_HOUR_GRID]('num_comments').map(findTotal),
    [Getters.COMMENT_MEAN]: (_, moduleGetters) => {
        const dataset = emptyData();
        const commentTotals = moduleGetters[Getters.COMMENT_TOTAL];
        const postCounts = moduleGetters[Getters.POST_COUNT];
        return dataset.map((n, i) =>
            postCounts[i] > 0 ? Math.ceil(commentTotals[i] / postCounts[i]) : 0,
        );
    },
    [Getters.COMMENT_SCORE_RATIO]: (_, moduleGetters) => {
        const dataset = emptyData();
        const commentTotals = moduleGetters[Getters.COMMENT_TOTAL];
        const scoreTotals = moduleGetters[Getters.SCORE_TOTAL];
        return dataset.map((n, i) =>
            commentTotals[i] > 0
                ? Math.ceil(scoreTotals[i] / commentTotals[i])
                : 0,
        );
    },
};
