<template>

	<header
		class="my-4 text-sm">
		<button
			class="ml-auto block"
			type="button"
			@click="show = true">
			添加门店
		</button>
	</header>
	
	<custom-dialog
		v-model="show"
		prevent
		hide-closer>
		
		<template
			#title>
			添加门店
		</template>

		<tabs
			:tabs="[
				{
					label: '添加单个门店',
					value: 'store-single-store-form',
				},
				{
					label: '添加所有门店',
					value: 'store-all-stores-form',
				},
			]"
			v-model="formType"/>

		<component
			:is="formType"
			:playlist="playlist"
			@stored="handleStored"
			@close-dialog="show = false"/>

	</custom-dialog>

</template>

<script setup>

import { defineAsyncComponent, ref } from 'vue';


const CustomDialog = defineAsyncComponent(
	() => import('~/components/custom-dialog.vue')
);

const Tabs = defineAsyncComponent(
	() => import('~/components/button-tabs.vue')
);

const props = defineProps({
	playlist: {
		required: true,
		type: Object,
	}
});

let show = ref(false);

let formType = ref('store-single-store-form');

const emits = defineEmits([
	'stored'
]);

const handleStored = () => {
	show.value = false;
	emits('stored');
}

</script>

<script>

import storeSingleStoreForm from './store-single-store-form.vue';
import storeAllStoresForm from './store-all-stores-form.vue';

export default {

	inheritAttrs: false,

	components: {
		storeSingleStoreForm,
		storeAllStoresForm,
	}
}
</script>