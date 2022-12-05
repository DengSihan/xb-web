<template>
	<nav
		class="my-4 text-sm">
		企业管理
		<i
			class="mdi mdi-chevron-right mx-2"></i>
		<router-link
			:to="{
				name: 'enterprises'
			}">
			企业
		</router-link>
		<i
			class="mdi mdi-chevron-right mx-2"></i>
		<router-link
			:to="{
				name: 'enterprises/create'
			}">
			新增企业
		</router-link>
	</nav>

	<h1
		class="text-2xl font-bold my-4">
		新增企业
	</h1>

	<form
		@submit.prevent="store">

		<xb-input
			class="my-4"
			name="name"
			placeholder="企业名称"
			v-model="form.name"
			v-model:errors="errors.name"
			required/>

        <xb-input
			class="my-4"
			name="code"
			placeholder="企业代码"
			v-model="form.code"
			v-model:errors="errors.code"
			required/>

		<xb-button
			:loading="loading"
			class="ml-auto block">
			创建企业
		</xb-button>

	</form>

</template>

<script setup>
import { useRouter } from 'vue-router';
import { notify } from '@kyvg/vue3-notification';
import { useMeta } from 'vue-meta';
import { useForm } from '~/composables/form.js';
import axios from '~/plugins/axios.js'

useMeta({
	title: '新增企业',
});

let {
	loading,
	form,
	errors,
	handleFormErrors,
} = useForm({
	name: '',
    code: '',
});

const router = useRouter();

const store = () => {
	loading.value = true;
	axios.post(
			`/enterprises`,
			form.value
		)
		.then(({ data }) => {
			notify({
				title: '创建成功',
				text: `${data.name} 已创建`,
				type: 'success'
			});
			router.push({
				name: 'enterprises/show',
				params: {
					enterprisesId: data.id,
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