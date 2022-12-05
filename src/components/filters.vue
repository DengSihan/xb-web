<template>
	<form
		class="my-4"
		@submit.prevent="search">
		<xb-input
			name="keyword"
			type="search"
			:placeholder="`
				<i class='mdi mdi-magnify pr-2'></i>搜索 ${searchLabel}
			`"
			v-model="form.keyword"/>
	</form>
	<section
		:class="{
			'my-4': computedOptionsables.length
		}">
		<nav
			v-for="{label, key, options} in computedOptionsables"
			class="flex items-center mb-4 -mx-1">
			<span
				class="w-[8rem] mx-1"
				v-html="label"/>
			<router-link
				v-for="{label, value} in options"
				:key="`${key}-${value}`"
				:to="getOptionRoute(key, value)"
				custom
				v-slot="{ route, href, navigate }">
				<a
					class="text-sm p-1 rounded mx-1"
					:href="href"
					:class="[
						currentFullPath === route.fullPath ? 'text-white bg-blue-600' : ''
					]"
					@click="navigate"
					v-wave="currentFullPath !== route.fullPath"
					v-html="label"/>
			</router-link>
		</nav>
	</section>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, computed, watch } from 'vue';
import { pick, cloneDeep } from 'lodash';

const route = useRoute(),
	router = useRouter();

const form = ref({
	keyword: route.query.keyword ?? '' 
});

const keywordInRoute = computed(() => {
	return route.query.value
		? route.query.value
		: '';
});

let props = defineProps({
	searchLabel: {
		required: false,
		type: String,
		default: '关键词'
	},
	optionsables: {
		required: false,
		type: Array,
		default: () => [],
		validator: columns => {
			columns.forEach(order => {
				if (
					!('label' in optionsable) ||
					!('options' in optionsable) ||
					!('key' in optionsable)
				) return false;
			});

			return true;
		}
	},
	orderables: {
		required: false,
		type: Array,
		default: () => [
			{
				label: '最新创建',
				value: 'created_at_desc',
			},
			{
				label: '最早创建',
				value: 'created_at_asc',
			},
			{
				label: '最近更新',
				value: 'updated_at_desc',
			},
			{
				label: '最早更新',
				value: 'updated_at_asc',
			},
		]
	},
	disabledOrders: {
		required: false,
		type: Boolean,
		default: false,
	}
});

const search = () => {
	router.push({
		...route,
		query: form.value.keyword
			? { keyword: form.value.keyword }
			: {}
	});
}

watch(
	() => keywordInRoute,
	(keyword) => {
		if(form.value.keyword !== keyword) {
			form.value = {
				keyword
			};
		}
	}
);

const getOptionRoute = (key, value) => {
	let query = cloneDeep(route.query);

	if (value !== (query[key] ?? '')) {
		delete query.page;
		query[key] = value;
	}
	
	if (!value) {
		delete query[key];
	}

	return {
		...pick(route, ['name', 'params']),
		query,
	};
};

const computedOptionsables = computed(() => {
	let optionsables = props.optionsables;

	if (!props.disabledOrders) {
		optionsables.push({
			label: '排序方式',
			key: 'order',
			options: [
				{
					label: '默认排序',
					value: '',
				},
				...props.orderables
			],
		});
	}

	return optionsables;
});

const currentFullPath = computed(() => {
	return route.fullPath;
});

</script>

<script>



export default {

	inheritAttrs: false,
}
</script>