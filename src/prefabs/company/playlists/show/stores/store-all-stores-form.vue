<template>
    <form
        @submit.prevent="storeStore">

		<p
			class="my-8">
			您确认要添加所有门店吗？
		</p>

        <footer
            class="flex justify-between">
            
            <xb-button
                class="w-24"
                scheme="info"
                @click="closeDialog"
                type="button"
                :disabled="loading">
                取消
            </xb-button>

            <xb-button
                scheme="success"
                class="w-48"
                :loading="loading">
                添加所有门店
            </xb-button>

        </footer>

    </form>
</template>

<script setup>

import { useForm } from '~/composables/form.js';
import axios from '~/plugins/axios.js';

let {
	form,
	handleFormErrors,
	loading,
	reset,
} = useForm({
	store_id: null
});

const props = defineProps({
	playlist: {
		required: true,
		type: Object,
	}
});

const emits = defineEmits([
	'stored',
	'close-dialog',
]);

const closeDialog = () => {
    emits('close-dialog');
}

const storeStore = () => {
	loading.value = true;

	axios.post(
			`/playlists/${props.playlist.id}/stores`,
		)
		.then(() => {
			reset();
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