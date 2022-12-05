import '~/assets/index.scss';

// @mdi/font
import '@mdi/font/css/materialdesignicons.min.css';

import 'xb-design/dist/style.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createMetaManager } from 'vue-meta';
import Notifications from '@kyvg/vue3-notification';

import xb from 'xb-design';
import router from '~/router.js';
import App from '~/App.vue';

createApp(App)
	.use(xb)
	.use(createPinia())
	.use(Notifications)
	.use(router)
	.use(createMetaManager())
	.mount('#app');