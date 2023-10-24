import { ref } from "vue";
import { defineStore } from "pinia";

export const useRequestsStore = defineStore("requests", () => {
  const accountId = ref(null);
  const requests = ref([]);
  const loading = ref(false);

  async function getRequests(params) {
    if (!accountId.value) return;

    loading.value = true;
    const { data, error } = await fetchRequests(accountId.value, params);

    loading.value = false;
    if (!error) {
      return data;
    }
    return null;
  }

  async function getNewerRequests() {
    let params = {};
    if (requests.value.length) {
      params = { min_id: requests.value[0].id };
    }

    const result = await getRequests(params);

    if (result) {
      requests.value.unshift(...result);
    }
  }

  async function getOlderRequests() {
    let params = {};
    if (requests.value.length) {
      params = { max_id: requests.value[requests.value.length - 1].id };
    }

    const result = await getRequests(params);

    if (result) {
      requests.value.push(...result);
    }
  }

  return {
    accountId,
    requests,
    loading,
    getNewerRequests,
    getOlderRequests,
  };
});

async function fetchRequests(accountId, params = {}) {
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  const url = `${baseUrl}api/v1/admin/${accountId}/requests`;

  const query = new URLSearchParams(params);

  const response = await fetch(url + (query ? `?${query}` : ""));
  const result = await response.json();

  if (response.ok) {
    return result;
  } else {
    console.log("error:", result);
    return {
      error: "Do something here",
    };
  }
}
