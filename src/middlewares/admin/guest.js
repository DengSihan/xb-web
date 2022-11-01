import { useAuth } from '~/store/admin/auth.js';

const guest = async (to, from, next) => {

	await useAuth().refreshAuth();

	if (Object.keys(useAuth().admin).length > 0) {
		next({
			name: 'index'
		});
	}
	else {
		next();
	}
}

export default guest;