<template>
  <div
    :class="`py-0.5 px-2 inline-flex items-center rounded text-xs font-bold uppercase
    ${currentVariant}`"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BadgeComponent',
  props: {
    variant: {
      type: String,
      required: false,
      default: 'blue',
    },
    rounded: Boolean,
  },
  data() {
    return {
      variantList: {
        yellow: 'text-orange-600 bg-amber-100',
        blue: 'text-white bg-blue-500',
        gray: 'text-white bg-gray-700',
        green: 'text-green-50 bg-green-500',
      },
    };
  },
  computed: {
    currentVariant() {
      return this.variantList[this.variant] || this.variantList.blue;
    },
  },
};
</script>
