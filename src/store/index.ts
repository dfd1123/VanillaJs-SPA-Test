import { Store } from '@/core/Store';

export const store = new Store({
  state: {
    loading: false,
  },

  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
  },
});
