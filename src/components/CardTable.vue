<template>
  <div>
    <div class="bg-gray-blue-50 rounded-md border border-slate-300 text-gray-blue-900">
      <div class="px-7 py-3 flex justify-between items-center">
        <h1 class="text-xl font-semibold">{{ title }}</h1>

        <label v-if="valueAsRaw" for="json-format" class="flex items-center">
          <input
            v-model="jsonFormat"
            id="json-format"
            class="w-4 h-4"
            name="json-format"
            type="checkbox"
          >
          <span class="text-lg font-semibold ml-1">Format JSON</span>
        </label>
      </div>

      <div v-if="valueAsRaw">
        <div class="px-7 py-1 bg-white font-fira-code">
          <pre v-if="jsonFormat">{{ item }}</pre>
          <span v-else>{{ item }}</span>
        </div>
      </div>

      <div v-else>
        <div
          v-for="(keyItem, i) in Object.keys(item)"
          :key="i"
          :class="`px-7 py-1 bg-white ${i % 2 != 0 ? 'bg-gray-blue-50' : ''}`"
        >
          <div class="flex">
            <div class="basis-1/4 flex items-center">
              <Badge v-if="kindOfRequestMethod(keyItem)" variant="yellow">{{ keyItem }}</Badge>
              <span v-else>{{ keyItem }}</span>
            </div>

            <div class="basis-3/4">
              <span v-if="valueAsCode" class="font-fira-code bg-slate-200 px-2 py-0.5 rounded-md">
                {{ displayAsCode(item[keyItem]) }}
              </span>
              <span v-else>{{ item[keyItem] }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import isplainobject from 'lodash.isplainobject';
import Badge from './Badge.vue';

export default {
  name: 'CardTableComponent',
  components: { Badge },
  props: {
    title: {
      type: String,
      required: true,
    },
    item: {
      type: [Object, String],
      required: true,
    },
    valueAsCode: {
      type: Boolean,
      required: false,
      default: false,
    },
    valueAsRaw: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      jsonFormat: false,
    };
  },
  computed: {
  },
  methods: {
    kindOfRequestMethod(str) {
      if (!str) return false;

      return ['post', 'get', 'put', 'delete'].includes(str.toLowerCase());
    },
    displayAsCode(data) {
      if (typeof data === 'string' || isplainobject(data)) return data;

      return data.join(', ');
    },
    displayAsJson(data) {
      try {
        console.log(JSON.stringify(data).length);
        console.log(JSON.stringify(data, null, 4).length);
        return JSON.stringify(data, null, 4);
      } catch {
        return data;
      }
    },
  },
};
</script>
