import { defineAsyncComponent, ref, watch, onBeforeMount, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from '~/plugins/axios.js';

export const usePaginate = api => {

	const Paginator = defineAsyncComponent(() =>
		import('~/components/paginator.vue')
	);

	const Filters = defineAsyncComponent(() => 
		import('~/components/filters.vue')
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

	const highlight = raw => {
		let { keyword = null } = route.query; 
		return keyword
			? (raw).toString().replace(
					new RegExp(keyword, 'g'),
					`<span class="bg-yellow-300 text-slate-900 rounded shadow-sm font-bold">${keyword}</span>`
				)
			: raw;
	}

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
		Filters,
		data,
		loading,
		refreshData,
		highlight,
	};
};