<style lang="scss">
.paginator a {
	@apply w-10 h-10 border inline-block mx-1 rounded text-center leading-10 transition-[transform];

	&:not([disabled="true"]) {
		@apply scale-100 hover:scale-[102%] active:scale-[98%];
	}

	&.page-index[disabled="true"] {
		@apply bg-blue-600 text-white;
	}
}
</style>

<template>
	<footer
		class="flex items-center justify-between paginator">
		
		<p
			class="flex items-center">
			<span>
				共有 {{ paginate.total }} 条数据
			</span>
			<slot/>
		</p>

		<nav
			class="-mx-1 flex items-center">
			
			<router-link
				:to="previousRoute"
				:disabled="previousPage === 1"
				v-wave="previousPage !== 1">
				<i
					class="mdi mdi-chevron-left text-2xl leading-10"></i>
			</router-link>

			<template
				v-for="page in pagesNeedToBeDisplay">
				<span
					v-if="
						page === (paginate.last_page - 2)
						&& currentPage < (paginate.last_page - 4)"
					class="mx-1">
					<i
						class="mdi mdi-dots-horizontal"></i>
				</span>
				<router-link
					class="page-index"
					:to="page !== 1
						? {
							...$route,
							query: {
								...$route.query,
								page
							}
						}
						: firstRoute"
					:style="{
						'font-size': `${Math.pow(1.1, (-1 * page.toString().length) + 1) * 100}%`
					}"
					:disabled="page === currentPage"
					v-wave="page !== currentPage">
					{{ page }}	
				</router-link>
				<span
					v-if="
						page === 3
						&& currentPage > 5"
					class="mx-1">
					<i
						class="mdi mdi-dots-horizontal"></i>
				</span>
			</template>
			
			<router-link
				:to="nextRoute"
				:disabled="nextPage === paginate.last_page"
				v-wave="nextPage !== paginate.last_page">
				<i
					class="mdi mdi-chevron-right text-2xl leading-10"></i>
			</router-link>

		</nav>

	</footer>
</template>

<script>

import lodash from 'lodash';

export default {

	props: {
		paginate: {
			required: true,
		}
	},

	computed: {

		currentPage() {
			return parseInt(this.$route.query.page ?? 1);
		},

		firstRoute () {
			let route = {
				...this.$route
			};

			delete route.query.page;

			return route;
		},

		previousRoute () {
			let route = {
				...this.$route,
				query: {
					...this.$route.query,
					page: this.previousPage === 1
						? 1
						: this.previousPage
				}
			};

			if (route.query.page === 1) {
				delete route.query.page;
			}

			return route;
		},
		nextRoute () {
			let route = {
				...this.$route,
				query: {
					...this.$route.query,
					page: this.nextPage
				}
			};
			
			return route;
		},

		previousPage() {
			return this.currentPage > 1
				? this.currentPage - 1
				: 1;
		},
		nextPage() {
			return this.currentPage >= this.paginate.last_page
				? this.paginate.last_page
				: this.currentPage + 1;
		},
		pagesNeedToBeDisplay() {
			return Array
				.apply(null, Array(this.paginate.last_page))
				.map((x, i) => i + 1)
				.filter(i => {
					return i < 4
						|| (this.paginate.last_page - i) < 3
						|| Math.abs(i - this.currentPage) < 2;
				});
		}
	}
}
</script>