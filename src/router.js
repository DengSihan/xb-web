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

routes['company'] = [
	{
		path: '/',
		name: 'index',
		component: () => import('~/pages/company/index.vue'),
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('~/pages/company/login.vue'),
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes: routes[getCurrentMode()]
});

router.beforeEach((to, from, next) => {
	NProgress.start();
	next();
});
router.afterEach(transition => {
	NProgress.done();
});


export default router;