import { defineStore } from 'pinia';
import axios from '~/plugins/axios.js';
import Cookie from 'js-cookie';
import lodash from 'lodash';

export const useAuth = defineStore('auth', {

	state: () => {
		return {
			_company: {},
			_token: Cookie.get('token') ?? null,
		};
	},

	getters: {
		company: state => state._company,
		token: state => state._token,
	},

	actions: {
		setAuth({ token, company }) {
			this._token = token;		
			this._company = company;
			Cookie.set('token', token, {expires: 365});
		},
		async refreshAuth() {
			if (
				this.token
				&& Object.keys(this.company).length === 0
			) {
				try{
					let { data } = await axios.get('/auth/company', {
						headers: {
							'Authorization': `Bearer ${this.token}`
						}
					});
					this.setAuth({
						token: this.token,
						company: data,
					});
				}
				catch(error) {
					this.clearAuth();
				}
			}
		},
		async destroyAuth() {
			await axios.delete('/auth/token', {
				headers: {
					'Authorization': `Bearer ${this.token}`
				}
			});
			this.clearAuth();
		},
		clearAuth() {
			this._token = null;
			this._company = {};
			Cookie.remove('token');
		},
	},
});