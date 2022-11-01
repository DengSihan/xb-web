<template>
	<dashboard
		:name="name"
		:sidebar="[
			{
				label: `
					<i
						class='mdi mdi-office-building mr-2'></i>
						公司管理
				`,
				route: {
					name: 'companies'
				}
			}
		]"/>
</template>
<script setup>
import { useMeta } from	'vue-meta';
import { defineAsyncComponent, computed } from 'vue';
import { useAuth } from '~/plugins/mode.js';

const name = computed(() => {
	return useAuth().admin.name;
});

useMeta({
	titleTemplate: '%s - 广播云',
});

const Dashboard = defineAsyncComponent(() =>
	import('~/components/dashboard.vue')
);
</script>