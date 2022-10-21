<template>
	<metainfo>
		<template v-slot:title="{ content }">{{ content }} - 广播云</template>
    </metainfo>
	<notifications-wrapper/>
	<router-view/>
</template>

<script setup>
import NotificationsWrapper from '~/components/notifications-wrapper.vue';
</script>