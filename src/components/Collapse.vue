<template>
  <transition @enter="enter" @after-enter="afterEnter" @leave="leave">
    <div v-if="!collapsed">
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: "CollapseComponent",
  props: {
    collapsed: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    enter(element) {
      element.style.height = "auto";

      const { height } = getComputedStyle(element);

      element.style.height = 0;

      // Force repaint to make sure the
      // animation is triggered correctly.
      // getComputedStyle(element).height;

      // Trigger the animation.
      // We use `requestAnimationFrame` because we need
      // to make sure the browser has finished
      // painting after setting the `height`
      // to `0` in the line above.
      requestAnimationFrame(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = "auto";
    },
    leave(element) {
      const { height } = getComputedStyle(element);

      element.style.height = height;

      // Force repaint to make sure the
      // animation is triggered correctly.
      // getComputedStyle(element).height;

      requestAnimationFrame(() => {
        element.style.height = 0;
      });
    },
  },
};
</script>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  overflow: hidden;
  transition-property: height;
  transition: height 0.2s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  height: 0;
}
</style>
