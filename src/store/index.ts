import Vue from 'vue';
import Vuex from 'vuex';
import { reddit } from './reddit';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        reddit,
    },
});
