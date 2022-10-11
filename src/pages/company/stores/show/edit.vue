<template>

	<ul
		class="my-4">

		<li
			class="flex my-4">
			<h2
				class="w-32 leading-10 font-semibold">
				基础信息
			</h2>
			<form
				class="p-4 bg-slate-50 rounded w-[calc(100%-theme('space.32'))]"
				@submit.prevent="updateBaseInfo">

				<xb-input
					class="my-4"
					name="code"
					placeholder="门店编号"
					v-model="baseInfo.code"
					v-model:errors="baseInfoErrors.code"
					required/>

				<xb-input
					class="my-4"
					name="name"
					placeholder="门店名称"
					v-model="baseInfo.name"
					v-model:errors="baseInfoErrors.name"
					required/>

				<xb-input
					class="my-4"
					name="open_at"
					placeholder="开始营业时间"
					type="time"
					v-model="baseInfo.open_at"
					v-model:errors="baseInfoErrors.open_at"
					required/>

				<xb-input
					class="my-4"
					name="close_at"
					placeholder="结束营业时间"
					type="time"
					v-model="baseInfo.close_at"
					v-model:errors="baseInfoErrors.close_at"
					required/>

				<xb-button
					:loading="loadingBaseInfo"
					class="ml-auto block">
					更新信息
				</xb-button>
				
			</form>
		</li>

		<li
			class="flex my-4">
			<h2
				class="w-32 leading-10 font-semibold">
				授权信息
			</h2>
			<form
				class="p-4 bg-amber-50 rounded w-[calc(100%-theme('space.32'))]"
				@submit.prevent="resetPassword">
				<xb-button
					:loading="loadingResetPassword"
					class="ml-auto block"
					scheme="alert">
					重置密码
				</xb-button>
			</form>
		</li>

		<li
			class="flex my-4">
			<h2
				class="w-32 leading-10 font-semibold">
				删除账户
			</h2>
			<form
				class="p-4 bg-red-50 rounded w-[calc(100%-theme('space.32'))]"
				@submit.prevent="destroyStore">

				<xb-input
					class="my-4"
					name="delete_confirm"
					:placeholder="`输入门店编号: ${baseInfo.code} 以确认删除`"
					v-model="destroyStoreForm.code"
					v-model:errors="destroyStoreFormErrors.code"
					required/>

				<xb-button
					:loading="loadingDestroyStore"
					class="ml-auto block"
					scheme="danger">
					删除门店
				</xb-button>
			</form>
		</li>
	</ul>

	
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { pick } from 'lodash';
import { useForm } from '~/composables/form.js';
import { notify } from '@kyvg/vue3-notification';
import axios from '~/plugins/axios.js';

const emit = defineEmits(['update:store']);

const { store } = defineProps(['store']);

const baseForm = {
	name: '',
	code: '',
	open_at: 0,
	close_at: 0,
};

let {
	form: baseInfo,
	errors: baseInfoErrors,
	loading: loadingBaseInfo,
	handleFormErrors: handleBaseInfoErrors,
	clearFormErrors: clearBaseInfoErrors,
} = useForm(baseForm);

onBeforeMount(async () => {
	baseInfo.value = pick(store, Object.keys(baseForm));
});

const updateBaseInfo = () => {
	loadingBaseInfo.value = true;
	axios.put(
			`/stores/${store.id}`,
			baseInfo.value,
		)
		.then(({ data }) => {
			clearBaseInfoErrors();
			emit('update:store', data);
			notify({
			    title: '更新成功',
			    text: `<strong>${data.name}</strong> 基础信息已更新`,
			    type: 'success',
			});
		})
		.catch(errors => {
			handleBaseInfoErrors(errors);
		})
		.finally(() => {
			loadingBaseInfo.value = false;
		});
}

let loadingResetPassword = ref(false);

const resetPassword = () => {
	loadingResetPassword.value = true;
	axios.put(
			`/stores/${store.id}/password`,
		)
		.then(({ data }) => {
			notify({
			    title: '密码重置成功',
			    text: `<strong>${store.name}</strong> 密码已重置为 <strong>123456</strong>`,
			    type: 'success',
			});
		})
		.finally(() => {
			loadingResetPassword.value = false;
		});
};

let {
	form: destroyStoreForm,
	errors: destroyStoreFormErrors,
	loading: loadingDestroyStore,
	handleFormErrors: handleDestroyStoreFormErrors,
	clearFormErrors: clearDestroyStoreFormErrors,
} = useForm({code: ''});

const router = useRouter();

const destroyStore = () => {
	loadingDestroyStore.value = true;
	axios.delete(
			`/stores/${store.id}`,
			{
				data: destroyStoreForm.value,
			}
		)
		.then(() => {
			router.push({
					name: 'stores'
				})
				.then(() => {
					notify({
					    title: '删除成功',
					    text: `<strong>${store.name}</strong> 已删除`,
					    type: 'success',
					});
				});
		})
		.catch(errors => {
			handleDestroyStoreFormErrors(errors);
		})
		.finally(() => {
			loadingDestroyStore.value = false;
		});
};

</script>

<script>
export default {
	inheritAttrs: false,
}
</script>