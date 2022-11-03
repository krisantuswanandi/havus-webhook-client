<template>
  <div class="border-y border-y-slate-300 border-l-slate-300 bg-gray-400">
    <div
      id="card-table-collapse-header"
      class="px-5 py-1 bg-gray-700 hover:bg-gray-800 text-gray-50 hover:cursor-pointer
        focus:bg-gray-900"
      @click="toggleCollapse"
    >
      <FontAwesomeIcon
        icon="angle-up"
        :class="`transition ease-in-out duration-200 ${!collapsed ? 'rotate-180' : ''}`"
      />
      <span class="ml-2 font-semibold">{{ title }}</span>
    </div>

    <Collapse :collapsed="collapsed">
      <div id="card-table-collapse-body" :class="`overflow-hidden`">
        <div
          v-for="(key, i) in Object.keys(data)"
          :key="i"
          class="group grid grid-cols-4 px-5 py-1 bg-white hover:bg-slate-200 hover:cursor-pointer"
        >
          <div class="flex">
            <span class="text-slate-400 group-hover:text-slate-600">{{ key }}</span>
          </div>

          <div class="col-span-3">
            <p class="break-words text-slate-600">{{ joinValue(data[key]) }}</p>
          </div>
        </div>
      </div>
    </Collapse>
  </div>
</template>

<script>
import Collapse from './Collapse.vue';

export default {
  name: 'CardTableCollapseComponent',
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
