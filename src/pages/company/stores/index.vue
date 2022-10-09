<template>
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
					地点
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
			<tr
				v-for="{id, code, name, location, promote_end_at, promote_start_at, created_at} in data.data">
				<td
					class="font-mono"
					v-html="highlight(code)"/>
				<td
					v-html="highlight(name)"/>
				<td>
					{{ location }}
				</td>
				<td>
					{{ formatPromoteTime(promote_start_at) }} - {{ formatPromoteTime(promote_end_at) }}
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
	formatPromoteTime,
	fromNow,
	formatTimestamp,
} = useTime();

</script>