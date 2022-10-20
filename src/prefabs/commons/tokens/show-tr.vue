<template>

    <tr>
        <td
            class="text-xs font-mono max-w-[300px]"
            v-html="highlight(token.name.split(')').join(')<br>'))"/>
        <td
            class="text-sm font-mono"
            v-html="highlight(token.ip)"/>
        <td
            class="text-sm">
            {{ token.ip_location }}
        </td>
        <td>
            <time
                class="text-xs font-mono"
                :datetime="token.created_at"
                :title="fromNow(token.created_at)">
                {{ formatTimestamp(token.created_at) }}
            </time>
        </td>
        <td>
            <time
                class="text-xs font-mono"
                :datetime="token.last_used_at"
                :title="fromNow(token.last_used_at)">
                {{ formatTimestamp(token.last_used_at) }}
            </time>
        </td>
        <td>
            <button
                @click="show = true"
                class="text-red-600"
                type="button">
                吊销
            </button>
        </td>
    </tr>

    <custom-dialog
        v-model="show"
        prevent
        hide-closer>

        <template
            #title>
            吊销授权
        </template>

        <form
			@submit.prevent="destroyToken">

			<p
                class="font-bold">
				您确定吊销此授权？
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
					吊销
				</xb-button>

			</footer>

		</form>

    </custom-dialog>

</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue';
import { useForm } from '~/composables/form.js';
import { useTime } from '~/composables/time.js';
import axios from '~/plugins/axios.js';

const CustomDialog = defineAsyncComponent(() => import('~/components/custom-dialog.vue'));

const props = defineProps({
    token: {
        type: Object,
        required: true,
    },
    highlight: {
        type: Function,
        required: true,
    },
});

const emits = defineEmits(['destroyed']);

let {
    loading,
    handleFormErrors,
} = useForm();

const {
	fromNow,
	formatTimestamp,
} = useTime();

const destroyToken = () => {
    loading.value = true;
    axios.delete(`/auth/tokens/${props.token.id}`)
        .then(() => {
            loading.value = false;
            emits('destroyed');
        })
        .catch(errors => {
            handleFormErrors(errors);
        })
        .finally(() => {
            loading.value = false;
        });
};

let show = ref(false);


</script>