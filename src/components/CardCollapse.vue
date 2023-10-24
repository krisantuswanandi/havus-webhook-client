<template>
  <div>
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

      <label for="json-format" class="ml-auto flex items-center">
        <input
          id="json-format"
          v-model="jsonFormat"
          class="h-3 w-3"
          name="json-format"
          type="checkbox"
        />
        <span class="ml-1 font-semibold">Format JSON</span>
      </label>
    </div>

    <AppCollapse :collapsed="collapsed">
      <div id="card-table-collapse-body" class="overflow-hidden px-5 py-1">
        <pre v-if="jsonFormat">{{ data }}</pre>
        <p v-else class="text-slate-600">
          {{ data }}
        </p>
      </div>
    </AppCollapse>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AppCollapse from "./AppCollapse.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

const jsonFormat = ref(false);
const collapsed = ref(false);

function toggleCollapse() {
  collapsed.value = !collapsed.value;
}
</script>
