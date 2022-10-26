<template>
  <button
    :to="to"
    :disabled="disabled"
    :class="`inline-flex items-center ${classSizeForButton} focus:outline-none
      focus:ring ${classColorForButton} rounded ${rounded && 'rounded-full'}`"
  >
    <FontAwesomeIcon
      v-if="icon"
      size="xs"
      :icon="icon"
      :class="`mr-1 animate-spin ${classSizeForIcon}`"
    />
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
    to: {
      type: String,
      required: false,
      default: '#',
    },
    variant: {
      type: String,
      required: false,
      default: 'blue',
    },
    size: {
      type: String,
      required: false,
      default: 'md',
    },
    rounded: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      colorList: {
        blue: {
          enabled: 'text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-200',
          disabled: 'text-white bg-blue-200 hover:bg-blue-200 focus:ring-blue-100',
        },
        gray: {
          enabled: 'text-white bg-gray-700 hover:bg-gray-800 focus:ring-gray-200',
          disabled: 'text-white bg-gray-700 hover:bg-gray-800 focus:ring-gray-200',
        },
      },
      buttonSizeList: {
        sm: 'py-1 px-3 text-xs',
        md: 'py-2 px-5 text-sm',
      },
      iconSizeList: {
        sm: 'h-3 w-3',
        md: 'h-5 w-5',
      },
    };
  },
  computed: {
    status() {
      if (this.disabled) return 'disabled';
      return 'enabled';
    },
    classSizeForButton() {
      return this.buttonSizeList[this.size] || this.buttonSizeList.md;
    },
    classColorForButton() {
      return this.colorList[this.variant][this.status] || this.colorList.blue[this.status];
    },
    classSizeForIcon() {
      return this.iconSizeList[this.size] || this.iconSizeList.md;
    },
  },
};
</script>

<style>

</style>
