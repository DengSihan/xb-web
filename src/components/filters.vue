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
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const form = ref({
	keyword: useRoute().query.keyword ?? '' 
});

let { searchLabel, optionsables, orderables } = defineProps({
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

</script>

<script>

import { pick, cloneDeep } from 'lodash';

export default {

	inheritAttrs: false,

	computed: {
		computedOptionsables() {

			let optionsables = this.optionsables;

			if (!this.disabledOrders) {
				optionsables.push({
					label: '排序方式',
					key: 'order',
					options: [
						{
							label: '默认排序',
							value: '',
						},
						...this.orderables
					],
				});
			}

			return optionsables;
		},
		currentFullPath() {
			return this.$route.fullPath;
		},
	},

	watch: {
		'$route.query.keyword'(value) {
			if (this.form.keyword !== value) {
				this.form.keyword = value;
			}
		}
	},

	methods: {
		search() {
			this.$router.push({
				...this.$route,
				query: this.form.keyword
					? { keyword: this.form.keyword }
					: {}
			});
		},

		getOptionRoute(key, value) {

			let query = cloneDeep(this.$route.query);

			if (value !== (query[key] ?? '')) {
				delete query.page;
				query[key] = value;
			}
			
			if (!value) {
				delete query[key];
			}

			return {
				...pick(this.$route, ['name', 'params']),
				query,
			};
		}
	}
}
</script>