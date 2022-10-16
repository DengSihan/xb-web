<template>
	<teleport
		to="body">
		
		<transition
			name="dialog">
			
			<div
				v-if="modelValue"
				class="select-none fixed z-50 top-0 bottom-0 left-0 right-0 bg-slate-800/25 backdrop-blur overflow-y-auto"
				@click.self="prevent ? shakeDialog() : closeDialog()">

				<dialog
					class="
						dialog relative mx-auto rounded p-0 transition-[transform,filter] bg-white shadow
						my-4 sm:my-4 md:my-8 lg:my-16
						w-[calc(100%-theme('space.4'))] sm:w-[calc(100%-theme('space.4'))] md:w-2/3 lg:w-[520px]
					"
					:class="{
						'shaking': shaking,
					}"
					v-bind="$attrs"
					open>

					<header
						class="relative border-b-2 border-slate-200">
						<h3
							class="mr-16 px-6 text-lg font-bold h-16 leading-[4rem]">
							<slot
								name="title"/>
						</h3>
						<span
							class="right-2 top-1/2 absolute translate-y-[-50%]"
							v-if="!hideCloser">
							<button
								class="block h-12 w-12 text-center text-red-600 rounded"
								@click="closeDialog"
								aria-label="关闭模态框"
								v-wave>
								<i
									class="mdi mdi-close text-2xl"></i>
							</button>
						</span>
					</header>

					<section
						class="p-6">
						<slot/>
					</section>
				</dialog>
				
			</div>

		</transition>

	</teleport>
</template>

<style lang="scss">
.dialog-enter-active {
	transition: all .15s ease;
	.dialog {
		animation: rebound-dialog .2s
	}
}
.dialog-leave-active {
	transition: all .1s ease;
	.dialog {
		transition: all .1s ease;
	}
}

.dialog-enter-from,
.dialog-leave-to {
	opacity: 0;
	.dialog {
		transform: scale(0.7);
	}
}

.dialog.shaking {
	animation: shaking-dialog .15s;
}

@keyframes rebound-dialog {
	0%{
		transform: scale(0.8);
	}
	40%{
		transform: scale(1.02);
	}
	80%{
		transform: scale(.98);
	}
	100%{
		transform: scale(1);
	}
}

@keyframes shaking-dialog {
	0%{
		transform: translateX(10px);
		filter: drop-shadow(0px 0px 0px theme('colors.red.300'));
	}
	25%{
		transform: translateX(-8px);
		filter: drop-shadow(0px 0px 15px theme('colors.red.300'));
	}
	50% {
		transform: translateX(6px);
		filter: drop-shadow(0px 0px 12px theme('colors.red.300'));
	}
	75%{
		transform: translateX(-4px);
		filter: drop-shadow(0px 0px 9px theme('colors.red.300'));
	}
	100%{
		transform: translateX(0px);
		filter: drop-shadow(0px 0px 0px theme('colors.red.300'));
	}
}
</style>

<script setup>
import { ref } from 'vue';

let shaking = ref(false);

const props = defineProps({
	modelValue: {
		required: true,
		type: Boolean,
	},
	prevent: {
		required: false,
		default: false,
		type: Boolean,
	},
	hideCloser: {
		required: false,
		type: Boolean,
		default: false,
	},
	loading: {
		required: false,
		type: Boolean,
		default: false,
	},
});

const emits = defineEmits([
	'update:modelValue',
	'submit',
]);

const closeDialog = () => {
	emits('update:modelValue', false);
}

const shakeDialog = () => {
	shaking.value = true;
	setTimeout(() => {
		shaking.value = false;
	}, 400);
}
</script>

<script>
export default {
	inheritAttrs: false,
}
</script>