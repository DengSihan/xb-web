import '~/assets/index.scss';

// @mdi/font
import '@mdi/font/css/materialdesignicons.min.css';

import { createApp } from 'vue';
import App from '~/App.vue';

import xiangdui from 'xb-design';
import router from '~/router.js';

const app = createApp(App)
	.use(xiangdui)
	.use(router)
	.mount('#app');