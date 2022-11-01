import { defineStore } from 'pinia';
import axios from '~/plugins/axios.js';
import Cookie from 'js-cookie';

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
		setAuth({ token, admin }) {
			this._token = token;		
			this._admin = admin;
			Cookie.set('token', token, {expires: 365});
		},
		async refreshAuth() {
			if (
				this.token
				&& Object.keys(this.admin).length === 0
			) {
				try{
					let { data } = await axios.get('/auth/admin', {
						headers: {
							'Authorization': `Bearer ${this.token}`
						}
					});
					this.setAuth({
						token: this.token,
						admin: data,
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
			this._admin = {};
			Cookie.remove('token');
		},
	}
});