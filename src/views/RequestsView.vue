<template>
  <div id="dashboard" class="h-screen relative flex text-sm text-gray-700">
    <!-- --------------------- LEFTBAR - START --------------------- -->
    <div
      id="leftbar"
      class="w-72 bg-slate-100 border-r border-r-slate-300 overflow-y-scroll flex flex-col"
    >
      <div class="sticky top-0 bg-slate-100">
        <div id="header-logo" class="top-0 px-5 py-3 flex items-center">
          <router-link to="/" class="flex items-center justify-between">
            <img src="@/assets/logo.png" class="h-9 mr-2" alt="logo"/>

            <div>
              <span class="text-xl font-semibold">Webhook</span>
              <span class="ml-1 font-extralight text-xs">by Wadaw</span>
            </div>
          </router-link>
        </div>

        <div
          id="header-request-list"
          class="px-5 py-1 flex justify-between items-center border-y border-y-slate-300
            bg-slate-200"
        >
          <div class="flex items-center">
            <p class="font-semibold">REQUEST ({{ requests?.length || 0 }})</p>
            <FontAwesomeIcon
              size="xs"
              icon="rotate"
              class="ml-1 animate-spin h-3 w-3"
            />
          </div>

          <Button
            size="sm"
            variant="gray"
            :disabled="loading"
            :icon="loading ? 'spinner' : null"
            :iconSpin="true"
            @click="getNewerRequests"
          >
            Load
          </Button>
        </div>
      </div>

      <div
        v-for="(request, i) in requests"
        :key="i"
        :class="`first:mt-24 px-5 py-3 hover:cursor-pointer
        ${selectedData.id == request.id ?
            ' bg-gray-700 text-white' :
            'text-gray-700 hover:bg-slate-200'
        }`"
        @click="selectData(request)"
      >
        <div class="flex flex-nowrap items-center">
          <Badge variant="yellow" class="font-bold">{{ request.method }}</Badge>
          <span class="text-sm ml-1 leading-3">#{{ request.id.slice(0,6) }}</span>
          <span class="text-sm ml-1 leading-3 text-ellipsis overflow-hidden">
            {{ request.ip_address }}
          </span>
        </div>

        <div class="mt-2">{{ formatDate(request.created_at) }}</div>
      </div>

      <Button
        class="mx-auto my-2" size="sm" :disabled="loading"
        variant="gray"
        @click="getOlderRequests"
        :icon="loading ? 'spinner' : null"
        :iconSpin="true"
      >
        Load Older
      </Button>
    </div>
    <!-- --------------------- LEFTBAR - END --------------------- -->

    <!-- --------------------- CONTENT - START --------------------- -->
    <div id="content" class="w-full overflow-y-scroll flex flex-col">
      <div id="content-header" class="px-5 py-3 flex items-center border-b border-b-slate-300">
        <div
          id="title-content"
          class="flex items-center"
        >
          <FontAwesomeIcon
            v-if="Object.keys(selectedData).length > 0"
            size="xs"
            icon="angle-left"
            class="h-7 hover:cursor-pointer active:text-gray-700"
            @click="() => selectedData = {}"
          />
          <span class="ml-3 text-lg">{{ selectedData.id }}</span>
        </div>

        <Button class="ml-auto" variant="gray" icon="crown">Upgrade</Button>

        <div
          id="profile"
          class="ml-3 px-3 py-1 flex items-center justify-center rounded border border-slate-200
            hover:cursor-pointer hover:bg-slate-100 active:bg-slate-200"
        >
          <div
            id="profile-pic"
            class="rounded rounded-full bg-slate-300 h-8 w-8
              flex items-center justify-center overflow-hidden"
          >
            <FontAwesomeIcon
              size="xs"
              icon="crown"
              class="h-5 text-orange-500"
            />
          </div>

          <span class="ml-2 font-semibold">King Doe</span>
        </div>
      </div>

      <div
        v-if="Object.keys(selectedData).length > 0"
        id="content-body-overview"
        class="flex px-5 py-3"
      >
        <div class="grow grid grid-cols-8">
          <div class="mb-3"><Badge variant="yellow">{{ selectedData.method }}</Badge></div>
          <span class="col-span-7">{{ selectedData.url }}</span>

          <span class="text-slate-400">Host</span>
          <span class="col-span-7">{{ selectedData.ip_address }}</span>

          <span class="text-slate-400">Date</span>
          <span class="col-span-7">{{ selectedData.created_at }}</span>
        </div>

        <Button class="mt-auto" size="xl" variant="red" icon="trash">Delete</Button>
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
          class="border-y border-y-slate-300 border-l border-l-slate-300"
        />
        <CardCollapse
          title="Raw Body"
          class="col-span-2 border-b border-b-slate-300"
          :data="parseJson(selectedData.raw_body)"
        />
      </div>

      <div id="advertisment" class="p-4 flex items-center justify-center mt-auto">
        <div id="ads-box" class="bg-slate-300 rounded h-20 w-3/5 flex items-center justify-center">
          <p class="animate-bounce text-lg font-semibold">ADVERTISEMENT</p>
        </div>
      </div>
    </div>
    <!-- --------------------- CONTENT - END --------------------- -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Button from '../components/Button.vue';
import Badge from '../components/Badge.vue';
import CardTableCollapse from '../components/CardTableCollapse.vue';
import CardCollapse from '../components/CardCollapse.vue';

export default {
  name: 'RequestsView',
  components: {
    Badge,
    Button,
    CardCollapse,
    CardTableCollapse,
  },
  data() {
    return {
      selectedData: {},
    };
  },
  beforeCreate() {
    this.$store.dispatch('setAccountId', this.$route.params.accountId);
  },
  mounted() {
    if (this.requests.length === 0) {
      this.getAllRequests();
    }
  },
  computed: {
    ...mapState(['requests', 'loading']),
  },
  methods: {
    ...mapActions({
      getAllRequests: 'getAllRequests', // map `this.getAllRequests()` to `this.$store.dispatch('getAllRequests')`
      getOlderRequests: 'getOlderRequests',
      getNewerRequests: 'getNewerRequests',
      addNewRequest: 'addNewRequest',
    }),
    formatDate(dateStr) {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };

      const formatted = new Intl.DateTimeFormat('en-US', options).format(new Date(dateStr));

      return formatted.replace(',', '');
    },
    selectData(newVal) {
      this.selectedData = newVal;
    },
    requestDetailTranslator(data) {
      return {
        [data.method]: data.hostname,
        Host: data.ip_address,
        Date: data.created_at,
        // TODO: Size: data.size,
        ID: data.id,
      };
    },
    parseJson(data) {
      if (!data) return '';

      try {
        return JSON.parse(data);
      } catch (e) {
        return data;
      }
    },
  },
};
</script>
