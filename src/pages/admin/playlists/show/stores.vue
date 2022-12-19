<template>
	<store-store-dialog
		:playlist="playlist"
		@stored="refreshData"/>

	<filters
		searchLabel="ID/编号/名称">
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
					隶属公司
				</th>
				<th>
					操作
				</th>
			</tr>
		</thead>
		<tbody>
			<template
				v-if="data.data?.length">
				<store-show-tr
					v-for="store in data.data"
					:key="store.id"
					:store="store"
					:playlist="playlist"
					:highlight="highlight"
					@destroyed="refreshData"/>
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
		:paginate="data">
		<destroy-all-stores-dialog
			v-if="data.data?.length"
			:playlist="playlist"
			@destroyed="refreshData"/>
	</paginator>
</template>

<script setup>

import { defineAsyncComponent } from 'vue';
import { usePaginate } from '~/composables/paginate.js';

const StoreStoreDialog = defineAsyncComponent(
	() => import('~/prefabs/company/playlists/show/stores/store-store-dialog.vue'),
);

const DestroyAllStoresDialog = defineAsyncComponent(
	() => import('~/prefabs/company/playlists/show/stores/destroy-all-stores-dialog.vue'),
);

const StoreShowTr = defineAsyncComponent(
	() => import('~/prefabs/admin/playlists/show/stores/show-tr.vue'),
);

const props = defineProps({
	playlist: {
		required: true,
		type: Object,
	},
});

const {
	data,
	Paginator,
	Filters,
	highlight,
	refreshData,
    AsyncFilter,
} = usePaginate(`/playlists/${props.playlist.id}/stores`);

</script>

<script>
export default {
	inheritAttrs: false,
}
</script>