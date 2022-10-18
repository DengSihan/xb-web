<template>

	<tr
		:class="{
			'text-slate-500': !audio.playable
		}">
		<td>
			{{ audio.id }}
		</td>
		<td>
			{{ highlight(audio.name) }}
		</td>
		<td>
			{{ audio.category }}
		</td>
		<td>
			{{ audio.duration }}
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
			<button
				class="xb-link"
				type="button"
				@click="show = true">
				详情
			</button>
		</td>
	</tr>
	
	<custom-dialog
		:prevent="loading"
		:hide-closer="loading"
		v-model="show">
		
		<template
			#title>
			<i
				class="mdi mdi-information-variant mr-2"></i>
			音频详情
		</template>

		<ul
			class="grid grid-cols-1 gap-4">
			<li
				class="flex">
				<strong
					class="w-[8rem]">
					ID
				</strong>
				<span>
					{{ audio.id }}
				</span>
			</li>
			<li
				class="flex">
				<strong
					class="w-[8rem]">
					名称
				</strong>
				<span>
					{{ audio.name }}
				</span>
			</li>
			<li
				class="flex">
				<strong
					class="w-[8rem]">
					类型
				</strong>
				<span>
					{{ audio.category }}
				</span>
			</li>
			<li
				class="flex">
				<strong
					class="w-[8rem]">
					时长
				</strong>
				<span>
					{{ audio.duration }}
				</span>
			</li>
			<li
				class="flex">
				<strong
					class="w-[8rem]">
					大小
				</strong>
				<span>
					{{ audio.size }}
				</span>
			</li>
			<li
				v-if="audio.category !== 1"
				class="flex">
				<strong
					class="w-[8rem]">
					播放次数
				</strong>
				<span>
					{{ audio.view }}
				</span>
			</li>
			<li
				class="flex">
				<strong
					class="w-[8rem]">
					由文字生成
				</strong>
				<span>
					{{ audio.generate_from_text ? '是' : '否' }}
				</span>
			</li>
			<li
				v-if="audio.generate_from_text"
				class="flex">
				<strong
					class="w-[8rem]">
					文字
				</strong>
				<span>
					{{ audio.text }}
				</span>
			</li>
			<li
				class="flex">
				<strong
					class="w-[8rem]">
					可播放
				</strong>
				<span>
					{{ audio.playable ? '是' : '否' }}
				</span>
			</li>
		</ul>

		<form
			class="flex items-center justify-between my-4 rounded border-2 border-red-600 bg-red-50 p-2 text-red-600"
			@submit.prevent="destroyAudio">
			<p>
				删除此音频？
			</p>
			<xb-button
				:loading="loading"
				scheme="danger">
				确认删除
			</xb-button>
		</form>

	</custom-dialog>

</template>

<script setup>

import { ref, defineAsyncComponent } from 'vue';
import { useForm } from '~/composables/form.js';
import { useTime } from '~/composables/time.js';
import axios from '~/plugins/axios.js';

const {
	formatDuration,
	fromNow,
	formatTimestamp,
} = useTime();

const CustomDialog = defineAsyncComponent(
	() => import('~/components/custom-dialog.vue')
);

let props = defineProps({
	playlist: {
		required: true,
		type: Object,
	},
	audio: {
		required: true,
		type: Object,
	},
	highlight: {
		required: false,
		type: Function
	},
});

let emits = defineEmits([
	'destroied'
]);

let show = ref(false);

let {
	form,
	handleFormErrors,
	loading,
} = useForm();

const destroyAudio = () => {
	loading.value = true;
	axios.delete(
			`/playlists/${props.playlist.id}/audios/${props.audio.id}`,
		)
		.then(({ data }) => {
			show.value = false;
			emits('destroied');
		})
		.catch(errors => {
			handleFormErrors(errors);
		})
		.finally(() => {
			loading.value = false;
		});
}
</script>

<script>
export default {

	inheritAttrs: false,
}
</script>