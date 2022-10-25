<!-- Please remove this file from your project -->
<template>
  <header class="bg-gray-blue-900 py-3 fixed z-50 w-full text-white">
    <div class="mx-7 flex items-center justify-between flex-wrap">
      <router-link class="mr-5" to="/">
        <span class="text-3xl font-semibold">Webhook</span>
        <span class="ml-2 font-extralight text-sm">by Wadaw</span>
      </router-link>

      <!-- TODO: -->
      <!-- <div class="block md:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded border-gray-400 text-gray-400"
          @click="toggle"
        >
          <FontAwesomeIcon :icon="['fas', 'bars']" />
        </button>
      </div> -->

      <!-- <div
        :class="`w-full flex-grow md:flex md:items-center md:w-auto ${open ? 'block': 'hidden'}`"
      >
        <div class="text-sm items-end md:flex-grow first:mt-3 md:first:mt-0">
          <router-link
            v-for="(link, i) in links" :key="i"
            :class="`text-gray-100 tracking-wider no-underline block pl-0 pb-0 pr-9 md:inline-block
              ${link.path == $route.path ? 'font-bold' : ''}`"
            @click="toggle"
            :to="link.path"
          >
            {{ link.text }}
          </router-link>
        </div>
      </div> -->
    </div>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      open: false,
      links: [
        { path: '/', text: 'Home' },
        { path: '/about', text: 'About' },
      ],
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>
