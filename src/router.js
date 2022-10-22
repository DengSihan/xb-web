import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';

import { getCurrentMode } from '~/plugins/mode.js';

import guestCompany from '~/middlewares/company/guest.js';
import authCompany from '~/middlewares/company/auth.js';

// vite 不支持多 / 的动态引入
// https://github.com/vitejs/vite/issues/4945
const page = path => () => import(`./pages/${path}.vue`);



let routes = [],
	mode = getCurrentMode();

if (mode === 'index') {
	routes = [
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
}
else if (mode === 'company') {
	routes = [
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
					path: 'tokens',
					name: 'tokens',
					component: () => import('~/pages/commons/tokens.vue'),
				},
	
				{
					path: 'stores',
					name: 'stores',
					component: () => import('~/pages/company/stores/index.vue'),
				},
				{
					path: 'stores/create',
					name: 'stores/create',
					component: () => import('~/pages/company/stores/create.vue'),
				},
				{
					path: 'stores/:storeId',
					component: () => import('~/pages/company/stores/show.vue'),
					props: true,
					children: [
						{
							path: '',
							name: 'stores/show',
							component: () => import('~/pages/company/stores/show/index.vue'),
						},
						{
							path: 'playlists',
							name: 'stores/show/playlists',
							component: () => import('~/pages/company/stores/show/playlists.vue'),
							props: true,
						},
						{
							path: 'edit',
							name: 'stores/show/edit',
							component: () => import('~/pages/company/stores/show/edit.vue'),
							props: true,
						}
					]
				},
				
	
				{
					path: 'playlists',
					name: 'playlists',
					component: () => import('~/pages/company/playlists/index.vue'),
				},
				{
					path: 'playlists/create',
					name: 'playlists/create',
					component: () => import('~/pages/company/playlists/create.vue'),
				},
				{
					path: 'playlists/:playlistId',
					component: () => import('~/pages/company/playlists/show.vue'),
					props: true,
					children: [
						{
							path: '',
							name: 'playlists/show',
							component: () => import('~/pages/company/playlists/show/index.vue'),
						},
						{
							path: 'audios',
							name: 'playlists/show/audios',
							component: () => import('~/pages/company/playlists/show/audios.vue'),
						},
						{
							path: 'stores',
							name: 'playlists/show/stores',
							component: () => import('~/pages/company/playlists/show/stores.vue'),
						},
						{
							path: 'edit',
							name: 'playlists/show/edit',
							component: () => import('~/pages/company/playlists/show/edit.vue'),
						},
					]
				}
			]
		},
	];
}
else if (mode === 'admin') {
	routes = [
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
}

let router = createRouter({
	history: createWebHistory(),
	routes: [
		...routes,
		{
			path: '/private-policy',
			name: 'private-policy',
			component: () => import('~/pages/private-policy.vue')
		},
		{
			path: '/apps',
			name: 'apps',
			component: () => import('~/pages/apps.vue')
		},
	]
});

router.beforeEach((to, from, next) => {
	NProgress.start();
	next();
});

router.afterEach(() => {
	NProgress.done();
});

export default router;