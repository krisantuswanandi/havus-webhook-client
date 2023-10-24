<template>
  <div class="bg-gray-400">
    <div
      id="card-table-collapse-header"
      class="flex items-center bg-gray-700 px-5 py-1 text-gray-50 hover:cursor-pointer hover:bg-gray-800 focus:bg-gray-900"
      @click="toggleCollapse"
    >
      <div
        class="i-fa6-solid-angle-up transition duration-200 ease-in-out"
        :class="!collapsed ? 'rotate-180' : ''"
      />
      <span class="ml-2 font-semibold">{{ title }}</span>
    </div>

    <Collapse :collapsed="collapsed">
      <div id="card-table-collapse-body" :class="`overflow-hidden`">
        <div
          v-for="(key, i) in Object.keys(data)"
          :key="i"
          class="group grid grid-cols-4 bg-white px-5 py-1 hover:cursor-pointer hover:bg-slate-200"
        >
          <div class="flex">
            <span class="text-slate-400 group-hover:text-slate-600">
              {{ key }}
            </span>
          </div>

          <div class="col-span-3">
            <p class="break-words text-slate-600">
              {{ joinValue(data[key]) }}
            </p>
          </div>
        </div>
      </div>
    </Collapse>
  </div>
</template>

<script>
import Collapse from "./Collapse.vue";

export default {
  name: "CardTableCollapseComponent",
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
  computed: {},
  methods: {
    joinValue(arr) {
      if (!arr) return false;

      return arr.join(", ");
    },
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>
