import { defineAsyncComponent, ref, shallowRef, watch, onBeforeMount, computed, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import axios from '~/plugins/axios.js';
import { cloneDeep } from 'lodash';

export const usePaginate = api => {

	const Paginator = defineAsyncComponent(() =>
		import('~/components/paginator.vue')
	);

	const Filters = defineAsyncComponent(() => 
		import('~/components/filters.vue')
	);

	const route = useRoute();

	let query = computed(() => route.query),
		response = shallowRef({}),
		data = computed(() => response.value.data),
		loading = ref(false);
		
	const refreshData = async () => {
		
		loading.value = true;

		response.value = await axios.get(api, {params: query.value});

		loading.value = false;
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

	const stop = watch(
		() => {
			return {
				query: query.value,
				route: route.name,
			}
		},
		(value, old) => {
			if (
				value.route === old.route 
			) {
				refreshData();
			}
		}
	);

	onBeforeUnmount(() => {
		stop();
	});

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