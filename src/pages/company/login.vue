<template>
	<form
		class="w-full sm:w-full md:w-1/2 lg:w-[400px] mx-auto my-16"
		@submit.prevent="login">

		<h1
			class="my-6 text-xl font-bold">
			登录
			<i
				class="mdi mdi-login-variant pl-2"></i>
		</h1>

		<xb-input
			class="my-6"
			name="username"
			placeholder="<i class='mdi mdi-account-multiple pr-2'></i>公司代码"
			v-model="form.code"
			v-model:errors="errors.code"
			required/>

		<xb-input
			class="my-6"
			name="password"
			type="password"
			placeholder="<i class='mdi mdi-key pr-2'></i>密码"
			v-model="form.password"
			v-model:errors="errors.password"
			required/>

		<xb-button
			class="w-full block my-6"
			:loading="loading">
			登录
			<i class="mdi mdi-send pl-1"></i>
		</xb-button>

	</form>
</template>

<script setup>
import { useForm } from '~/composables/form.js';

const { 
	loading,
	form,
	errors,
	handleFormErrors,
	clearFormErrors,
} = useForm({
	code: '',
	password: '',
});
</script>

<script>

import axios from '~/plugins/axios.js';
import { useAuth } from '~/store/company/auth.js';

export default {
	
	methods: {
		login() {

			this.loading = true;

			axios.post(`/auth/tokens`, this.form)
				.then(({ data }) => {
					
					this.clearFormErrors();
					
					useAuth().setAuth(data);

					this.$router.push({
						name: 'index',
					});
				})
				.catch(err => {
					this.handleFormErrors(err);
				})
				.finally(() => {
					this.loading = false;
				});
		}
	}
}
</script>

