<template>
    <form
        class="mt-4"
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
                @click="closeDialog"
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
</template>

<script setup>

import { useForm } from '~/composables/form.js';
import axios from '~/plugins/axios.js';

let {
	form,
	errors,
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
			form.value
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