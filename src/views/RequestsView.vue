<template>
  <div id="dashboard" class="relative flex h-screen text-sm text-gray-700">
    <!-- --------------------- LEFTBAR - START --------------------- -->
    <div
      id="leftbar"
      class="flex w-72 flex-col overflow-y-scroll border-r border-r-slate-300 bg-slate-100"
    >
      <div class="sticky top-0 bg-slate-100">
        <div id="header-logo" class="top-0 flex items-center px-5 py-3">
          <router-link to="/" class="flex items-center justify-between">
            <img src="@/assets/logo.png" class="mr-2 h-9" alt="logo" />

            <div>
              <span class="text-xl font-semibold">Webhook</span>
              <span class="ml-1 text-xs font-extralight">by Wadaw</span>
            </div>
          </router-link>
        </div>

        <div
          id="header-request-list"
          class="flex items-center justify-between border-y border-y-slate-300 bg-slate-200 px-5 py-1"
        >
          <div class="flex items-center">
            <p class="font-semibold">REQUEST ({{ requests?.length || 0 }})</p>
            <div class="i-fa6-solid-rotate ml-1 h-3 w-3 animate-spin" />
          </div>

          <AppButton
            size="sm"
            variant="gray"
            :disabled="loading"
            :icon="loading ? 'i-fa6-solid-spinner' : null"
            :icon-spin="true"
            @click="getNewerRequests"
          >
            Load
          </AppButton>
        </div>
      </div>

      <div
        v-for="(request, i) in requests"
        :key="i"
        class="px-5 py-3 first:mt-24 hover:cursor-pointer"
        :class="
          selectedData.id == request.id
            ? ' bg-gray-700 text-white'
            : 'text-gray-700 hover:bg-slate-200'
        "
        @click="selectData(request)"
      >
        <div class="flex flex-nowrap items-center">
          <AppBadge variant="yellow" class="font-bold">
            {{ request.method }}
          </AppBadge>
          <span class="ml-1 text-sm leading-3">
            #{{ request.id.slice(0, 6) }}
          </span>
          <span class="ml-1 overflow-hidden text-ellipsis text-sm leading-3">
            {{ request.ip_address }}
          </span>
        </div>

        <div class="mt-2">
          {{ formatDate(request.created_at) }}
        </div>
      </div>

      <AppButton
        class="mx-auto my-2"
        size="sm"
        :disabled="loading"
        variant="gray"
        :icon="loading ? 'i-fa6-solid-spinner' : null"
        :icon-spin="true"
        @click="getOlderRequests"
      >
        Load Older
      </AppButton>
    </div>
    <!-- --------------------- LEFTBAR - END --------------------- -->

    <!-- --------------------- CONTENT - START --------------------- -->
    <div id="content" class="flex w-full flex-col overflow-y-scroll">
      <div
        id="content-header"
        class="flex items-center border-b border-b-slate-300 px-5 py-3"
      >
        <div id="title-content" class="flex items-center">
          <div
            v-if="Object.keys(selectedData).length > 0"
            class="i-fa6-solid-angle-left h-7 text-xl hover:cursor-pointer active:text-gray-700"
            @click="() => (selectedData = {})"
          />
          <span class="ml-3 text-lg">{{ selectedData.id }}</span>
        </div>

        <AppButton class="ml-auto" variant="gray" icon="i-fa6-solid-crown">
          Upgrade
        </AppButton>

        <div
          id="profile"
          class="ml-3 flex items-center justify-center rounded border border-slate-200 px-3 py-1 hover:cursor-pointer hover:bg-slate-100 active:bg-slate-200"
        >
          <div
            id="profile-pic"
            class="flex h-8 w-8 items-center justify-center overflow-hidden rounded rounded-full bg-slate-300"
          >
            <div class="i-fa6-solid-crown h-5 text-2xl text-orange-500" />
          </div>

          <span class="ml-2 font-semibold">King Doe</span>
        </div>
      </div>

      <div
        v-if="Object.keys(selectedData).length > 0"
        id="content-body-overview"
        class="flex px-5 py-3"
      >
        <div class="grid grow grid-cols-8">
          <div class="mb-3">
            <AppBadge variant="yellow">
              {{ selectedData.method }}
            </AppBadge>
          </div>
          <span class="col-span-7">{{ selectedData.url }}</span>

          <span class="text-slate-400">Host</span>
          <span class="col-span-7">{{ selectedData.ip_address }}</span>

          <span class="text-slate-400">Date</span>
          <span class="col-span-7">{{ selectedData.created_at }}</span>
        </div>

        <AppButton
          class="mt-auto"
          size="md"
          variant="red"
          icon="i-fa6-solid-trash"
        >
          Delete
        </AppButton>
      </div>

      <div
        v-if="Object.keys(selectedData).length > 0"
        id="content-body"
        class="grid grid-cols-2"
      >
        <CardTableCollapse
          title="Headers"
          :data="parseJson(selectedData.raw_headers)"
          class="border-y border-y-slate-300"
        />
        <CardTableCollapse
          title="Query Strings"
          :data="parseJson(selectedData.raw_query_strings)"
          class="border-y border-l border-y-slate-300 border-l-slate-300"
        />
        <CardCollapse
          title="Raw Body"
          class="col-span-2 border-b border-b-slate-300"
          :data="parseJson(selectedData.raw_body)"
        />
      </div>

      <div
        id="advertisment"
        class="mt-auto flex items-center justify-center p-4"
      >
        <div
          id="ads-box"
          class="flex h-20 w-3/5 items-center justify-center rounded bg-slate-300"
        >
          <p class="animate-bounce text-lg font-semibold">ADVERTISEMENT</p>
        </div>
      </div>
    </div>
    <!-- --------------------- CONTENT - END --------------------- -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useRequestsStore } from "@/store/requests";
import AppButton from "@/components/AppButton.vue";
import AppBadge from "@/components/AppBadge.vue";
import CardTableCollapse from "@/components/CardTableCollapse.vue";
import CardCollapse from "@/components/CardCollapse.vue";

const store = useRequestsStore();
const { getNewerRequests, getOlderRequests } = store;
const { accountId, requests, loading } = storeToRefs(store);

const route = useRoute();
accountId.value = route.params.accountId;
getOlderRequests();

const selectedData = ref({});

function formatDate(dateStr) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const formatted = new Intl.DateTimeFormat("en-US", options).format(
    new Date(dateStr),
  );

  return formatted.replace(",", "");
}

function selectData(newVal) {
  selectedData.value = newVal;
}

function parseJson(data) {
  if (!data) return "";

  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
}
</script>
