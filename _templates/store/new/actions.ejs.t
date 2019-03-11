---
to: src/store/<%= name %>/actions.ts
---
import { ActionTree } from 'vuex';
import { RootState } from './../@types';
import { <%= Name %>State, Mutations, Actions } from './@types';
export const actions: ActionTree<<%= Name %>State, RootState> = {
    
};
