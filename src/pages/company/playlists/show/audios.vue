<template>

	<store-audio-dialog
		:playlist="playlist"/>

	<filters
		searchLabel="名称"/>
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
				<audio-show-tr
					v-for="audio in data.data"
					:key="audio.id"
					:audio="audio"
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
		:paginate="data"/>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import { usePaginate } from '~/composables/paginate.js';

const StoreAudioDialog = defineAsyncComponent(
	() => import('~/prefabs/company/playlists/show/audios/store-audio-dialog.vue')
);

const AudioShowTr = defineAsyncComponent(
	() => import('~/prefabs/company/playlists/show/audios/show-tr.vue')
);

const { playlist } = defineProps({
	playlist: {
		required: true,
		type: Object
	}
});

const {
	data,
	loading,
	Paginator,
	Filters,
	highlight,
	refreshData
} = usePaginate(`/playlists/${playlist.id}/audios`);


</script>