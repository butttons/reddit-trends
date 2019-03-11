import { GetterTree } from 'vuex';
import { RootState } from './../@types';
import { RedditState, Getters, ChartGilding } from './@types';
import { emptyData, findMedian, findRange, findTotal, findCount } from '@/utils/charts';

export const getters: GetterTree<RedditState, RootState> = {
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
    [Getters.SCORE_HOUR_GRID]: (state) =>
        state.posts.reduce((acc: any, post) => {
            const hour = post.created_utc.hour;
            if (acc[hour] === undefined) {
                acc[hour] = [];
            }
            acc[hour].push(post.score);
            return acc;
        }, Array.from({ length: 24 })),
    [Getters.POST_COUNT]: (_, moduleGetters) => {
        const dataset = moduleGetters[Getters.SCORE_HOUR_GRID].map(findCount);
        return dataset;
    },
    [Getters.SCORE_TOTAL]: (_, moduleGetters) => {
        const dataset = moduleGetters[Getters.SCORE_HOUR_GRID].map(findTotal);
        return dataset;
    },
    [Getters.SCORE_MEAN]: (_, moduleGetters) => {
        const dataset = emptyData();
        const scoreTotals = moduleGetters[Getters.SCORE_TOTAL];
        const postCounts = moduleGetters[Getters.POST_COUNT];
        return dataset.map((n, i) => (postCounts[i] > 0 ? Math.ceil(scoreTotals[i] / postCounts[i]) : 0));
    },
    [Getters.SCORE_MEDIAN]: (_, moduleGetters) => {
        const dataset = moduleGetters[Getters.SCORE_HOUR_GRID].map(findMedian);
        return dataset;
    },
    [Getters.SCORE_RANGE]: (_, moduleGetters) => {
        const dataset = moduleGetters[Getters.SCORE_HOUR_GRID].map(findRange);
        return dataset;
    },
};
