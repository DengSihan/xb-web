<template>
	<nav
		class="my-4 text-sm">
		播放列表管理
		<i
			class="mdi mdi-chevron-right mx-2"></i>
		<router-link
			:to="{
				name: 'playlists'
			}">
			播放列表
		</router-link>
		<i
			class="mdi mdi-chevron-right mx-2"></i>
		<router-link
			:to="{
				name: 'playlists/create'
			}">
			新增播放列表
		</router-link>
	</nav>

	<h1
		class="text-2xl font-bold my-4">
		新增播放列表
	</h1>

	<form
		@submit.prevent="storePlaylist">

		<xb-input
			class="my-4"
			name="name"
			placeholder="播放列表名称"
			v-model="form.name"
			v-model:errors="errors.name"
			required/>

		<xb-button
			:loading="loading"
			class="ml-auto block">
			创建播放列表
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
	title: '新增播放列表',
});

let {
	loading,
	form,
	errors,
	handleFormErrors,
} = useForm({
	name: '',
});

const router = useRouter();

const storePlaylist = () => {
	loading.value = true;
	axios.post(
			`/playlists`,
			form.value
		)
		.then(({ data }) => {
			notify({
				title: '创建成功',
				text: `${data.name} 已创建`,
				type: 'success'
			});
			router.push({
				name: 'playlists/show',
				params: {
					playlistId: data.id,
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