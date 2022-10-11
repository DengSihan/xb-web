<template>
	<nav
		class="my-4 text-sm">
		门店管理
		<i
			class="mdi mdi-chevron-right mx-2"></i>
		<router-link
			:to="{
				name: 'stores'
			}">
			门店列表
		</router-link>
		<i
			class="mdi mdi-chevron-right mx-2"></i>
		<router-link
			:to="{
				name: 'stores/create'
			}">
			新增门店
		</router-link>
	</nav>

	<form
		@submit.prevent="storeStore">
		
		<xb-input
			class="my-4"
			name="code"
			placeholder="门店编号"
			v-model="form.code"
			v-model:errors="errors.code"
			required/>

		<xb-input
			class="my-4"
			name="name"
			placeholder="门店名称"
			v-model="form.name"
			v-model:errors="errors.name"
			required/>

		<xb-input
			class="my-4"
			name="open_at"
			placeholder="开始营业时间"
			type="time"
			v-model="form.open_at"
			v-model:errors="errors.open_at"
			required/>

		<xb-input
			class="my-4"
			name="close_at"
			placeholder="结束营业时间"
			type="time"
			v-model="form.close_at"
			v-model:errors="errors.close_at"
			required/>

		<xb-button
			:loading="loading"
			class="ml-auto block">
			创建门店
		</xb-button>

	</form>

</template>

<script setup>
import { useRouter } from 'vue-router';
import { notify } from '@kyvg/vue3-notification';
import { useForm } from '~/composables/form.js';
import axios from '~/plugins/axios.js'

let {
	loading,
	form,
	errors,
	handleFormErrors,
} = useForm({
	name: '',
	code: '',
	open_at: '09:00',
	close_at: '21:30',
});

const router = useRouter();

const storeStore = () => {
	loading.value = true;
	axios.post(
			`/stores`,
			form.value
		)
		.then(({ data }) => {
			notify({
				title: '创建成功',
				text: `${data.code} 已创建`,
				type: 'success'
			});
			router.push({
				name: 'stores',
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