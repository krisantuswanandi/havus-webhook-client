import { createApp } from "vue";
import "@unocss/reset/tailwind.css";
import "virtual:uno.css";

import router from "./router";
import store from "./store";
import App from "./App.vue";

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
