<template>
	<metainfo>
		<template
			v-slot:title="{ content, metainfo }">
			{{
				metainfo?.titleTemplate
					? metainfo.titleTemplate.replace('%s', content)
					: content
			}}
		</template>
	</metainfo>
	<notifications-wrapper/>
	<router-view/>
</template>

<script setup>
import NotificationsWrapper from '~/components/notifications-wrapper.vue';
</script>