<template>

    <button
        class="text-red-600 ml-2"
        type="button"
        @click="show = true">
        移除所有门店
    </button>
	
	<custom-dialog
		v-model="show"
		prevent
		hide-closer>
		
		<template
			#title>
			移除所有门店
		</template>

		<form
			@submit.prevent="destroyStore">
			<p>
				确认移除所有门店？
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

let show = ref(false);

const emits = defineEmits([
	'destroyed',
]);

let { 
    loading, 
    form, 
    handleFormErrors,
} = useForm();

const destroyStore = () => {
	loading.value = true;
	axios.delete(
			`/playlists/${props.playlist.id}/stores`,
		)
		.then(() => {
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