import { useAuth } from '~/store/admin/auth.js';

const auth = async (to, from, next) => {

	await useAuth().refreshAuth();

	if (Object.keys(useAuth().admin).length > 0) {
		next();
	}
	else {
		next({
			name: 'login'
		});
	}
}

export default auth;