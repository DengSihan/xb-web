import { defineAsyncComponent, ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from '~/plugins/axios.js';

export const usePaginate = api => {

	const Paginator = defineAsyncComponent(() =>
		import('~/components/paginator.vue')
	);

	const { query } = useRoute();

	let data = ref({}),
		loading = ref(false);
		
	const refreshData = () => {
		loading.value = true;
		axios
			.get(api, query)
			.then(({ data:response }) => {
				data.value = response;
			})
			.finally(() => loading.value = false);
	};

	watch(() => query, () => refreshData());

	onMounted(() => {
		refreshData();
	});

	return {
		Paginator,
		data,
		loading,
		refreshData,
	};
};