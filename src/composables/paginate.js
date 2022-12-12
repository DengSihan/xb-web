import { defineAsyncComponent, ref, shallowRef, watch, onBeforeMount, onBeforeUnmount, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from '~/plugins/axios.js';

export const usePaginate = api => {

	const Paginator = defineAsyncComponent(() =>
		import('~/components/paginator.vue')
	);

	const Filters = defineAsyncComponent(() => 
		import('~/components/filters.vue')
	);

	const AsyncFilter = defineAsyncComponent(() =>
		import('~/components/async-filter.vue')
	);

	const route = useRoute();

	let query = computed(() => route.query),
		data = shallowRef({}),
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

	const stopWatchQuery = watch(
		() => {
			return {
				query: query.value,
				routeName: route.name
			}
		},
		(value, old) => {
			if (value.routeName === old.routeName) {
				refreshData();
			}
		}
	);

	onBeforeMount(() => {
		refreshData();
	});

	onBeforeUnmount(() => {
		stopWatchQuery();
	});

	return {
		Paginator,
		Filters,
		AsyncFilter,
		data,
		loading,
		refreshData,
		highlight,
	};
};