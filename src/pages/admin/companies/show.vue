<template>

	<nav
		class="my-4 text-sm">
		公司管理
		<i
			class="mdi mdi-chevron-right mx-2"></i>
		<router-link
			:to="{
				name: 'companies',
			}">
			公司列表
		</router-link>
		<i
			class="mdi mdi-chevron-right mx-2"></i>
		<router-link
			:to="{
				name: 'companies/show',
				params: {
					companyId,
				}
			}">
			公司详情
		</router-link>
	</nav>

	<h1
		class="text-2xl font-bold my-4">
		{{ company.name }}
	</h1>

	<tabs
		class="my-4"
		:links="[
			{
				label: `<i class='mdi mdi-office-building mr-2'></i>公司概览`,
				route: {
					name: 'companies/show',
					params: {
						companyId,
					}
				}
			},
			{
				label: `<i class='mdi mdi-store mr-2'></i>下属门店`,
				route: {
					name: 'companies/show/stores',
					params: {
						companyId,
					}
				},
			},
			{
				label: `<i class='mdi mdi-square-edit-outline mr-2'></i>修改公司信息`,
				route: {
					name: 'companies/show/edit',
					params: {
						companyId,
					}
				}
			},
		]"/>

	<router-view
		v-if="company.id"
		v-model:company="company"/>

</template>

<script setup>
import { defineAsyncComponent, ref, onBeforeMount, computed } from 'vue';
import { useMeta } from 'vue-meta';
import axios from '~/plugins/axios.js';

const Tabs = defineAsyncComponent(() => import('~/components/tabs.vue'));''

let company = ref({}),
	{ companyId } = defineProps({
		companyId: {
			required: true,
		}
	});

useMeta(computed(() => {
	return {
		title: company.value.name
			? `${company.value.name} - 公司详情`
			: '公司详情',
	};
}));

onBeforeMount(async () => {
	let { data } = await axios.get(`/companies/${companyId}`);
	company.value = data;
});
</script>

<script>
export default {
	inheritAttrs: false,
}
</script>