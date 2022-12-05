import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';

import guest from '~/middlewares/guest.js';
import auth from '~/middlewares/auth.js';
import mode from '~/middlewares/mode.js';
import getCurrentMode from '~/plugins/mode.js';

let routes = [];

if (['admin', 'enterprise', 'company'].includes(getCurrentMode())) {
    routes = [
        {
            path: '/login',
            name: 'login',
            component: () => import('~/pages/login.vue'),
            beforeEnter: guest
        },
        {
            path: '/',
            component: () => import('~/pages/_dashboard.vue'),
            beforeEnter: auth,
            children: [
                {
                    path: '',
                    name: 'index',
                    component: () => import('~/pages/index.vue')
                },
                {
                    path: 'tokens',
                    name: 'tokens',
                    component: () => import('~/pages/tokens.vue')
                },

                {
                    path: 'audios',
                    name: 'audios',
                    component: () => import('~/pages/audios/index.vue')
                },
                {
                    path: 'audios/create',
                    name: 'audios/create',
                    component: () => import('~/pages/audios/create.vue')
                },

                {
                    path: 'enterprises',
                    name: 'enterprises',
                    component: () => import('~/pages/enterprises/index.vue'),
                    beforeEnter: mode(['admin'])
                },
                {
                    path: 'enterprises/create',
                    name: 'enterprises/create',
                    component: () => import('~/pages/enterprises/create.vue'),
                    beforeEnter: mode(['admin'])
                },
                {
                    path: 'enterprises/:enterpriseId',
                    name: 'enterprises/show',
                    component: () => import('~/pages/enterprises/show.vue'),
                    beforeEnter: mode(['admin']),
                    props: true,
                },

                {
                    path: 'companies',
                    name: 'companies',
                    component: () => import('~/pages/companies/index.vue'),
                    beforeEnter: mode(['admin', 'enterprise'])
                },
                {
                    path: 'companies/create',
                    name: 'companies/create',
                    component: () => import('~/pages/companies/create.vue'),
                    beforeEnter: mode(['admin', 'enterprise'])
                },
                {
                    path: 'companies/:companyId',
                    name: 'companies/show',
                    component: () => import('~/pages/companies/show.vue'),
                    beforeEnter: mode(['admin', 'enterprise']),
                    props: true,
                },

                {
                    path: 'stores',
                    name: 'stores',
                    component: () => import('~/pages/stores/index.vue'),
                    beforeEnter: mode(['admin', 'enterprise', 'company'])
                },
                {
                    path: 'stores/create',
                    name: 'stores/create',
                    component: () => import('~/pages/stores/create.vue'),
                    beforeEnter: mode(['admin', 'enterprise', 'company'])
                },
                {
                    path: 'stores/:storeId',
                    name: 'stores/show',
                    component: () => import('~/pages/stores/show.vue'),
                    beforeEnter: mode(['admin', 'enterprise', 'company']),
                    props: true,
                },

                {
                    path: 'playlists',
                    name: 'playlists',
                    component: () => import('~/pages/playlists/index.vue'),
                    beforeEnter: mode(['admin', 'enterprise', 'company'])
                },
                {
                    path: 'playlists/create',
                    name: 'playlists/create',
                    component: () => import('~/pages/playlists/create.vue'),
                    beforeEnter: mode(['admin', 'enterprise', 'company'])
                },
                {
                    path: 'playlists/:playlistId',
                    name: 'playlists/show',
                    component: () => import('~/pages/playlists/show.vue'),
                    beforeEnter: mode(['admin', 'enterprise', 'company']),
                    props: true,
                },

                
            ]
        },
    ];
}
else {
    routes = [];
}

let router = createRouter({
	history: createWebHistory(),
	routes: [
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: () => import('~/pages/404.vue')
        },
        ...routes
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