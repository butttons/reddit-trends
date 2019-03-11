---
to: src/store/<%= name %>/index.ts
---
import { Module } from 'vuex';
import { state } from './state';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { RootState } from './../@types';
import { <%= Name %>State } from './@types';
const namespaced: boolean = true;

export const <%= name %>: Module<<%= Name %>State, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};
