import axios from 'axios';

import { createStore } from 'vuex';
import {
  REPLACE_ALL_REQUESTS,
  APPEND_REQUESTS,
  PREPEND_REQUESTS,
  LOADING,
  SET_ACCOUNT_ID,
} from './mutation-types';

export default createStore({
  state: {
    loading: false,
    accountId: null,
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
    SET_ACCOUNT_ID(state, payload) {
      state.accountId = payload;
    },
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
    setAccountId(context, accountId) {
      context.commit(SET_ACCOUNT_ID, accountId);
    },
    getAllRequests(context) {
      const { accountId } = context.state;
      if (!accountId) return;

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
      const { accountId } = context.state;
      if (!accountId) return;

      context.commit(LOADING, true);

      const queryParams = `max_id=${context.getters.oldestId}`;

      let url = `${context.state.serverUrl}api/v1/admin`;
      url    += `/${accountId}/requests?${queryParams}`;

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
      const { accountId } = context.state;
      if (!accountId) return;

      context.commit(LOADING, true);

      const queryParams = `min_id=${context.getters.newestId}`;

      let url = `${context.state.serverUrl}api/v1/admin`;
      url    += `/${accountId}/requests?${queryParams}`;

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
