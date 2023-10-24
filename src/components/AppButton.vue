<template>
  <button
    :to="to"
    :disabled="disabled"
    class="flex items-center rounded focus:outline-none focus:ring"
    :class="`${classSizeForButton} ${classColorForButton} ${
      rounded && 'rounded-full'
    }`"
  >
    <div
      v-if="icon"
      class="mr-1 text-white"
      :class="`${icon} ${classSizeForIcon} ${iconSpin ? 'animate-spin' : ''}`"
    />
    <span>
      <slot />
    </span>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: null,
  },
  to: {
    type: String,
    default: "#",
  },
  variant: {
    type: String,
    default: "blue",
  },
  size: {
    type: String,
    default: "md",
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  iconSpin: {
    type: Boolean,
    default: false,
  },
});

const colorList = {
  blue: {
    enabled: "text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-200",
    disabled: "text-white bg-blue-200 hover:bg-blue-200 focus:ring-blue-100",
  },
  gray: {
    enabled: "text-white bg-gray-700 hover:bg-gray-800 focus:ring-gray-200",
    disabled: "text-white bg-gray-700 hover:bg-gray-800 focus:ring-gray-200",
  },
  red: {
    enabled: "text-white bg-red-500 hover:bg-red-600 focus:ring-red-200",
    disabled: "text-white bg-red-700 hover:bg-red-800 focus:ring-red-200",
  },
};

const buttonSizeList = {
  sm: "py-1 px-3 text-xs",
  md: "py-2 px-4 text-sm",
};

const iconSizeList = {
  sm: "h-3 w-3",
  md: "h-5 w-5",
};

const status = computed(() => {
  if (props.disabled) return "disabled";
  return "enabled";
});

const classSizeForButton = computed(() => {
  return buttonSizeList[props.size];
});

const classColorForButton = computed(() => {
  return colorList[props.variant][status.value];
});

const classSizeForIcon = computed(() => {
  return iconSizeList[props.size];
});
</script>
