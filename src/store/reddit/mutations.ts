import { MutationTree } from 'vuex';
import { RedditState, Mutations } from './@types';
export const mutations: MutationTree<RedditState> = {
    [Mutations.ADD_POSTS]: (state, posts) =>
        (state.posts = state.posts.concat(posts)),
    [Mutations.ADD_RAW_POSTS]: (state, posts) =>
        (state.raw = state.raw.concat(posts)),
    [Mutations.CLEAR_DATA]: (state) => (state.posts = []),
    [Mutations.SET_STATUS]: (state, status) => (state.started = status),
    [Mutations.SET_TIMEZONE]: (state, timezone) => (state.timezone = timezone),
};
