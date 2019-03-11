import { MutationTree } from 'vuex';
import { RedditState, Mutations } from './@types';
export const mutations: MutationTree<RedditState> = {
    [Mutations.ADD_POSTS]: (state, posts) => (state.posts = state.posts.concat(posts)),
    [Mutations.CLEAR_DATA]: (state) => (state.posts = []),
    [Mutations.SET_STATUS]: (state, status) => (state.started = status),
};
