<template>

	<header
		class="my-4 text-sm">
		<button
			class="ml-auto block"
			type="button"
			@click="show = true">
			添加音频
		</button>
	</header>
	
	<custom-dialog
		v-model="show"
		prevent
		hide-closer>
		
		<template
			#title>
			添加音频
		</template>

		<form
			@submit.prevent="storeAudios">
			
			<xb-select
				class="mb-4"
				v-model.number="form.category"
				v-model:errors="errors.category"
				name="category"
				placeholder="音频类型"
				required>
				<option
					v-for="value in [1, 2, 3]"
					:value="value">
					{{ translateCategory(value) }}
				</option>
			</xb-select>

			<template
				v-if="form.category === 2">
				<xb-input
					class="my-4"
					v-model="form.play_at"
					v-model:errors="errors.play_at"
					name="play_at"
					type="time"
					placeholder="播放时间"
					required/>
				<xb-input
					class="my-4"
					v-model="form.count"
					v-model:errors="errors.count"
					name="count"
					type="number"
					min="1"
					step="1"
					placeholder="播放次数"
					required/>
				<xb-input
					v-if="form.count > 1"
					class="my-4"
					v-model="form.between"
					v-model:errors="errors.between"
					name="between"
					type="number"
					min="1"
					step="1"
					placeholder="音频间隔时间（分钟）"
					:tips="[
						'指促销音频之间开始播放时间的间隔'
					]"
					required/>
			</template>

			<template
				v-if="form.category === 3">
				<xb-input
					class="my-4"
					v-model="form.interval"
					v-model:errors="errors.interval"
					name="interval"
					type="number"
					min="1"
					step="1"
					placeholder="促销音频间隔"
					:tips="[
						'指播放播放多少首背景音乐后再播放此音频'
					]"
					required/>
			</template>


			<template
				v-if="
					form.category
					&& form.category !== 1
				">
				<p
					class="my-4 flex items-center">
					<strong
						class="w-[8rem]">
						生成方式
					</strong>
					<span
						class="-mx-2">
						<label
							class="mx-2">
							<input
								type="radio"
								name="status"
								required
								value="generated_from_text"
								v-model="form.type">
							通过文字合成
						</label>
						<label
							class="mx-2">
							<input
								type="radio"
								name="status"
								required
								value="generated_from_audio"
								v-model="form.type">
							使用原始音频
						</label>
					</span>
				</p>
			</template>

			<xb-input
				v-if="
					form.category === 1
					|| form.type === 'generated_from_audio'
				"
				class="my-4"
				v-model="form.audio"
				v-model:errors="errors.audio"
				name="audio"
				type="file"
				accept=".mp3,audio/*"
				placeholder="音频文件"
				required/>

			<xb-textarea
				v-if="
					form.category !== 1
					&& form.type === 'generated_from_text'
				"
				class="my-4"
				v-model="form.text"
				v-model:errors="errors.text"
				name="text"
				placeholder="音频内容"
				required/>

			<footer
				class="flex justify-between mt-4">
				
				<xb-button
					class="w-24"
					scheme="info"
					@click="show = false"
					type="button"
					:disabled="loading">
					取消
				</xb-button>

				<xb-button
					scheme="success"
					class="w-24"
					:loading="loading">
					添加
				</xb-button>

			</footer>

		</form>

	</custom-dialog>

</template>

<script setup>

import { defineAsyncComponent, ref } from 'vue';
import { useForm } from '~/composables/form.js';
import { useAudio } from '~/composables/translator.js';
import axios from '~/plugins/axios.js';
import { notify } from '@kyvg/vue3-notification';

const CustomDialog = defineAsyncComponent(
	() => import('~/components/custom-dialog.vue')
);

const { translateCategory } = useAudio();

let props = defineProps({
	playlist: {
		required: true,
		type: Object,
	}
});

let emits = defineEmits([
	'stored'
]);

let show = ref(false);

let {
	form,
	errors,
	handleFormErrors,
	loading,
	reset,
} = useForm({
	category: '',
	text: null,
	interval: null,
	audio: null,
	type: null,
	play_at: null,
	between: null,
	count: 1,
});

const storeAudios = () => {
	loading.value = true;

	let formData = new FormData;

	Object
		.keys(form.value)
		.filter(key => key !== 'type')
		.forEach(key => {
			if (form.value[key]) {
				formData.append(key, form.value[key]);
			}
		});

	axios.post(
			`/playlists/${props.playlist.id}/audios`,
			formData
		)
		.then(() => {
			reset();
			show.value = false;
			emits('stored');
			notify({
			    title: '音频创建中',
			    text: '音频创建中，请稍候',
			    type: 'success',
			});
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