<template>
  <div>
    <div
      id="card-table-collapse-header"
      class="flex items-center px-5 py-1 bg-gray-700 hover:bg-gray-800 text-gray-50
        hover:cursor-pointer focus:bg-gray-900"
      @click="toggleCollapse"
    >
      <FontAwesomeIcon
        icon="angle-up"
        :class="`transition ease-in-out duration-200 ${!collapsed ? 'rotate-180' : ''}`"
      />
      <span class="ml-2 font-semibold">{{ title }}</span>

      <label for="json-format" class="flex items-center ml-auto">
        <input
          v-model="jsonFormat"
          id="json-format"
          class="w-3 h-3"
          name="json-format"
          type="checkbox"
        >
        <span class="font-semibold ml-1">Format JSON</span>
      </label>
    </div>

    <Collapse :collapsed="collapsed">
      <div id="card-table-collapse-body" class="overflow-hidden px-5 py-1">
        <pre v-if="jsonFormat">{{ data }}</pre>
        <p v-else class="text-slate-600">{{ data }}</p>
      </div>
    </Collapse>
  </div>
</template>

<script>
import Collapse from './Collapse.vue';

export default {
  name: 'CardCollapseComponent',
  components: { Collapse },
  props: {
    title: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      jsonFormat: false,
      collapsed: false,
    };
  },
  computed: {
  },
  methods: {
    joinValue(arr) {
      if (!arr) return false;

      return arr.join(', ');
    },
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>
