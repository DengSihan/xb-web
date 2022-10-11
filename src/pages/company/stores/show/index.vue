<template>
	<div
		class="grid grid-cols-3 gap-2 my-4 p-4 bg-slate-50 rounded">

		<p
			class="-mx-2 flex">
			<span
				class="mx-2 w-[8rem]">
				门店 ID
			</span>
			<span
				class="font-mono mx-2">
				{{ store.id }}
			</span>
		</p>

		<p
			class="-mx-2 flex">
			<span
				class="mx-2 w-[8rem]">
				门店编号
			</span>
			<span
				class="font-mono mx-2">
				{{ store.code }}
			</span>
		</p>

		<p
			class="-mx-2 flex">
			<span
				class="mx-2 w-[8rem]">
				门店名称
			</span>
			<span
				class="font-mono mx-2">
				{{ store.name }}
			</span>
		</p>

		<p
			class="-mx-2 flex">
			<span
				class="mx-2 w-[8rem]">
				开始营业时间
			</span>
			<span
				class="font-mono mx-2">
				{{ store.open_at }}
			</span>
		</p>

		<p
			class="-mx-2 flex">
			<span
				class="mx-2 w-[8rem]">
				结束营业时间
			</span>
			<span
				class="font-mono mx-2">
				{{ store.close_at }}
			</span>
		</p>

		<p
			class="-mx-2 flex">
			<span
				class="mx-2 w-[8rem]">
				最近活跃时间
			</span>
			<time
				class="font-mono mx-2"
				:datetime="store.token?.last_actived_at"
				:title="fromNow(store.token?.last_actived_at)">
				{{ formatTimestamp(store.token?.last_actived_at) }}
			</time>
		</p>

		<p
			class="-mx-2 flex">
			<span
				class="mx-2 w-[8rem]">
				客户端
			</span>
			<span
				class="font-mono mx-2">
				{{ store.token?.name }}
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
				:datetime="store.created_at">
				{{ formatTimestamp(store.created_at) }}
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
				:datetime="store.updated_at">
				{{ formatTimestamp(store.updated_at) }}
			</time>
		</p>

	</div>
</template>

<script setup>
import { useTime } from '~/composables/time.js';

let { store } = defineProps({
	store: {
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