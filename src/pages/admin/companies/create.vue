<template>
	<nav
		class="my-4 text-sm">
		公司管理
		<i
			class="mdi mdi-chevron-right mx-2"></i>
		<router-link
			:to="{
				name: 'companies'
			}">
			公司列表
		</router-link>
		<i
			class="mdi mdi-chevron-right mx-2"></i>
		<router-link
			:to="{
				name: 'companies/create'
			}">
			新增公司
		</router-link>
	</nav>

	<h1
		class="text-2xl font-bold my-4">
		新增公司
	</h1>

	<form
		@submit.prevent="storeCompany">
		
		<xb-input
			class="mt-4 mb-2"
			name="code"
			placeholder="公司编号"
			:tips="[
				'唯一值，用于公司登录',
				'仅限字母，数字，- 和 _'
			]"
			v-model="form.code"
			v-model:errors="errors.code"
			required/>

		<xb-input
			class="mt-2 mb-4"
			name="name"
			placeholder="公司名称"
			v-model="form.name"
			v-model:errors="errors.name"
			required/>

		<xb-button
			:loading="loading"
			class="ml-auto block">
			创建公司
		</xb-button>

	</form>

</template>

<script setup>
import { useRouter } from 'vue-router';
import { useMeta } from 'vue-meta';
import { notify } from '@kyvg/vue3-notification';
import { useForm } from '~/composables/form.js';
import axios from '~/plugins/axios.js'

useMeta({
	title: '新增公司',
});

const {
	loading,
	form,
	errors,
	handleFormErrors,
} = useForm({
	name: '',
	code: '',
});

const router = useRouter();

const storeCompany = () => {
	loading.value = true;
	axios.post(
			`/companies`,
			form.value
		)
		.then(({ data }) => {
			notify({
				title: '创建成功',
				text: `${data.code} 已创建`,
				type: 'success'
			});
			router.push({
				name: 'companies/show',
				params: {
					companyId: data.id
				}
			});
		})
		.catch(errors => {
			handleFormErrors(errors);
		})
		.finally(() => {
			loading.value = false;
		});
}
</script>