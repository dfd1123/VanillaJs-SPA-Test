import { Store } from '@/core/Store.js';

export const store = (component) => new Store({
    component: component || {},

    state: {
        loading: false
    },

    mutations: {
        SET_LOADING (state, payload) {
            state.loading = payload;
        }
    },

});