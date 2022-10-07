<template>
	<footer
		class="flex items-center justify-between">
		
		<p
			class="flex items-center">
			<span>
				共有 {{ paginate.total }} 条数据
			</span>
			<slot/>
		</p>

	</footer>
</template>

<script>
export default {

	props: {
		paginate: {
			required: true,
		}
	}
}
</script>