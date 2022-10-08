<template>
	<header
		class="w-[1280px] mx-auto py-4 flex justify-between items-center">
		
		<router-link
			class="flex items-center mx-4"
			:to="{
				name: 'index'
			}">
			<img
				class="w-10 h-10 inline-block"
				src="/logo.png"
				alt="广播云">
			<h1
				class="tracking-widest font-black px-4 text-xl">
				广播云
			</h1>
		</router-link>

		<nav
			class="flex items-center mx-4">

			<router-link
				class="text-slate-700 mx-4"
				:to="{
					name: 'win-win'
				}">
				<i class="mdi mdi-handshake pr-1"></i>
				商务合作
			</router-link>
			
			<router-link
				class="text-slate-700 mx-4"
				:to="{
					name: 'download'
				}">
				<i class="mdi mdi-download pr-1"></i>
				客户端下载
			</router-link>

			<span
				class="inline-block mx-4 border-r-2 border-slate-300 h-8 w-2"/>

			<a
				class="text-slate-700 mx-4"
				:href="`//company.${domain}`">
				<i class="mdi mdi-login-variant pr-1"></i>
				登录
			</a>

		</nav>

	</header>
</template>

<script setup>
const domain = import.meta.env.VITE_APP_HOST;
</script>