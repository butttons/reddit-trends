import { Module } from 'vuex';
import { state } from './state';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { RootState } from './../@types';
import { RedditState } from './@types';
const namespaced: boolean = true;

export const reddit: Module<RedditState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};
