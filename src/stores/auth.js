import { defineStore } from 'pinia';
import axios from '~/plugins/axios.js';
import Cookie from 'js-cookie';

export const useAuth = defineStore('auth', {

	state: () => {
		return {
			_user: {},
			_token: Cookie.get('token') ?? null,
		};
	},

	getters: {
		user: state => state._user,
		token: state => state._token,
	},

	actions: {
		setAuth({ token, user }) {
			this._token = token;		
			this._user = user;
			Cookie.set('token', token, {expires: 365});
		},
		async refreshAuth() {
			if (
				this.token
				&& Object.keys(this.user).length === 0
			) {
				try{
					let { data } = await axios.get('/auth/user', {
						headers: {
							'Authorization': `Bearer ${this.token}`
						}
					});
					this.setAuth({
						token: this.token,
						user: data,
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
			this._user = {};
			Cookie.remove('token');
		},
	},
});