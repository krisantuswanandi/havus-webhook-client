<!-- Please remove this file from your project -->
<template>
  <header class="fixed z-50 w-full bg-gray-900 py-2 text-white">
    <div class="mx-5 flex flex-wrap items-center justify-between">
      <div class="flex items-center justify-between">
        <img src="@/assets/logo.png" class="h-9" alt="logo" />

        <router-link class="ml-3" to="/">
          <span class="text-xl font-semibold">Webhook</span>
          <span class="ml-1 text-xs font-extralight">by Wadaw</span>
        </router-link>
      </div>

      <!-- TODO: -->
      <div class="block md:hidden">
        <button
          class="flex items-center rounded border border-gray-400 px-3 py-2 text-gray-400"
          @click="toggle"
        >
          <FontAwesomeIcon :icon="['fas', 'bars']" />
        </button>
      </div>
      <div
        :class="`w-full flex-grow md:flex md:w-auto md:items-center ${
          open ? 'block' : 'hidden'
        }`"
      >
        <div class="items-end text-sm first:mt-3 md:flex-grow md:first:mt-0">
          <router-link
            v-for="(link, i) in links"
            :key="i"
            :class="`block pb-0 pl-0 pr-9 tracking-wider text-gray-100 no-underline md:inline-block
              ${link.path == route.path ? 'font-bold' : ''}`"
            :to="link.path"
            @click="toggle"
          >
            {{ link.text }}
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const links = [
  { path: "/", text: "Home" },
  { path: "/about", text: "About" },
];

const open = ref(false);
function toggle() {
  open.value = !open.value;
}
</script>
