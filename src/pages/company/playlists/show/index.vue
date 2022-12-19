<template>
	<div
		class="grid grid-cols-3 gap-2 my-4 p-4 bg-slate-50 rounded">

		<p
			class="-mx-2 flex">
			<span
				class="mx-2 w-[8rem]">
				播放列表 ID
			</span>
			<span
				class="font-mono mx-2">
				{{ playlist.id }}
			</span>
		</p>

		<p
			class="-mx-2 flex">
			<span
				class="mx-2 w-[8rem]">
				播放列表名称
			</span>
			<span
				class="font-mono mx-2">
				{{ playlist.name }}
			</span>
		</p>

		<p
			class="-mx-2 flex">
			<span
				class="mx-2 w-[8rem]">
				音频数量
			</span>
			<span
				class="font-mono mx-2">
				{{ playlist.count }}
			</span>
		</p>

		<p
			class="-mx-2 flex">
			<span
				class="mx-2 w-[8rem]">
				总时长
			</span>
			<span
				class="font-mono mx-2">
				{{ formatDuration(playlist.duration) }}
			</span>
		</p>

		<p
			class="-mx-2 flex">
			<span
				class="mx-2 w-[8rem]">
				可播放
			</span>
			<span
				class="font-mono mx-2">
				<i
					class="mdi mr-1"
					:class="{
						'mdi-check text-green-500': playlist.playable,
						'mdi-close text-red-500': !playlist.playable,
					}"></i>
				{{ playlist.playable ? '是' : '否' }}
			</span>
		</p>

		<p
			class="-mx-2 flex">
			<span
				class="mx-2 w-[8rem]">
				创建时间
			</span>
			<time
				class="font-mono mx-2"
				:datetime="playlist.created_at">
				{{ formatTimestamp(playlist.created_at) }}
			</time>
		</p>

		<p
			class="-mx-2 flex">
			<span
				class="mx-2 w-[8rem]">
				最近更新时间
			</span>
			<time
				class="font-mono mx-2"
				:datetime="playlist.updated_at">
				{{ formatTimestamp(playlist.updated_at) }}
			</time>
		</p>

	</div>
	
</template>


<script setup>
import { useTime } from '~/composables/time.js';

defineProps({
	playlist: {
		required: true,
	}
});

let {
	formatDuration,
	formatTimestamp,
} = useTime();

</script>

<script>
export default {
	inheritAttrs: false,
}
</script>