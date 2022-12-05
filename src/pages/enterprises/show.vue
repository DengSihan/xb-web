<template>

	<nav
		class="my-4 text-sm">
		企业管理
		<i
			class="mdi mdi-chevron-right mx-2"></i>
		<router-link
			:to="{
				name: 'enterprises',
			}">
			企业列表
		</router-link>
		<i
			class="mdi mdi-chevron-right mx-2"></i>
		<router-link
			:to="{
				name: 'enterprises/show',
				params: {
					enterpriseId,
				}
			}">
			企业详情
		</router-link>
	</nav>

	<h1
		class="text-2xl font-bold my-4">
		{{ enterprise.name }}
	</h1>

</template>

<script setup>
import { defineAsyncComponent, ref, onBeforeMount, computed } from 'vue';
import { useMeta } from 'vue-meta';
import axios from '~/plugins/axios.js';


const Tabs = defineAsyncComponent(() => import('~/components/tabs.vue'));''

let enterprise = ref({}),
	props = defineProps({
		enterpriseId: {
			required: true,
		}
	});

useMeta(computed(() => {
	return {
		title: enterprise.value.name
			? `${enterprise.value.name} - 企业详情`
			: '企业详情'
	}
}));

onBeforeMount(async () => {
	let { data } = await axios.get(`/enterprises/${props.enterpriseId}`);
	enterprise.value = data;
});
</script>

<script>
export default {
	inheritAttrs: false,
}
</script>