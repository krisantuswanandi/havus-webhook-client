<template>
  <div id="dashboard" class="h-screen relative flex pt-11 text-sm">
    <div
      id="leftbar"
      class="w-72 bg-gray-blue-50 border-2 border-r-slate-300 py-4 overflow-y-scroll
        flex flex-col"
    >
      <div id="header-request-list" class="px-6 mb-3 flex justify-between items-center">
        <p class="font-semibold text-gray-blue-900">REQUEST ({{requests.length}})</p>
        <Button
          size="sm"
          :disabled="loading"
          @click="getNewerRequests"
          icon="rotate"
        >Load..</Button>
      </div>

      <div
        v-for="(request, i) in requests"
        :key="i"
        :class="`px-6 py-2 hover:cursor-pointer
        ${
          selectedData.id == request.id ?
            ' bg-gray-blue-900 text-white' :
            'text-gray-blue-900 hover:bg-slate-200'
        }`"
        @click="selectData(request)"
      >
        <div>
          <Badge variant="yellow">{{ request.method }}</Badge>
          <span class="ml-1">
            #{{ request.id.slice(0,6) }} {{ request.ip_address }}
          </span>
        </div>

        <div class="mt-2">10/23/2022 10:32:37 PM</div>
      </div>

      <Button
        class="mx-auto mt-2" size="sm" :disabled="loading"
        @click="getOlderRequests"
        :icon="loading ? 'spinner' : null"
      >
        Load Older
      </Button>
    </div>

    <div id="content" class="p-5 w-full overflow-y-scroll">
      <div class="grid grid-cols-2 gap-3">
        <CardTable
          title="Request Details"
          :item="requestDetailTranslator(selectedData)"
        />
        <CardTable
          title="Headers"
          :item="parseJson(selectedData.raw_headers)"
          :value-as-code="true"
        />
        <CardTable
          title="Query strings"
          :item="parseJson(selectedData.raw_query_strings)"
          :value-as-code="true"
        />
        <CardTable
          title="Form Values"
          :item="{}"
          :value-as-code="true"
        />
        <CardTable
          title="Raw Body"
          class="col-span-2"
          :item="parseJson(selectedData.raw_body)"
          :value-as-raw="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Button from '../components/Button.vue';
import Badge from '../components/Badge.vue';
import CardTable from '../components/CardTable.vue';

export default {
  name: 'RequestsView',
  components: {
    Badge,
    Button,
    CardTable,
  },
  data() {
    return {
      selectedData: {},
    };
  },
  mounted() {
    if (this.requests.length === 0) {
      this.getAllRequests();
    }
  },
  computed: mapState(['requests', 'loading']),
  methods: {
    ...mapActions({
      getAllRequests: 'getAllRequests', // map `this.getAllRequests()` to `this.$store.dispatch('getAllRequests')`
      getOlderRequests: 'getOlderRequests',
      getNewerRequests: 'getNewerRequests',
    }),
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
