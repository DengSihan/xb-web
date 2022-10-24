<template>

	<tr
		:class="{
			'text-slate-500': !audio.playable
		}">
		<td>
			{{ audio.id }}
		</td>
		<td
			class="max-w-[400px]"
			v-html="highlight(audio.name)"/>
		<td>
			{{ translateCategory(audio.category) }}
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
				<span
					class="w-[calc(100%-8rem)]">
					{{ audio.id }}
				</span>
			</li>
			<li
				class="flex">
				<strong
					class="w-[8rem]">
					名称
				</strong>
				<span
					class="w-[calc(100%-8rem)]">
					{{ audio.name }}
				</span>
			</li>
			<li
				class="flex">
				<strong
					class="w-[8rem]">
					类型
				</strong>
				<span
					class="w-[calc(100%-8rem)]">
					{{ translateCategory(audio.category) }}
				</span>
			</li>
			<li
				class="flex">
				<strong
					class="w-[8rem]">
					时长
				</strong>
				<span
					class="w-[calc(100%-8rem)]">
					{{ formatDuration(audio.duration) }}
				</span>
			</li>
			<li
				class="flex">
				<strong
					class="w-[8rem]">
					大小
				</strong>
				<span
					class="w-[calc(100%-8rem)]">
					{{ audio.size }}
				</span>
			</li>
			<li
				v-if="audio.category !== 1"
				class="flex">
				<strong
					class="w-[8rem]">
					累计播放次数
				</strong>
				<span
					class="w-[calc(100%-8rem)]">
					{{ audio.view }}
				</span>
			</li>

			<template
				v-if="audio.category === 2">
			
				<li
					class="flex">
					<strong
						class="w-[8rem]">
						播放次数
					</strong>
					<span
						class="w-[calc(100%-8rem)]">
						{{ audio.count }}
					</span>
				</li>
				<li
					v-if="audio.count > 1"
					class="flex">
					<strong
						class="w-[8rem]">
						播放间隔时间
					</strong>
					<span
						class="w-[calc(100%-8rem)]">
						{{ audio.between }} 分钟
					</span>
				</li>
				
			</template>	

			<li
				class="flex">
				<strong
					class="w-[8rem]">
					由文字生成
				</strong>
				<span
					class="w-[calc(100%-8rem)]">
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
				<span
					class="w-[calc(100%-8rem)]">
					{{ audio.text }}
				</span>
			</li>
			<li
				class="flex">
				<strong
					class="w-[8rem]">
					可播放
				</strong>
				<span
					class="w-[calc(100%-8rem)]">
					{{ audio.playable ? '是' : '否' }}
				</span>
			</li>
			<li
				v-if="audio.playable"
				class="flex">
				<strong
					class="w-[8rem]">
					音频
				</strong>
				<span
					class="w-[calc(100%-8rem)]">
					<audio
						class="w-full"
						controls
						controlsList="nodownload">
						<source
							:src="audio.path"
							type="audio/mpeg">
					</audio>
				</span>
			</li>
		</ul>

		<form
			class="text-right my-4 rounded border-2 border-red-600 bg-red-50 p-2 text-red-600"
			@submit.prevent="confirm = true">
			<xb-button
				:loading="loading"
				scheme="danger">
				删除音频
			</xb-button>
		</form>

	</custom-dialog>

	<custom-dialog
		prevent
		hide-closer
		v-model="confirm">
		
		<template
			#title>
			<i
				class="mdi mdi-delete text mr-2"></i>
			删除音频
		</template>

		<form
			@submit.prevent="destroyAudio">
			<p>
				确认删除	
				<i
					class="font-bold">
					{{ audio.name }}
				</i>
				？
			</p>
			<footer
				class="flex justify-between mt-4">
				
				<xb-button
					class="w-24"
					scheme="info"
					@click="confirm = false"
					type="button"
					:disabled="loading">
					取消
				</xb-button>

				<xb-button
					scheme="danger"
					class="w-24"
					:loading="loading">
					删除
				</xb-button>

			</footer>
		</form>

	</custom-dialog>

</template>

<script setup>

import { ref, defineAsyncComponent } from 'vue';
import { useForm } from '~/composables/form.js';
import { useTime } from '~/composables/time.js';
import { useAudio } from '~/composables/translator.js';
import axios from '~/plugins/axios.js';

const { translateCategory } = useAudio();

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
	'destroyed'
]);

let show = ref(false);

let {
	form,
	handleFormErrors,
	loading,
} = useForm();

let confirm = ref(false);

const destroyAudio = () => {
	loading.value = true;
	axios.delete(
			`/playlists/${props.playlist.id}/audios/${props.audio.id}`,
		)
		.then(() => {
			confirm.value = false;
			show.value = false;
			emits('destroyed');
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