<template>

	<aside
		class="
			w-[70vw] sm:w-[70wv] md:w-[max(50vw,300px)] lg:w-[260px]
			h-screen
			fixed top-0 left-0
			bg-slate-100 shadow
		"
		:class="[
			activeSidebar
				? 'translate-x-0'
				: '-translate-x-full'
		]">
		
		<router-link
			class="block flex items-center font-bold text-lg tracking-widest h-16 px-4"
			:to="{
				name: 'index',
			}">
			<img
				class="w-8 h-8 mr-4"
				src="/logo.png">
			广播云
		</router-link>

		<nav
			class="h-[calc(100vh-theme('space.28'))] overflow-y-auto p-4">

			<router-link
				:to="{
					name: 'stores'
				}"
				custom
				v-slot="{ isActive, href, navigate }">
				<a
					class="block p-3 mb-2 border-l-4"
					:href="href"
					:class="[
						isActive
							? 'bg-slate-200 text-slate-900 border-slate-500 rounded-r'
							: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-transparent rounded'
					]"
					@click="navigate">
					<i
						class="mdi mdi-store mr-2"></i>
					门店管理
				</a>
			</router-link>

		</nav>

		<footer
			class="h-12 block text-xs text-slate-600 flex items-center px-4">
			Copyright © {{ year }} 重庆相对科技有限公司
		</footer>

	</aside>


	<main
		class="
			relative
		"
		:class="[
			activeSidebar
				? 'ml-0 sm:ml-0 md:ml-0 lg:ml-[260px]'
				: ''
		]">
		
		<header
			class="h-16 py-2 px-4 flex justify-between">

			<button
				@click="activeSidebar = !activeSidebar"
				type="button"
				class="w-12 h-12 rounded scale-100 hover:scale-[102%] active:scale-[98%]"
				v-wave>
				<i
					class="mdi mdi-menu text-2xl"></i>
			</button>


			<span
				class="flex items-center -mx-2">
				<strong
					class="mx-2 text-slate-800">
					{{ company.name }}
				</strong>
				<button
					type="button"
					class="mx-2 w-12 h-12 rounded scale-100 hover:scale-[102%] active:scale-[98%] text-red-600"
					v-wave>
					<i
						class="mdi mdi-logout-variant text-2xl"></i>
				</button>
			</span>
			
		</header>

		{{ activeSidebar }}

		<router-view/>
	</main>

</template>

<script setup>
const year = (new Date()).getFullYear();
</script>

<script>

import { useAuth } from '~/store/company/auth.js';
import resolveConfig from 'tailwindcss/resolveConfig'


const fullConfig = resolveConfig({});

console.log(fullConfig)

const getCurrentBreakpoints = () => {
    return Object.keys(fullConfig.theme.screens).find((key) => window.innerWidth > theme.screens[key]);
}

export default {

	inheritAttrs: false,

	data() {
		return {
			activeSidebar: false,
		}
	},

	computed: {
		company() {
			return useAuth().company;
		}
	},

	mounted() {
		this.activeSidebar = getCurrentBreakpoints() === 'lg';
	}

}
</script>