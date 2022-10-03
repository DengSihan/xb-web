import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';

// vite 不支持多 / 的动态引入
// https://github.com/vitejs/vite/issues/4945
const page = path => () => import(`./pages/${path}.vue`);

const routes = [
	
	{
		path: '/',
		name: 'index',
		component: page('index'),
	},

	{
		path: '/login',
		name: 'login',
		component: page('login'),
	},

];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	NProgress.start();
	next();
});
router.afterEach(transition => {
	NProgress.done();
});


export default router;