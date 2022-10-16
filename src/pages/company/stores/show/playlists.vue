<template>

	<header
		class="my-4 text-sm">
		<button
			class="ml-auto block"
			type="button"
			@click="show = true">
			添加播放列表
		</button>
	</header>

	<add-playlist-dialog
		:store="store"
		v-model="show"/>

	<filters
		searchLabel="名称"
		disabled-orders/>
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
import { ref, defineAsyncComponent } from 'vue';
import { usePaginate } from '~/composables/paginate.js';
import { useTime } from '~/composables/time.js';

const { store } = defineProps({
	store: {
		required: true,
	}
});

const {
	data,
	loading,
	Paginator,
	Filters,
	highlight,
} = usePaginate(`/stores/${store.id}/playlists`);

const {
	fromNow,
	formatTimestamp,
} = useTime();

let show = ref(true);

const AddPlaylistDialog = defineAsyncComponent(() => import('~/prefabs/company/stores/show/playlists/add-playlist-dialog.vue'));

</script>

<script>
export default {

	inheritAttrs: false,
}
</script>