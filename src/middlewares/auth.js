import { useAuth } from '~/stores/auth.js';

const auth = async (to, from, next) => {

	await useAuth().refreshAuth();

	if (Object.keys(useAuth().user).length > 0) {
		next();
	}
	else {
		next({
			name: 'login',
            query: {
                redirect: to.fullPath
            }
		});
	}
}

export default auth;