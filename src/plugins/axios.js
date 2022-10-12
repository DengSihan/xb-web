import axios from 'axios';
import router from '~/router.js';
import { useAuth } from '~/plugins/mode.js';

axios.defaults.baseURL = `/api`;

// before sending the request
axios.interceptors.request.use(
	config => {

		let token = useAuth().token;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	error => {
		
		return Promise.reject(error);
	}
);

// after getting the response
axios.interceptors.response.use(
	response => {

		return response;
	},
	error => {

		let { response } = error;

		if (response.status === 401) {
			useAuth().clearAuth();


			router.push({
				name: 'login'
			});
		}

		return Promise.reject(error);
	}
);

export default axios;