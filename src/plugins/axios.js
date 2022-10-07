import axios from 'axios';
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

		console.error(error);
		
		return Promise.reject(error);
	}
);

// after getting the response
axios.interceptors.response.use(
	response => {

		return response;
	},
	error => {

		console.error(error);

		return Promise.reject(error);
	}
);

export default axios;