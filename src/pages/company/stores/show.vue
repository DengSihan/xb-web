<template>
	<h1
		class="text-2xl font-bold mb-4">
		{{ store.name }}
	</h1>

	<tabs
		class="my-4"
		:links="[
			{
				label: `<i class='mdi mdi-store mr-2'></i>门店概览`,
				route: {
					name: 'stores/show',
					params: {
						storeId,
					}
				}
			},
			{
				label: `<i class='mdi mdi-playlist-music mr-2'></i>播放列表`,
				route: {
					name: 'stores/show/playlists',
					params: {
						storeId,
					}
				},
			},
			{
				label: `<i class='mdi mdi-chart-bar mr-2'></i>统计信息`,
				route: {
					name: 'stores/show/data',
					params: {
						storeId,
					}
				},
			},
			{
				label: `<i class='mdi mdi-store-edit mr-2'></i>修改门店信息`,
				route: {
					name: 'stores/show/edit',
					params: {
						storeId,
					}
				}
			},
		]"/>

	<router-view
		v-model:store="store"/>

</template>

<script setup>
import { defineAsyncComponent, ref, onBeforeMount, defineProps } from 'vue';
import axios from '~/plugins/axios.js';

const Tabs = defineAsyncComponent(() => import('~/components/tabs.vue'));''

let store = ref({}),
	props = defineProps({
		storeId: {
			required: true,
		}
	});

onBeforeMount(async () => {
	let { data } = await axios.get(`/stores/${props.storeId}`);
	store.value = data;
});
</script>