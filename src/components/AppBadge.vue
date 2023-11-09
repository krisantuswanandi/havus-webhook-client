<template>
  <div
    class="inline-flex items-center rounded px-1 py-[3px] text-[0.65rem] font-bold uppercase leading-3"
    :class="currentVariant"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    variant?: "yellow" | "blue" | "gray" | "green";
    rounded?: boolean;
  }>(),
  { variant: "blue" },
);

const variantList = {
  yellow: "text-orange-600 bg-amber-100",
  blue: "text-white bg-blue-500",
  gray: "text-white bg-gray-700",
  green: "text-green-50 bg-green-500",
};

const currentVariant = computed(() => {
  return variantList[props.variant] || variantList.blue;
});
</script>
