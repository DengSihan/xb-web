<template>

    <tr>
        <td
            class="font-mono"
            v-html="highlight(store.id)"/>
        <td
            class="font-mono"
            v-html="highlight(store.code)"/>
        <td
            v-html="highlight(store.name)"/>
        <td>
            {{ store.open_at }} - {{ store.close_at }}
        </td>
        <td>
            <time
                :datetime="store.created_at"
                :title="fromNow(store.created_at)">
                {{ formatTimestamp(store.created_at) }}
            </time>
        </td>
        <td>
            <router-link
                class="xb-link"
                :to="{
                    name: 'stores/show',
                    params: {
                        storeId: store.id,
                    }
                }">
                详情
            </router-link>
            <button
                class="text-red-600 ml-2"
                type="button"
                @click="show = true">
                移除门店
            </button>
        </td>
    </tr>

    <custom-dialog
        prevent
        hide-closer
        v-model="show">

        <template
            #title>
            移除门店
        </template>

        <form
			@submit.prevent="destroyStore">
			<p>
				确认移除门店	
				<i
					class="font-bold">
					{{ store.name }}
				</i>
				？
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
import { useTime } from '~/composables/time.js';
import axios from '~/plugins/axios.js';

const CustomDialog = defineAsyncComponent(
    () => import('~/components/custom-dialog.vue')
);

const props = defineProps({
    playlist: {
        type: Object,
        required: true
    },
    store: {
        required: true,
        type: Object,
    },
    highlight: {
        required: true,
        type: Function,
    }
});

const emits = defineEmits([
    'destroyed'
]);

let { 
    loading, 
    form, 
    handleFormErrors,
} = useForm();

let {
    formatDuration,
    fromNow,
    formatTimestamp,
} = useTime();

let show = ref(false);

const destroyStore = () => {
	loading.value = true;
	axios.delete(
			`/playlists/${props.playlist.id}/stores/${props.store.id}`,
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