<template>

	<nav
		class="my-4 text-sm">
		门店管理
		<i
			class="mdi mdi-chevron-right mx-2"></i>
		<router-link
			:to="{
				name: 'stores',
			}">
			门店列表
		</router-link>
		<i
			class="mdi mdi-chevron-right mx-2"></i>
		<router-link
			:to="{
				name: 'stores/show',
				params: {
					storeId,
				}
			}">
			门店详情
		</router-link>
	</nav>

	<h1
		class="text-2xl font-bold my-4 flex items-center">
		{{ store.name }}

		<small
			v-if="isActive(store.token)"
			class="text-green-700 ml-2 text-base">
			<i
				class="mdi mdi-radiobox-marked mr-2"></i>在线
		</small>
		<small
			v-else
			class="text-slate-400 ml-2 text-base">
			<i
				class="mdi mdi-radiobox-blank mr-2"></i>离线
		</small>
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
		v-if="store.id"
		v-model:store="store"/>

</template>

<script setup>
import { defineAsyncComponent, ref, onBeforeMount, computed } from 'vue';
import { useMeta } from 'vue-meta';
import { useTime } from '~/composables/time.js';
import axios from '~/plugins/axios.js';

const Tabs = defineAsyncComponent(() => import('~/components/tabs.vue'));''

let store = ref({}),
	{ storeId } = defineProps({
		storeId: {
			required: true,
		}
	});

useMeta(computed(() => {
	return {
		title: store.value.name
			? `${store.value.name} - 门店详情`
			: '门店详情',
	};
}));

onBeforeMount(async () => {
	let { data } = await axios.get(`/stores/${storeId}`);
	store.value = data;
});

const {
	isInMinutes,
} = useTime();

const isActive = token => {
	if (!token) {
		return false;
	}
	return isInMinutes(token.last_used_at, 60);
};
</script>

<script>
export default {
	inheritAttrs: false,
}
</script>