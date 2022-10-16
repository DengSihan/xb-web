<template>
	
	<custom-dialog
		v-model="show"
		prevent
		hide-closer>
		
		<template
			#title>
			删除播放列表
		</template>

		<form
			@submit.prevent="destroyPlaylist">

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

import { ref, defineAsyncComponent } from 'vue';
import { useForm } from '~/composables/form.js';
import axios from '~/plugins/axios.js';

const CustomDialog = defineAsyncComponent(
	() => import('~/components/custom-dialog.vue')
);

let props = defineProps({
	playlist: {
		required: true,
		type: Object,
	},
});

let emits = defineEmits([
	'update:modelValue',
	'deleted'
]);

let show = ref(false);

let {
	form,
	handleFormErrors,
	loading,
} = useForm();

const destroyPlaylist = () => {
	loading.value = true;
	axios.delete(
			`/stores/${props.store.id}/playlists/${playlist.id}`,
		)
		.then(({ data }) => {
			emits('deleted');
		})
		.catch(errors => {
			handleFormErrors(errors);
		})
		.finally(() => {
			loading.value = false;
		});
}
</script>