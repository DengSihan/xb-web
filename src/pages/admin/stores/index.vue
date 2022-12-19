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
	</nav>
	<filters
		searchLabel="ID/编号/名称"
		:optionsables="[
			{
				key: 'online',
				label: '在线状态',
				options: [
					{
						label: '全部',
						value: null
					},
					{
						label: '在线',
						value: '1'
					},
					{
						label: '离线',
						value: '0'
					}
				]
			}
		]">
		<async-filter
			param="company_id"
			label="隶属公司"
			api="/companies/all"/>
	</filters>
	<table
		class="xb-table my-4">
		<thead>
			<tr>
				<th>
					ID
				</th>
                <th>
                    隶属公司
                </th>
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
					在线状态
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
					v-for="{id, company, code, name, close_at, open_at, token = {}} in data.data">
					<td
						class="font-mono"
						v-html="highlight(id)"/>
                    <td>
                        {{ company.name }}
                    </td>
					<td
						class="font-mono"
						v-html="highlight(code)"/>
					<td
						v-html="highlight(name)"/>
					<td>
						{{ open_at }} - {{ close_at }}
					</td>
					<td>
						<span
							v-if="isActive(token)"
							class="text-green-700">
							<i
								class="mdi mdi-radiobox-marked mr-2"></i>在线
						</span>
						<span
							v-else
							class="text-slate-400">
							<i
								class="mdi mdi-radiobox-blank mr-2"></i>离线
						</span>
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
import { useMeta } from 'vue-meta';
import { usePaginate } from '~/composables/paginate.js';
import { useTime } from '~/composables/time.js';

useMeta({
	title: '门店列表',
});

const {
	data,
	Paginator,
	Filters,
	AsyncFilter,
	highlight,
} = usePaginate('/stores');

const {
	isInMinutes,
} = useTime();

const isActive = token => {
	if (!token) {
		return false;
	}
	return isInMinutes(token.last_used_at, 60);
};
</script>