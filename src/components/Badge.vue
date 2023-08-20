<template>
  <div
    :class="`py-[3px] px-1 inline-flex items-center rounded
      text-[0.65rem] font-bold uppercase leading-3
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
