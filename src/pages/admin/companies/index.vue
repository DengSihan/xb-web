<template>
	<nav
		class="my-4 text-sm relative">
		公司管理
		<i
			class="mdi mdi-chevron-right mx-2"></i>
		<router-link
			:to="{
				name: 'companies'
			}">
			公司列表
		</router-link>

		<router-link
			class="absolute right-0"
			:to="{
				name: 'companies/create'
			}">
			<i
				class="mdi mdi-plus"></i>
			新增公司
		</router-link>
	</nav>
	<filters
		searchLabel="ID/编号/名称"/>
	<table
		class="xb-table my-4">
		<thead>
			<tr>
				<th>
					ID
				</th>
				<th>
					编号
				</th>
				<th>
					名称
				</th>
				<th>
					门店数量
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
					v-for="{id, code, name, count, created_at} in data.data">
					<td
						class="font-mono"
						v-html="highlight(id)"/>
					<td
						class="font-mono"
						v-html="highlight(code)"/>
					<td
						v-html="highlight(name)"/>
					<td>
						{{ count }}
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
								name: 'companies/show',
								params: {
									companyId: id,
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
import { useMeta } from 'vue-meta';
import { usePaginate } from '~/composables/paginate.js';
import { useTime } from '~/composables/time.js';

useMeta({
	title: '公司列表',
});

const {
	data,
	loading,
	Paginator,
	Filters,
	highlight,
} = usePaginate('/companies');

const {
	fromNow,
	formatTimestamp,
} = useTime();

</script>