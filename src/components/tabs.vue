<style lang="scss">
	.tabs::after {
		@apply block w-[var(--marker-width)] translate-x-[var(--marker-position-offset)] h-[3px] absolute left-0 bottom-0 z-10 bg-blue-600 transition-[transform] origin-center;
		content: ' ';
	}
</style>

<template>
	<nav
		:style="{
			'--option-width': `${(1 / (links.length || 1)).toFixed(2) * 100}%`,
			'--marker-width': `${(1 / (links.length || 1)).toFixed(2) * 50}%`,
			'--marker-position-offset': `${(valueIndex * 200 + 50)}%`, 
		}"
		class="flex relative tabs">
		<router-link
			v-for="{label, route} in links"
			:to="route"
			custom
			v-slot="{ href, navigate, isActive, route }">
			<a
				class="py-3 border-b-[3px] border-slate-100 w-[var(--option-width)] text-center"
				:class="{
					'text-blue-600 hover:text-blue-400 bg-blue-100/50': route.name === $route.name,
					'text-slate-600 hover:text-slate-400': route.name !== $route.name,
				}"
				:href="href"
				@click="navigate"
				v-html="label"
				v-wave/>
		</router-link>
	</nav>
</template>

<script>
export default {

	props: {
		links: {
			required: true,
			type: Array,
			validator: links => {
				links.forEach(link => {
					if (
						!('label' in link) ||
						!('route' in link)
					) return false;
				});

				return true;
			}
		},
	},

	computed: {
		valueIndex() {
			return this.links.findIndex(({ route }) => route.name === this.$route.name);
		}
	}

}
</script>