<template>
	<nav
		class="my-4 text-sm relative">
		播放列表管理
		<i
			class="mdi mdi-chevron-right mx-2"></i>
		<router-link
			:to="{
				name: 'playlists'
			}">
			播放列表
		</router-link>

		<router-link
			class="absolute right-0"
			:to="{
				name: 'playlists/create'
			}">
			<i
				class="mdi mdi-plus"></i>
			新增播放列表
		</router-link>
	</nav>
	<filters
		searchLabel="ID/名称"/>
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
					v-for="{id, count, duration, name, created_at, updated_at} in data.data">
					<td
						v-html="highlight(id)"/>
					<td
						v-html="highlight(name)"/>
					<td>
						{{ count }}
					</td>
					<td>
						<code
							v-html="formatDuration(duration)"/>
					</td>
					<td>
						<time
							:datetime="created_at"
							:title="fromNow(created_at)">
							{{ formatTimestamp(created_at) }}
						</time>
					</td>
					<td>
						<time
							:datetime="updated_at"
							:title="fromNow(updated_at)">
							{{ formatTimestamp(updated_at) }}
						</time>
					</td>
					<td>
						<router-link
							class="xb-link"
							:to="{
								name: 'playlists/show',
								params: {
									playlistId: id,
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
import { usePaginate } from '~/composables/paginate.js';
import { useTime } from '~/composables/time.js';

const {
	data,
	loading,
	Paginator,
	Filters,
	highlight,
} = usePaginate('/playlists');

const {
	formatDuration,
	fromNow,
	formatTimestamp,
} = useTime();

</script>