<template>
	<main>
		company index
	</main>
</template>

<script setup>
import { useMeta } from 'vue-meta';
import { useAuth } from '~/store/company/auth.js';

const { company } = useAuth();

useMeta({
	title: company.name,
});

</script>