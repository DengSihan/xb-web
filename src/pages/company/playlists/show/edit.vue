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
				@submit.prevent="update">
				
				<xb-input
					class="mb-4"
					name="name"
					placeholder="播放列表名称"
					v-model="form.name"
					v-model:errors="errors.name"
					required/>

				<xb-button
					:loading="loading"
					class="ml-auto block">
					更新播放列表
				</xb-button>

			</form>
		</li>

		<li
			class="flex my-4">
			<h2
				class="w-32 leading-10 font-semibold">
				切换播放状态
			</h2>
			<form
				class="p-4 bg-amber-50 rounded w-[calc(100%-theme('space.32'))]"
				@submit.prevent="toggle">
				<xb-button
					:loading="toggleLoading"
					class="ml-auto block"
					scheme="alert">
					切换播放状态至 <strong>{{ playlist.playable ? '不可播放' : '可播放' }}</strong>
				</xb-button>
			</form>
		</li>

		<li
			class="flex my-4">
			<h2
				class="w-32 leading-10 font-semibold">
				删除列表
			</h2>
			<form
				class="p-4 bg-red-50 rounded w-[calc(100%-theme('space.32'))]"
				@submit.prevent="destroy">
				
				<xb-input
					class="mb-4"
					name="name"
					:placeholder="`输入列表名称: ${playlist.name} 以确认删除`"
					v-model="destroyForm.name"
					v-model:errors="destroyFormErrors.name"
					required/>

				<xb-button
					:loading="destroying"
					scheme="danger"
					class="ml-auto block">
					删除列表
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

const emit = defineEmits(['update:playlist']);

const props = defineProps(['playlist']);

const baseForm = {
	name: '',
};

let {
	form,
	errors,
	loading,
	handleFormErrors,
	clearFormErrors,
} = useForm(baseForm);

onBeforeMount(async () => {
	form.value = pick(props.playlist, Object.keys(baseForm));
});

const update = () => {
	loading.value = true;
	axios.put(
			`/playlists/${props.playlist.id}`,
			form.value,
		)
		.then(({ data }) => {
			clearFormErrors();
			emit('update:playlist', data);
			notify({
			    title: '更新成功',
			    text: `<strong>${data.name}</strong> 基础信息已更新`,
			    type: 'success',
			});
		})
		.catch(errors => {
			handleFormErrors(errors);
		})
		.finally(() => {
			loading.value = false;
		});
};

let toggleLoading = ref(false);

const toggle = () => {
	toggleLoading.value = true;
	axios[props.playlist.playable ? 'delete' : 'post'](
			`/playlists/${props.playlist.id}/playable`,
		)
		.then(({ data }) => {
			emit('update:playlist', data);
			notify({
			    title: '切换成功',
			    text: `已切换至 <strong>${data.playable ? '可播放' : '不可播放'}</strong>`,
			    type: 'success',
			});
		})
		.finally(() => {
			toggleLoading.value = false;
		});
};



let {
	form: destroyForm,
	errors: destroyFormErrors,
	loading: destroying,
	handleFormErrors: handleDestroyFormErrors,
} = useForm({name: ''});

const router = useRouter();

const destroy = () => {
	destroying.value = true;
	axios.delete(
			`/playlists/${props.playlist.id}`,
			{
				data: destroyForm.value,
			}
		)
		.then(() => {
			router.push({
					name: 'playlists'
				})
				.then(() => {
					notify({
					    title: '删除成功',
					    text: `<strong>${props.playlist.name}</strong> 已删除`,
					    type: 'success',
					});
				});
		})
		.catch(errors => {
			handleDestroyFormErrors(errors);
		})
		.finally(() => {
			destroying.value = false;
		});
};

</script>

<script>
export default {
	inheritAttrs: false,
}
</script>