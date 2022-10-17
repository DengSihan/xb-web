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
				<tr
					v-for="{id, name, created_at, last_used_at, ip, ip_location} in data.data">
					<td
						class="text-xs font-mono max-w-[300px]"
						v-html="highlight(name.split(')').join(')<br>'))"/>
					<td
						class="text-sm font-mono"
						v-html="highlight(ip)"/>
					<td
						class="text-sm">
						{{ ip_location }}
					</td>
					<td>
						<time
							class="text-xs font-mono"
							:datetime="created_at"
							:title="fromNow(created_at)">
							{{ formatTimestamp(created_at) }}
						</time>
					</td>
					<td>
						<time
							class="text-xs font-mono"
							:datetime="last_used_at"
							:title="fromNow(last_used_at)">
							{{ formatTimestamp(last_used_at) }}
						</time>
					</td>
					<td>
						<button
							@click="destroy(id)"
							class="text-red-600"
							type="button">
							吊销
						</button>
					</td>
				</tr>
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
import { usePaginate } from '~/composables/paginate.js';
import { useTime } from '~/composables/time.js';
import axios from '~/plugins/axios.js';

const {
	data,
	loading,
	Paginator,
	Filters,
	highlight,
	refreshData,
} = usePaginate('/auth/tokens');

const {
	fromNow,
	formatTimestamp,
} = useTime();

const destroy = id => {
	if (confirm('您确定吊销此授权？')) {
		axios.delete(
				`/auth/tokens/${id}`,
			)
			.then(() => {
				refreshData();
			});
	}
}

</script>