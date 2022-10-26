import { createApp }            from 'vue';
import { faSpinner, faRotate }            from '@fortawesome/free-solid-svg-icons';
import { library }              from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon }      from '@fortawesome/vue-fontawesome';

import App    from './App.vue';
import router from './router';
import store  from './store';

import './registerServiceWorker';
import './assets/tailwind.css';

library.add(faSpinner);
library.add(faRotate);

createApp(App)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount('#app');
