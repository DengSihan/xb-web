<template>
	<nav
		class="my-4 text-sm relative">
		门店管理
		<i
			class="mdi mdi-chevron-right mx-2"></i>
		<router-link
			:to="{
				name: 'stores'
			}">
			门店列表
		</router-link>

		<router-link
			class="absolute right-0"
			:to="{
				name: 'stores/create'
			}">
			新增门店
		</router-link>
	</nav>
	<filters
		searchLabel="编号/名称"/>
	<table
		class="xb-table my-4">
		<thead>
			<tr>
				<th>
					编号
				</th>
				<th>
					名称
				</th>
				<th>
					营业时间
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
				<tr
					v-for="{id, code, name, close_at, open_at, created_at} in data.data">
					<td
						class="font-mono"
						v-html="highlight(code)"/>
					<td
						v-html="highlight(name)"/>
					<td>
						{{ open_at }} - {{ close_at }}
					</td>
					<td>
						<time
							:datetime="created_at"
							:title="fromNow(created_at)">
							{{ formatTimestamp(created_at) }}
						</time>
					</td>
					<td>
						<router-link
							class="xb-link"
							:to="{
								name: 'stores/show',
								params: {
									storeId: id,
								}
							}">
							详情
						</router-link>
					</td>
				</tr>
			</template>
			<tr
				v-else>
				<td
					colspan="5">
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

const {
	data,
	loading,
	Paginator,
	Filters,
	highlight,
} = usePaginate('/stores');

const {
	fromNow,
	formatTimestamp,
} = useTime();

</script>