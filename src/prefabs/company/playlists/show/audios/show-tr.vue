<template>

	<tr>
		<td>
			{{ audio.id }}
		</td>
		<td>
			{{ highlight(audio.name) }}
		</td>
		<td>
			{{ audio.category }}
		</td>
		<td>
			{{ audio.duration }}
		</td>
		<td>
			{{ audio.size }}
		</td>
		<td>
			<time
				:datetime="audio.created_at"
				:title="fromNow(audio.created_at)">
				{{ formatTimestamp(audio.created_at) }}
			</time>
		</td>
		<td>
			<button
				class="xb-link"
				type="button"
				@click="show = true">
				详情
			</button>
		</td>
	</tr>
	
	<custom-dialog
		v-model="show">
		
		<template
			#title>
			音频详情
		</template>

		<section>
			
		</section>

	</custom-dialog>

</template>

<script setup>

import { ref, defineAsyncComponent } from 'vue';
import { useForm } from '~/composables/form.js';
import { useTime } from '~/composables/time.js';
import axios from '~/plugins/axios.js';

const {
	formatDuration,
	fromNow,
	formatTimestamp,
} = useTime();

const CustomDialog = defineAsyncComponent(
	() => import('~/components/custom-dialog.vue')
);

let props = defineProps({
	audio: {
		required: true,
		type: Object,
	},
	highlight: {
		required: false,
		type: Function
	},
});

let emits = defineEmits([
	'destroied'
]);

let show = ref(false);

let {
	form,
	handleFormErrors,
	loading,
} = useForm();

const destroyPlaylist = () => {
	// loading.value = true;
	// axios.delete(
	// 		`/stores/${props.store.id}/playlists/${props.playlist.id}`,
	// 	)
	// 	.then(({ data }) => {
	// 		show.value = false;
	// 		emits('destroied');
	// 	})
	// 	.catch(errors => {
	// 		handleFormErrors(errors);
	// 	})
	// 	.finally(() => {
	// 		loading.value = false;
	// 	});
}
</script>

<script>
export default {

	inheritAttrs: false,
}
</script>