import { defineStore } from 'pinia';
import axios from '~/plugins/axios.js';
import Cookie from 'js-cookie';
import lodash from 'lodash';

export const useAuth = defineStore('auth', {

	state: () => {
		return {
			_admin: {},
			_token: Cookie.get('token') ?? null,
		};
	},

	getters: {
		admin: state => state._admin,
		token: state => state._token,
	},

	actions: {
		
	}
});