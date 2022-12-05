<template>
	<dashboard
		:name="name"
		:sidebar="[

			{
				label: `
					<i class='mdi mdi-music mr-2'></i>
					音频管理
				`,
				route: {
					name: 'audios'
				}
			},

			{
				label: `
					<i class='mdi mdi-office-building mr-2'></i>
					企业管理
				`,
				route: {
					name: 'enterprises'
				},
				allows: ['admin']
			},
			
			{
				label: `
					<i class='mdi mdi-account-group mr-2'></i>
					公司管理
				`,
				route: {
					name: 'companies'
				},
				allows: ['admin', 'enterprise']
			},

			{
				label: `
					<i class='mdi mdi-store mr-2'></i>
					门店管理
				`,
				route: {
					name: 'stores'
				},
				allows: ['admin', 'enterprise', 'company']
			},

			{
				label: `
					<i class='mdi mdi-playlist-music mr-2'></i>
					播放列表
				`,
				route: {
					name: 'playlists'
				}
			},

			{
				label: `
					<i class='mdi mdi-fingerprint mr-2'></i>
					授权管理
				`,
				route: {
					name: 'tokens'
				}
			},
		]"/>
</template>
<script setup>
import { useMeta } from	'vue-meta';
import { defineAsyncComponent, computed } from 'vue';
import { useAuth } from '~/stores/auth.js';

const name = computed(() => {
	return useAuth().user.name;
});

useMeta({
	titleTemplate: '%s - 广播云',
});

const Dashboard = defineAsyncComponent(() =>
	import('~/components/dashboard.vue')
);
</script>