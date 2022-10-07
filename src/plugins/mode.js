const getCurrentMode = () => {

	let { hostname } = window.location;

	return hostname === import.meta.env.VITE_APP_HOST
		? 'index'
		: hostname.split('.')[0];
}

import { useAuth as useCompanyAuth } from '~/store/company/auth.js';
import { useAuth as useAdminAuth } from '~/store/admin/auth.js';

const useAuth = getCurrentMode === 'company'
	? useCompanyAuth
	: useAdminAuth;

export { getCurrentMode, useAuth };
