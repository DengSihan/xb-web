<template>
	<nav
		class="my-4 text-sm relative">
		授权管理
		<i
			class="mdi mdi-chevron-right mx-2"></i>
		<router-link
			:to="{
				name: 'tokens'
			}">
			授权列表
		</router-link>
	</nav>
	<filters
		searchLabel="User-Agent/IP"
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
				label: '最近使用',
				value: 'last_used_at_desc',
			},
			{
				label: '最早使用',
				value: 'last_used_at_asc',
			},
		]"/>
	<table
		class="xb-table my-4">
		<thead>
			<tr>
				<th>
					User-Agent
				</th>
				<th>
					IP
				</th>
				<th>
					IP 位置
				</th>
				<th>
					创建时间
				</th>
				<th>
					最近使用时间
				</th>
				<th>
					操作
				</th>
			</tr>
		</thead>
		<tbody>
			<template
				v-if="data.data?.length">
				<token-tr
					v-for="token in data.data"
					:token="token"
					:highlight="highlight"
					:key="token.id"
					@destroyed="refreshData()"/>
			</template>
			<tr
				v-else>
				<td
					colspan="6">
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
	title: '授权列表',
});

const TokenTr = defineAsyncComponent(() => import('~/prefabs/tokens/tr.vue'));

const {
	data,
	Paginator,
	Filters,
	highlight,
	refreshData,
} = usePaginate('/auth/tokens');

</script>