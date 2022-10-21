<template>

	<nav
		class="my-4 text-sm">
		播放列表管理
		<i
			class="mdi mdi-chevron-right mx-2"></i>
		<router-link
			:to="{
				name: 'playlists',
			}">
			播放列表
		</router-link>
		<i
			class="mdi mdi-chevron-right mx-2"></i>
		<router-link
			:to="{
				name: 'playlists/show',
				params: {
					playlistId,
				}
			}">
			列表详情
		</router-link>
	</nav>

	<h1
		class="text-2xl font-bold my-4">
		{{ playlist.name }}
	</h1>

	<tabs
		class="my-4"
		:links="[
			{
				label: `<i class='mdi mdi-playlist-music mr-2'></i>播放列表`,
				route: {
					name: 'playlists/show',
					params: {
						playlistId,
					}
				}
			},
			{
				label: `<i class='mdi mdi-music mr-2'></i>包含音频`,
				route: {
					name: 'playlists/show/audios',
					params: {
						playlistId,
					}
				}
			},
			{
				label: `<i class='mdi mdi-store mr-2'></i>播放门店`,
				route: {
					name: 'playlists/show/stores',
					params: {
						playlistId,
					}
				},
			},
			{
				label: `<i class='mdi mdi-playlist-edit mr-2'></i>修改列表`,
				route: {
					name: 'playlists/show/edit',
					params: {
						playlistId,
					}
				}
			},
		]"/>

	<router-view
		v-if="playlist.id"
		v-model:playlist="playlist"/>

</template>

<script setup>
import { defineAsyncComponent, ref, onBeforeMount, computed } from 'vue';
import { useMeta } from 'vue-meta';
import axios from '~/plugins/axios.js';


const Tabs = defineAsyncComponent(() => import('~/components/tabs.vue'));''

let playlist = ref({}),
	{ playlistId } = defineProps({
		playlistId: {
			required: true,
		}
	});

useMeta(computed(() => {
	return {
		title: playlist.value.name
			? `${playlist.value.name} - 播放列表详情`
			: '播放列表详情'
	}
}));

onBeforeMount(async () => {
	let { data } = await axios.get(`/playlists/${playlistId}`);
	playlist.value = data;
});
</script>

<script>
export default {
	inheritAttrs: false,
}
</script>