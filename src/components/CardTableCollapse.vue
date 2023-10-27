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

    <AppCollapse :collapsed="collapsed">
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
              {{ getValue(data[key]) }}
            </p>
          </div>
        </div>
      </div>
    </AppCollapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppCollapse from "./AppCollapse.vue";

type DataValue = string[] | string;

defineProps<{
  title: string;
  data: Record<string, DataValue>;
}>();

const collapsed = ref(false);

function getValue(value: DataValue) {
  if (Array.isArray(value)) {
    return value.join(", ") || "-";
  }

  // in case there's a non-string value
  return value.toString();
}

function toggleCollapse() {
  collapsed.value = !collapsed.value;
}
</script>
