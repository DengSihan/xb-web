<template>

	<store-playlist-dialog
		:store="store"
		@stored="refreshData"/>

	<filters
		searchLabel="名称"
		disabled-orders/>
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
					音频数量
				</th>
				<th>
					总时长
				</th>
				<th>
					创建时间
				</th>
				<th>
					更新时间
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
					v-for=" playlist in data.data">
					<td
						v-html="highlight( playlist.id)"/>
					<td
						v-html="highlight( playlist.name)"/>
					<td>
						{{  playlist.count }}
					</td>
					<td>
						<code
							v-html="formatDuration( playlist.duration)"/>
					</td>
					<td>
						<time
							:datetime=" playlist.created_at"
							:title="fromNow( playlist.created_at)">
							{{ formatTimestamp( playlist.created_at) }}
						</time>
					</td>
					<td>
						<time
							:datetime=" playlist.updated_at"
							:title="fromNow( playlist.updated_at)">
							{{ formatTimestamp( playlist.updated_at) }}
						</time>
					</td>
					<td>
						<router-link
							class="xb-link"
							:to="{
								name: 'playlists/show',
								params: {
									playlistId:  playlist.id,
								}
							}">
							详情
						</router-link>

						<destroy-playlist-dialog
							:playlist="playlist"
							:store="store"
							@destroyed="refreshData"/>
					</td>
				</tr>
			</template>
			<tr
				v-else>
				<td
					colspan="7">
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
	refreshData,
} = usePaginate(`/stores/${store.id}/playlists`);

const {
	formatDuration,
	fromNow,
	formatTimestamp,
} = useTime();

const StorePlaylistDialog = defineAsyncComponent(
	() => import('~/prefabs/company/stores/show/playlists/store-playlist-dialog.vue')
);

const DestroyPlaylistDialog = defineAsyncComponent(
	() => import('~/prefabs/company/stores/show/playlists/destroy-playlist-dialog.vue')
);

</script>

<script>
export default {

	inheritAttrs: false,
}
</script>