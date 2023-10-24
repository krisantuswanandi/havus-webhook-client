import { createStore } from "vuex";
import {
  REPLACE_ALL_REQUESTS,
  APPEND_REQUESTS,
  PREPEND_REQUESTS,
  PREPEND_REQUEST,
  LOADING,
  SET_ACCOUNT_ID,
} from "./mutation-types";

export default createStore({
  state: {
    loading: false,
    accountId: null,
    serverUrl: import.meta.env.VITE_SERVER_URL,
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
    PREPEND_REQUEST(state, payload) {
      if (!payload) return;
      state.requests.unshift(payload);
    },
  },
  actions: {
    setAccountId(context, accountId) {
      context.commit(SET_ACCOUNT_ID, accountId);
    },
    async getAllRequests(context) {
      const { accountId } = context.state;
      if (!accountId) return;

      context.commit(LOADING, true);

      const response = await fetch(
        `${context.state.serverUrl}api/v1/admin/${context.state.accountId}/requests`,
      );
      const result = await response.json();

      if (response.ok) {
        context.commit(REPLACE_ALL_REQUESTS, result.data);
      } else {
        console.log(result);
      }

      context.commit(LOADING, false);
    },
    async getOlderRequests(context) {
      const { accountId } = context.state;
      if (!accountId) return;

      context.commit(LOADING, true);

      const queryParams = `max_id=${context.getters.oldestId}`;

      let url = `${context.state.serverUrl}api/v1/admin`;
      url += `/${accountId}/requests?${queryParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.ok) {
        context.commit(APPEND_REQUESTS, result.data);
      } else {
        console.log("DO SOMETHING HERE LATER!", result);
      }

      context.commit(LOADING, false);
    },
    addNewRequest(context, newData) {
      context.commit(PREPEND_REQUEST, newData);
    },
    async getNewerRequests(context) {
      const { accountId } = context.state;
      if (!accountId) return;

      context.commit(LOADING, true);

      const queryParams = `min_id=${context.getters.newestId}`;

      let url = `${context.state.serverUrl}api/v1/admin`;
      url += `/${accountId}/requests?${queryParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.ok) {
        context.commit(PREPEND_REQUESTS, result.data);
      } else {
        console.log("DO SOMETHING HERE LATER!", result);
      }

      context.commit(LOADING, false);
    },
  },
  modules: {},
});
