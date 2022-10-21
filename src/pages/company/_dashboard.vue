<template>
	<dashboard/>
</template>
<script setup>
import { useMeta } from	'vue-meta';
import { defineAsyncComponent } from 'vue';

useMeta({
	titleTemplate: '%s - 广播云',
});

const Dashboard = defineAsyncComponent(() =>
	import('~/components/dashboard.vue')
);
</script>