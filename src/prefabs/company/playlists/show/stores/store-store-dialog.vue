<template>

	<header
		class="my-4 text-sm">
		<button
			class="ml-auto block"
			type="button"
			@click="show = true">
			添加门店
		</button>
	</header>
	
	<custom-dialog
		v-model="show"
		prevent
		hide-closer>
		
		<template
			#title>
			添加门店
		</template>

		<form
			@submit.prevent="storeStore">
			
            <xb-input
                v-model.number="form.store_id"
                v-model:errors="errors.store_id"
                placeholder="门店 ID"
                name="store_id"
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
import axios from '~/plugins/axios.js';

const CustomDialog = defineAsyncComponent(
	() => import('~/components/custom-dialog.vue')
);

const props = defineProps({
	playlist: {
		required: true,
		type: Object,
	}
});

const emits = defineEmits([
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
	store_id: null
});

const storeStore = () => {
	loading.value = true;

	axios.post(
			`/playlists/${props.playlist.id}/stores`,
			form.value
		)
		.then(() => {
			reset();
			show.value = false;
			emits('stored');
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