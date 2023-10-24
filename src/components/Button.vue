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

<script>
export default {
  name: "ButtonComponent",
  props: {
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
  },
  data() {
    return {
      colorList: {
        blue: {
          enabled:
            "text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-200",
          disabled:
            "text-white bg-blue-200 hover:bg-blue-200 focus:ring-blue-100",
        },
        gray: {
          enabled:
            "text-white bg-gray-700 hover:bg-gray-800 focus:ring-gray-200",
          disabled:
            "text-white bg-gray-700 hover:bg-gray-800 focus:ring-gray-200",
        },
        red: {
          enabled: "text-white bg-red-500 hover:bg-red-600 focus:ring-red-200",
          disabled: "text-white bg-red-700 hover:bg-red-800 focus:ring-red-200",
        },
      },
      buttonSizeList: {
        sm: "py-1 px-3 text-xs",
        md: "py-2 px-4 text-sm",
      },
      iconSizeList: {
        sm: "h-3 w-3",
        md: "h-5 w-5",
      },
    };
  },
  computed: {
    status() {
      if (this.disabled) return "disabled";
      return "enabled";
    },
    classSizeForButton() {
      return this.buttonSizeList[this.size] || this.buttonSizeList.md;
    },
    classColorForButton() {
      return (
        this.colorList[this.variant][this.status] ||
        this.colorList.blue[this.status]
      );
    },
    classSizeForIcon() {
      return this.iconSizeList[this.size] || this.iconSizeList.md;
    },
  },
};
</script>
