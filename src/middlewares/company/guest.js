import { useAuth } from '~/store/company/auth.js';

const guest = async (to, from, next) => {

	await useAuth().refreshAuth();

	if (Object.keys(useAuth().company).length > 0) {
		next({
			name: 'index'
		});
	}
	else {
		next();
	}
}

export default guest;