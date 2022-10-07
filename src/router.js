import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';

import { getCurrentMode } from '~/plugins/mode.js';

// vite 不支持多 / 的动态引入
// https://github.com/vitejs/vite/issues/4945
const page = path => () => import(`./pages/${path}.vue`);

const routes = {};

routes['index'] = [
	{
		path: '/',
		name: 'index',
		component: () => import('~/pages/index/index.vue'),
	},
	{
		path: '/download',
		name: 'download',
		component: () => import('~/pages/index/download.vue'),
	},
	{
		path: '/win-win',
		name: 'win-win',
		component: () => import('~/pages/index/win-win.vue'),
	}
];

routes['admin'] = [
	{
		path: '/',
		name: 'index',
		component: () => import('~/pages/admin/index.vue'),
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('~/pages/admin/login.vue'),
	}
];

import guestCompany from '~/middlewares/company/guest.js';
import authCompany from '~/middlewares/company/auth.js';
routes['company'] = [
	
	{
		path: '/login',
		name: 'login',
		component: () => import('~/pages/company/login.vue'),
		beforeEnter: guestCompany,
	},

	{
		path: '/',
		component: () => import('~/pages/company/_dashboard.vue'),
		beforeEnter: authCompany,
		children: [
			{
				path: '',
				name: 'index',
				component: () => import('~/pages/company/index.vue'),
			},
			{
				path: 'stores',
				name: 'stores',
				component: () => import('~/pages/company/stores/index.vue'),
			}
		]
	},


];

const router = createRouter({
	history: createWebHistory(),
	routes: routes[getCurrentMode()]
});

router.beforeEach((to, from, next) => {
	NProgress.start();
	next();
});
router.afterEach(() => {
	NProgress.done();
});


export default router;