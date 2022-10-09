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
		class="my-4">
		<nav
			v-for="{label, key, options} in computedOptionsables"
			class="flex items-center mb-4 -mx-1">
			<span
				class="w-[8rem] mx-1"
				v-html="label"/>
			<router-link
				v-for="{label, value} in options"
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

</script>

<script>
export default {

	inheritAttrs: false,

	props: {
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
	},

	computed: {
		computedOptionsables() {
			return [
				...this.optionsables,
				{
					label: '排序方式',
					key: 'order',
					options: [
						{
							label: '默认排序',
							value: '',
						},
						{
							label: '最新创建',
							value: 'created_at_desc',
						},
						{
							label: '最早创建',
							value: 'created_at_asc',
						},
						{
							label: '最进更新',
							value: 'updated_at_desc',
						},
						{
							label: '最早更新',
							value: 'updated_at_asc',
						},
					]
				}
			];
		},
		currentFullPath() {
			return this.$route.fullPath;
		},
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

			let route = {
				...this.$route,
				query: {
					...this.$route.query ?? {}, 
				}
			};

			if (this.$route.query[key] !== value) {
				delete route.query.page;
			}

			value
				? route.query[key] = value
				: delete route.query[key];

			return route;
		}
	}
}
</script>