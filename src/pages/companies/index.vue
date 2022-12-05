<template>
	<nav
		class="my-4 text-sm relative">
		公司管理
		<i
			class="mdi mdi-chevron-right mx-2"></i>
		<router-link
			:to="{
				name: 'enterprises'
			}">
			公司列表
		</router-link>

		<router-link
			class="absolute right-0"
			:to="{
				name: 'enterprises/create'
			}">
			<i
				class="mdi mdi-plus"></i>
			新增公司
		</router-link>
	</nav>
	<filters
		searchLabel="公司名称/公司代码"
		:orderables="[
			{
				label: '最新创建',
				value: 'created_at_desc',
			},
			{
				label: '最早创建',
				value: 'created_at_asc',
			},
			{
				label: '公司数量最多',
				value: 'count_desc',
			},
			{
				label: '公司数量最少',
				value: 'count_asc',
			},
		]"/>
	<table
		class="xb-table my-4">
		<thead>
			<tr>
				<th>
					公司名称
				</th>
				<th>
					公司代码
				</th>
				<th>
					公司数量
				</th>
				<th>
					创建时间
				</th>
				<th>
					操作
				</th>
			</tr>
		</thead>
		<tbody>
			<template
				v-if="data.data?.length">
				<enterprise-tr
					v-for="enterprise in data.data"
					:enterprise="enterprise"
					:highlight="highlight"
					:key="enterprise.id"/>
			</template>
			<tr
				v-else>
				<td
					colspan="4">
					<h4
						class="py-4 text-slate-400">
						没有结果
					</h4>
				</td>
			</tr>
		</tbody>
	</table>
	<paginator
		class="my-4"
		:paginate="data"/>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import { useMeta } from 'vue-meta';
import { usePaginate } from '~/composables/paginate.js';

useMeta({
	title: '公司列表',
});

const EnterpriseTr = defineAsyncComponent(() => import('~/prefabs/enterprises/tr.vue'));

const {
	data,
	Paginator,
	Filters,
	highlight,
} = usePaginate('/companies');

</script>