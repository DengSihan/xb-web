import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';

import guestCompany from '~/middlewares/company/guest.js';
import authCompany from '~/middlewares/company/auth.js';

import guestAdmin from '~/middlewares/admin/guest.js';
import authAdmin from '~/middlewares/admin/auth.js';

// vite 不支持多 / 的动态引入
// https://github.com/vitejs/vite/issues/4945
const page = path => () => import(`./pages/${path}.vue`);


let routes = [],
	mode = window.location.host.split('.')[0];

if (mode === 'company') {
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
			path: '/login',
			name: 'login',
			component: () => import('~/pages/admin/login.vue'),
			beforeEnter: guestAdmin,
		},

		{
			path: '/',
			component: () => import('~/pages/admin/_dashboard.vue'),
			beforeEnter: authAdmin,
			children: [

				{
					path: '',
					name: 'index',
					component: () => import('~/pages/admin/index.vue'),
				},

				{
					path: 'companies',
					name: 'companies',
					component: () => import('~/pages/admin/companies/index.vue'),
				},
				{
					path: 'companies/create',
					name: 'companies/create',
					component: () => import('~/pages/admin/companies/create.vue'),
				},
				{
					path: 'companies/:companyId',
					component: () => import('~/pages/admin/companies/show.vue'),
					props: true,
					children: [
						{
							path: '',
							name: 'companies/show',
							component: () => import('~/pages/admin/companies/show/index.vue'),
						},
						{
							path: 'edit',
							name: 'companies/show/edit',
							component: () => import('~/pages/admin/companies/show/edit.vue'),
						},
					]
				},

				{
					path: 'stores',
					name: 'stores',
					component: () => import('~/pages/admin/stores/index.vue'),
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
					component: () => import('~/pages/admin/playlists/index.vue'),
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
							component: () => import('~/pages/admin/playlists/show/stores.vue'),
						},
						{
							path: 'edit',
							name: 'playlists/show/edit',
							component: () => import('~/pages/company/playlists/show/edit.vue'),
						},
					]
				},
	
				{
					path: 'tokens',
					name: 'tokens',
					component: () => import('~/pages/commons/tokens.vue'),
				},
			]
		},
	];
}
else {
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