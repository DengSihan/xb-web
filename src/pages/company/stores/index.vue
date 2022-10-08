<template>
	<table
		class="xb-table mb-6">
		<thead>
			<tr>
				<th>
					编号
				</th>
				<th>
					名称
				</th>
				<th>
					操作
				</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="{code, name} in data.data">
				<td>
					{{ code }}
				</td>
				<td>
					{{ name }}
				</td>
				<td>
					详情
				</td>
			</tr>
		</tbody>
	</table>
	<paginator
		class="my-6"
		:paginate="data"/>
</template>

<script setup>
import { usePaginate } from '~/composables/paginate.js';

const {
	data,
	loading,
	Paginator
} = usePaginate('/stores');

</script>