<template>

	<tr
		:class="{
			'text-slate-500': !audio.is_playable
		}">
		<td>
			{{ audio.id }}
		</td>
		<td
			class="max-w-[400px]"
			v-html="highlight(audio.name)"/>
		<td>
			{{ enums['category'][audio.category] }}
		</td>
		<td>
			{{ formatDuration(audio.duration) }}
		</td>
		<td>
			{{ audio.size }}
		</td>
		<td>
			<time
				:datetime="audio.created_at"
				:title="fromNow(audio.created_at)">
				{{ formatTimestamp(audio.created_at) }}
			</time>
		</td>
		<td>

		</td>
	</tr>


</template>

<script setup>

import { useTime } from '~/composables/time.js';
import enums from '~/enums.json';

const {
	formatDuration,
	fromNow,
	formatTimestamp,
} = useTime();


let props = defineProps({
	audio: {
		required: true,
		type: Object,
	},
	highlight: {
		required: false,
		type: Function
	},
});

</script>
