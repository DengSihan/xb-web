<style lang="scss">
	.tabs::after {
		@apply block w-[var(--marker-width)] translate-x-[var(--marker-position-offset)] h-[3px] absolute left-0 bottom-0 z-10 bg-blue-600 transition-[transform] origin-center;
		content: ' ';
	}
</style>

<template>
	<nav
		:style="{
			'--option-width': `calc(100%/${tabs.length || 1})`,
			'--marker-width': `calc(50%/${tabs.length || 1})`,
			'--marker-position-offset': `${(valueIndex * 200 + 50)}%`, 
		}"
		class="flex relative tabs">
		<button
			v-for="{label, value} in tabs"
			:to="value"
            class="py-3 border-b-[3px] border-slate-100 w-[var(--option-width)] text-center"
            :class="{
                'text-blue-600 hover:text-blue-400 bg-blue-100/50': value === modelValue,
                'text-slate-600 hover:text-slate-400': value !== modelValue,
            }"
            v-html="label"
            v-wave
            @click="computedValue = value"/>
	</nav>
</template>

<script>
export default {

	props: {
		tabs: {
			required: true,
			type: Array,
			validator: tabs => {
				tabs.forEach(tab => {
					if (
						!('label' in tab) ||
						!('value' in tab)
					) return false;
				});

				return true;
			}
		},
        modelValue: {
            required: true,
        },
	},

    emits: [
        'update:modelValue'
    ],

    computed: {
        computedValue: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            }
        },
        valueIndex() {
            return this.tabs.findIndex(tab => tab.value === this.modelValue);
        },
    },

}
</script>