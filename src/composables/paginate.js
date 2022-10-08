import { defineAsyncComponent, ref, watch, onBeforeMount, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from '~/plugins/axios.js';

export const usePaginate = api => {

	const Paginator = defineAsyncComponent(() =>
		import('~/components/paginator.vue')
	);

	const route = useRoute();

	let query = computed(() => route.query),
		data = ref({}),
		loading = ref(false);
		
	const refreshData = () => {
		loading.value = true;
		axios
			.get(api, {params: query.value})
			.then(({ data:response }) => {
				data.value = response;
				document.querySelector('#dashboard-content')?.scrollTo({ top:0 });
			})
			.finally(() => {
				loading.value = false
			});
	};

	watch(
		() => query.value,
		() => {
			refreshData();
		}
	);

	onBeforeMount(() => {
		refreshData();
	});

	return {
		Paginator,
		data,
		loading,
		refreshData,
	};
};