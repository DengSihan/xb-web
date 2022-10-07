import { useAuth } from '~/store/company/auth.js';

const auth = async (to, from, next) => {

	await useAuth().refreshAuth();

	if (Object.keys(useAuth().company).length > 0) {
		next();
	}
	else {
		next({
			name: 'login'
		});
	}
}

export default auth;