---
to: src/store/<%= name %>/getters.ts
---
import { GetterTree } from 'vuex';
import { RootState } from './../@types';
import { <%= Name %>State } from './@types';
export const getters: GetterTree<<%= Name %>State, RootState> = {
    
};
