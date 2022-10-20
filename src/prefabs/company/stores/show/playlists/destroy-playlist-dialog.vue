<template>

	<button
		class="text-red-600 ml-4"
		type="button"
		@click="show = true">
		删除
	</button>
	
	<custom-dialog
		v-model="show"
		prevent
		hide-closer>
		
		<template
			#title>
			<i
				class="mdi mdi-delete mr-2 text-red-600"></i>
			删除播放列表
		</template>

		<form
			@submit.prevent="destroyPlaylist">

			<p>
				{{ store.name }} 将不再播放 {{ playlist.name }}？
			</p>

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
import axios from '~/plugins/axios.js';

const CustomDialog = defineAsyncComponent(
	() => import('~/components/custom-dialog.vue')
);

let props = defineProps({
	playlist: {
		required: true,
		type: Object,
	},
	store: {
		required: true,
		type: Object,
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

const destroyPlaylist = () => {
	loading.value = true;
	axios.delete(
			`/stores/${props.store.id}/playlists/${props.playlist.id}`,
		)
		.then(({ data }) => {
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