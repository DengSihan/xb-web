<template>
	<div
		class="grid grid-cols-3 gap-2 my-4 p-4 bg-slate-50 rounded">

		<p
			class="-mx-2 flex">
			<span
				class="mx-2 w-[8rem]">
				公司 ID
			</span>
			<span
				class="font-mono mx-2">
				{{ company.id }}
			</span>
		</p>

		<p
			class="-mx-2 flex">
			<span
				class="mx-2 w-[8rem]">
				公司编号
			</span>
			<span
				class="font-mono mx-2">
				{{ company.code }}
			</span>
		</p>

		<p
			class="-mx-2 flex">
			<span
				class="mx-2 w-[8rem]">
				公司名称
			</span>
			<span
				class="font-mono mx-2">
				{{ company.name }}
			</span>
		</p>

		<p
			class="-mx-2 flex">
			<span
				class="mx-2 w-[8rem]">
				创建时间
			</span>
			<time
				class="font-mono mx-2"
				:datetime="company.created_at">
				{{ formatTimestamp(company.created_at) }}
			</time>
		</p>

		<p
			class="-mx-2 flex">
			<span
				class="mx-2 w-[8rem]">
				最近更新时间
			</span>
			<time
				class="font-mono mx-2"
				:datetime="company.updated_at">
				{{ formatTimestamp(company.updated_at) }}
			</time>
		</p>

	</div>
</template>

<script setup>
import { useTime } from '~/composables/time.js';

let { company } = defineProps({
	company: {
		required: true,
	}
});

let {
	formatTimestamp,
	fromNow,
} = useTime();

</script>

<script>
export default {
	inheritAttrs: false,
}
</script>