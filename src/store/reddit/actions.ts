import { ActionTree } from 'vuex';
import { RootState } from './../@types';
import { RedditState, Mutations, Actions } from './@types';
export const actions: ActionTree<RedditState, RootState> = {
    [Actions.ADD_POSTS]({ commit }, { posts }) {
        commit(Mutations.ADD_POSTS, posts);
    },
    [Actions.ADD_RAW_POSTS]({ commit }, { posts }) {
        commit(Mutations.ADD_RAW_POSTS, posts);
    },
    [Actions.CLEAR_DATA]({ commit }) {
        commit(Mutations.CLEAR_DATA);
    },
    [Actions.SET_STATUS]({ commit }, { status }) {
        commit(Mutations.SET_STATUS, status);
    },
    [Actions.SET_TIMEZONE]({ commit }, { timezone }) {
        commit(Mutations.SET_TIMEZONE, timezone);
    },
    [Actions.EXPORT_DATA]({ state }) {
        const raw = state.raw;
        console.log('raw:', raw.length);
    },
};
