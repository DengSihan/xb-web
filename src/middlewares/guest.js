import { useAuth } from '~/stores/auth.js';

const guest = async (to, from, next) => {

	await useAuth().refreshAuth();

	if (Object.keys(useAuth().user).length > 0) {
		next({
			name: 'index'
		});
	}
	else {
		next();
	}
}

export default guest;