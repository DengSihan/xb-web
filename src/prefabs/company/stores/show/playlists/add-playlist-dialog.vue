<template>
	
	<custom-dialog
		v-model="show"
		prevent
		hide-closer>
		
		<template
			#title>
			添加播放列表
		</template>

		<form
			@submit.prevent="storePlaylists">
			
			<xb-input
				v-model.number="form.playlist_id"
				v-model:errors="errors.playlist_id"
				name="playlist_id"
				placeholder="播放列表 ID"
				type="number"
				min="1"
				step="1"
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

import { computed, defineAsyncComponent } from 'vue';
import { useForm } from '~/composables/form.js';
import axios from '~/plugins/axios.js';

const CustomDialog = defineAsyncComponent(() => import('~/components/custom-dialog.vue'));

let props = defineProps({
	modelValue: {
		required: true,
		type: Boolean,
	},
	store: {
		required: true,
		type: Object,
	},
});

let emits = defineEmits(['update:modelValue']);

let show = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emits('update:modelValue', value);
	}
});

let {
	form,
	errors,
	handleFormErrors,
	loading,
} = useForm({
	playlist_id: null
});

const storePlaylists = () => {
	loading.value = true;
	axios.post(
			`/stores/${props.store.id}/playlists`,
			form.value
		)
		.then(({ data }) => {

		})
		.catch(errors => {
			handleFormErrors(errors);
		})
		.finally(() => {
			loading.value = false;
		});
}
</script>