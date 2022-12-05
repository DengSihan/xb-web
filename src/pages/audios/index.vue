<template>
	<nav
		class="my-4 text-sm relative">
		音频管理
		<i
			class="mdi mdi-chevron-right mx-2"></i>
		<router-link
			:to="{
				name: 'audios'
			}">
			音频列表
		</router-link>

		<router-link
			class="absolute right-0"
			:to="{
				name: 'audios/create'
			}">
			<i
				class="mdi mdi-plus"></i>
			新增音频
		</router-link>
	</nav>
	<filters
		searchLabel="音频名称/音频代码"
		:orderables="[
			{
				label: '最新创建',
				value: 'created_at_desc',
			},
			{
				label: '最早创建',
				value: 'created_at_asc',
			},
		]"/>
	<table
		class="xb-table my-4">
		<thead>
			<tr>
				<th>
					ID
				</th>
				<th>
					名称
				</th>
				<th>
					类型
				</th>
				<th>
					时长
				</th>
				<th>
					文件大小
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
				<audio-tr
					v-for="audio in data.data"
					:audio="audio"
					:highlight="highlight"
					:key="audio.id"/>
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
	title: '音频列表',
});

const AudioTr = defineAsyncComponent(() => import('~/prefabs/audios/tr.vue'));

const {
	data,
	Paginator,
	Filters,
	highlight,
} = usePaginate('/audios');

</script>