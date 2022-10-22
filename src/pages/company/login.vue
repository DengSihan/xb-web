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
import axios from '~/plugins/axios.js';

import { useForm } from '~/composables/form.js';
import { useAuth } from '~/store/company/auth.js';

import { useMeta } from 'vue-meta';
import { useRouter } from 'vue-router';

useMeta({
	title: '登录 - 广播云',
});

const router = useRouter();

const auth = useAuth();

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

const login = () => {
	loading.value = true;

	axios.post(`/auth/tokens`, form.value)
		.then(({ data }) => {
			
			clearFormErrors();
			
			auth.setAuth(data);

			router.push({
				name: 'index',
			});
		})
		.catch(err => {
			handleFormErrors(err);
		})
		.finally(() => {
			loading.value = false;
		});
}
</script>

