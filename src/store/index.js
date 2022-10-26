import axios from 'axios';

import { createStore } from 'vuex';
import {
  REPLACE_ALL_REQUESTS,
  APPEND_REQUESTS,
  PREPEND_REQUESTS,
  LOADING,
} from './mutation-types';

export default createStore({
  state: {
    loading: false,
    accountId: 'billing-123',
    serverUrl: process.env.VUE_APP_SERVER_URL,
    requests: [],
  },
  getters: {
    oldestId(state) {
      const lastRequest = state.requests[state.requests.length - 1];

      if (!lastRequest) return null;
      return lastRequest.id;
    },
    newestId(state) {
      const firstRequest = state.requests[0];

      if (!firstRequest) return null;
      return firstRequest.id;
    },
  },
  mutations: {
    LOADING(state, payload) {
      state.loading = payload;
    },
    REPLACE_ALL_REQUESTS(state, payload) {
      state.requests = payload;
    },
    APPEND_REQUESTS(state, payload) {
      if (!payload) return;
      state.requests = state.requests.concat(payload);
    },
    PREPEND_REQUESTS(state, payload) {
      if (!payload) return;
      state.requests = payload.concat(state.requests);
    },
  },
  actions: {
    getAllRequests(context) {
      context.commit(LOADING, true);

      axios({
        method: 'GET',
        url: `${context.state.serverUrl}api/v1/admin/${context.state.accountId}/requests`,
      })
        .then(({ data: dataResponse }) => {
          context.commit(REPLACE_ALL_REQUESTS, dataResponse.data);
        })
        .catch(({ response }) => {
          console.log(response);
        })
        .finally(() => {
          context.commit(LOADING, false);
        });
    },
    getOlderRequests(context) {
      context.commit(LOADING, true);

      const queryParams = `max_id=${context.getters.oldestId}`;

      let url = `${context.state.serverUrl}api/v1/admin`;
      url    += `/${context.state.accountId}/requests?${queryParams}`;

      axios({
        method: 'GET',
        url,
      })
        .then(({ data: dataResponse }) => {
          context.commit(APPEND_REQUESTS, dataResponse.data);
        })
        .catch(({ response }) => {
          console.log(response, 'DO SOMETHING HERE LATER!');
        })
        .finally(() => {
          context.commit(LOADING, false);
        });
    },
    getNewerRequests(context) {
      context.commit(LOADING, true);

      const queryParams = `min_id=${context.getters.newestId}`;

      let url = `${context.state.serverUrl}api/v1/admin`;
      url    += `/${context.state.accountId}/requests?${queryParams}`;

      axios({
        method: 'GET',
        url,
      })
        .then(({ data: dataResponse }) => {
          context.commit(PREPEND_REQUESTS, dataResponse.data);
        })
        .catch(({ response }) => {
          console.log(response, 'DO SOMETHING HERE LATER!');
        })
        .finally(() => {
          context.commit(LOADING, false);
        });
    },
  },
  modules: {
  },
});
