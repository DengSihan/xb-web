<template>

	<aside
		class="
			w-[60vw] sm:w-[60wv] md:w-[max(40vw,300px)] lg:w-[260px]
			h-screen
			fixed top-0 left-0 z-30
			bg-slate-100
		"
		:class="[
			activeSidebar
				? 'translate-x-0'
				: '-translate-x-full'
		]">

		<router-link
			:to="{
				name: 'index',
			}"
			custom
			v-slot="{ href, navigate }">
			<a
				class="flex items-center font-bold text-lg tracking-widest h-16 px-4 border-b"
				:href="href"
				@click.prevent="nav(navigate)">
				<img
					class="w-8 h-8 mr-4"
					src="/logo.png">
				广播云
			</a>
		</router-link>

		<nav
			class="h-[calc(100vh-theme('space.28'))] overflow-y-auto p-4">

			<router-link
				v-for="item in sidebar"
				:to="item.route"
				custom
				v-slot="{ isActive, href, navigate, route }">
				<a
					v-if="
						Object.keys(item).includes('allows')
							? item.allows.includes(mode)
							: true
					"
					class="block p-3 mb-2 rounded"
					:href="href"
					:class="[
						(isActive || $route.path.startsWith(route.fullPath) )
							? 'bg-slate-200 text-slate-900'
							: 'bg-slate-100 hover:bg-slate-200 text-slate-700'
					]"
					@click.prevent="nav(navigate)"
					v-html="item.label"
					v-wave/>
			</router-link>

		</nav>

		<footer
			class="h-12 text-xs text-slate-600 flex items-center px-4">
			Copyright © {{ year }} 重庆相对科技有限公司
		</footer>

	</aside>


	<div
		v-if="activeSidebar"
		@click="activeSidebar = false"
		aria-label="隐藏侧边栏"
		class="
			cursor-pointer
			block sm:block md:block lg:hidden
			backdrop-blur bg-slate-900/10
			fixed top-0 left-0 z-10
			w-screen h-screen
		"/>


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
					{{ name }}
				</strong>
				<button
					@click="showLogoutDialog = true"
					type="button"
					class="mx-2 w-12 h-12 rounded scale-100 hover:scale-[102%] active:scale-[98%] text-red-600"
					v-wave>
					<i
						class="mdi mdi-logout-variant text-2xl"></i>
				</button>
			</span>
			
		</header>

		<custom-dialog
			v-model="showLogoutDialog"
			:prevent="loading"
			:hide-closer="loading">
			<template
				#title>
				确认退出登录？
			</template>
			<form
				@submit.prevent="destroyCurrentToken">
				<p>
					您确认退出当前登录？
				</p>
				<footer
					class="flex justify-between mt-4">
					
					<xb-button
						class="w-24"
						scheme="info"
						@click="showLogoutDialog = false"
						type="button"
						:disabled="loading">
						取消
					</xb-button>

					<xb-button
						scheme="danger"
						class="min-w-24"
						:loading="loading">
						确认退出
					</xb-button>

				</footer>
			</form>
		</custom-dialog>

		<div
			id="dashboard-content"
			class="h-[calc(100vh-theme('space.28'))] overflow-y-auto px-4">
			
			<router-view/>

		</div>

		<footer
			class="h-12">
			<p
				class="text-xs flex items-center justify-center leading-4 py-4">
				<img
					class="w-4 h-4 mr-2"
					src="/logo-xs.png">
				广播云 Copyright © {{ year }} 重庆相对科技有限公司
			</p>
		</footer>
		

	</main>

</template>

<script setup>

import { ref, defineAsyncComponent } from 'vue';
import { useForm } from '~/composables/form.js';
import { useRouter } from 'vue-router';
import { useAuth } from '~/stores/auth.js';
import axios from '~/plugins/axios.js';
import getCurrentMode from '~/plugins/mode.js';

const mode = getCurrentMode();

const year = (new Date()).getFullYear();

const CustomDialog = defineAsyncComponent(() => import('~/components/custom-dialog.vue'));

const showLogoutDialog = ref(false);

const router = useRouter();

const {
	loading,
} = useForm();

const destroyCurrentToken = () => {
	loading.value = true;
	axios.delete(
			`/auth/token`
		)
		.then(() => {
			useAuth().clearAuth();
			router.push({
				name: 'login'
			});
		})
		.finally(() => {
			loading.value = false;
		});
};

const props = defineProps({
	sidebar: {
		required: false,
		type: Array,
		default: () => []
	},
	name: {
		required: false,
		type: String,
		default: ''
	}
});

</script>

<script>
import resolveConfig from 'tailwindcss/resolveConfig';


const { theme } = resolveConfig({});

const getCurrentBreakpoints = () => {
    return Object.keys(theme.screens).find(key => parseInt(theme.screens[key].replace('px', '')) > window.innerWidth);
}

export default {

	inheritAttrs: false,

	data() {
		return {
			activeSidebar: false,
			host: import.meta.env.VITE_APP_HOST
		}
	},

	mounted() {
		this.activeSidebar = !['xs', 'sm', 'md'].includes(getCurrentBreakpoints());
	},

	methods: {
		nav(navigate) {
			this.activeSidebar = !['xs', 'sm', 'md'].includes(getCurrentBreakpoints());
			navigate();
		}
	}

}
</script>