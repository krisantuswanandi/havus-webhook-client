import { createApp }        from 'vue';
import { library }          from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon }  from '@fortawesome/vue-fontawesome';

import {
  faSpinner,
  faRotate,
  faAngleLeft,
  faCrown,
  faTrash,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons';

import App    from './App.vue';
import router from './router';
import store  from './store';

import './registerServiceWorker';
import './assets/tailwind.css';

library.add(faSpinner, faRotate, faAngleLeft, faCrown, faTrash, faAngleUp);

createApp(App)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount('#app');
