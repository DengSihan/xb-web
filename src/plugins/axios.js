import axios from 'axios';
import { useRouter } from 'vue-router';
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

			let router = useRouter();
			router.push({
				name: 'login'
			});
		}

		return Promise.reject(error);
	}
);

export default axios;