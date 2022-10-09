<template>

	<ul
		class="my-4">

		<li
			class="flex my-4">
			<h2
				class="w-32 font-bold">
				基础信息
			</h2>
			<form
				class="p-4 bg-slate-50 rounded w-[calc(100%-theme('space.32'))] text-right"
				@submit.prevent="">

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
					name="promote_start_at"
					placeholder="开始营业时间"
					v-model="baseInfo.promote_start_at"
					v-model:errors="baseInfoErrors.promote_start_at"
					required/>

				<xb-input
					class="my-4"
					name="promote_end_at"
					placeholder="结束营业时间"
					v-model="baseInfo.promote_end_at"
					v-model:errors="baseInfoErrors.promote_end_at"
					required/>


					<xb-button>
						更新信息
					</xb-button>


			</form>
		</li>

		<li
			class="flex my-4">
			<h2
				class="w-32 font-bold">
				授权信息
			</h2>
			<form
				class="p-4 bg-amber-50 rounded w-[calc(100%-theme('space.32'))] text-right"
				@submit.prevent="">
				<xb-button
					scheme="alert">
					重置密码
				</xb-button>
			</form>
		</li>

		<li
			class="flex my-4">
			<h2
				class="w-32 font-bold">
				删除账户
			</h2>
			<form
				class="p-4 bg-red-50 rounded w-[calc(100%-theme('space.32'))] text-right"
				@submit.prevent="">

				<xb-input
					class="my-4"
					name="delete_confirm"
					:placeholder="`输入门店编号: ${baseInfo.code} 以确认删除`"
					v-model="deleteConfirmForm.value"
					v-model:errors="deleteConfirmForm.errors"
					required/>

				<xb-button
					scheme="danger">
					删除门店
				</xb-button>
			</form>
		</li>
	</ul>

	
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { pick } from 'lodash';
import { useForm } from '~/composables/form.js';

const { store } = defineProps(['store']);

const baseForm = {
	name: '',
	code: '',
	promote_start_at: 0,
	promote_end_at: 0,
}

let {
	form: baseInfo,
	errors: baseInfoErrors,
} = useForm(baseForm);

onBeforeMount(async () => {
	baseInfo.value = pick(store, Object.keys(baseForm));
});

let deleteConfirmForm = {
	value: '',
	errors: [],
}

</script>

<script>
export default {

	inheritAttrs: false,

}
</script>