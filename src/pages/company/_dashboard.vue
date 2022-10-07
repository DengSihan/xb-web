<template>
	<dashboard/>
</template>
<script setup>
import { defineAsyncComponent } from 'vue';

const Dashboard = defineAsyncComponent(() =>
	import('~/components/dashboard.vue')
);
</script>