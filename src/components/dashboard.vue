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
				class="block flex items-center font-bold text-lg tracking-widest h-16 px-4 border-b"
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
				:to="{
					name: 'stores'
				}"
				custom
				v-slot="{ isActive, href, navigate, route }">
				<a
					class="block p-3 mb-2 rounded"
					:href="href"
					:class="[
						(isActive || $route.path.startsWith(route.fullPath) )
							? 'bg-slate-200 text-slate-900'
							: 'bg-slate-100 hover:bg-slate-200 text-slate-700'
					]"
					@click.prevent="nav(navigate)"
					v-wave>
					<i
						class="mdi mdi-store mr-2"></i>
					门店管理
				</a>
			</router-link>

			<router-link
				:to="{
					name: 'playlists'
				}"
				custom
				v-slot="{ isActive, href, navigate, route }">
				<a
					class="block p-3 mb-2 rounded"
					:href="href"
					:class="[
						(isActive || $route.path.startsWith(route.fullPath) )
							? 'bg-slate-200 text-slate-900'
							: 'bg-slate-100 hover:bg-slate-200 text-slate-700'
					]"
					@click.prevent="nav(navigate)"
					v-wave>
					<i
						class="mdi mdi-playlist-music mr-2"></i>
					播放列表管理
				</a>
			</router-link>

			<router-link
				:to="{
					name: 'tokens'
				}"
				custom
				v-slot="{ isActive, href, navigate, route }">
				<a
					class="block p-3 mb-2 rounded"
					:href="href"
					:class="[
						(isActive || $route.path.startsWith(route.fullPath) )
							? 'bg-slate-200 text-slate-900'
							: 'bg-slate-100 hover:bg-slate-200 text-slate-700'
					]"
					@click.prevent="nav(navigate)"
					v-wave>
					<i
						class="mdi mdi-fingerprint mr-2"></i>
					授权管理
				</a>
			</router-link>

		</nav>

		<footer
			class="h-12 block text-xs text-slate-600 flex items-center px-4">
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
					{{ company.name }}
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
						@click="confirm = false"
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
			class="h-[calc(100vh-theme('space.16'))] overflow-y-auto px-4">
			<router-view/>

			<footer
				class="mt-4 border-t-[3px] border-slate-100 pt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

				<section>
					<h3
						class="text-lg mb-2 font-semibold">
						广播云
					</h3>
					<nav
						class="pl-6 text-sm">
						<a
							class="list-item w-fit mb-2"
							:href="`//${host}/`">
							主页		
						</a>
						<a
							class="list-item w-fit mb-2"
							:href="`//company.${host}/`">
							企业用户		
						</a>
						<a
							class="list-item w-fit mb-2"
							:href="`//store.${host}/`">
							门店用户		
						</a>
						<a
							class="list-item w-fit mb-2"
							:href="`//admin.${host}/`">
							管理员		
						</a>
					</nav>
				</section>

				<section>
					<h3
						class="text-lg mb-2 font-semibold">
						客户端
					</h3>
					<nav
						class="pl-6 text-sm">
						<router-link
							class="mb-2 list-item w-fit"
							:to="{
								name: 'apps'
							}">
							Electron 版
						</router-link>
						<router-link
							class="mb-2 list-item w-fit"
							:to="{
								name: 'apps'
							}">
							Web PWA 版
						</router-link>
					</nav>
				</section>

				<section>
					<h3
						class="text-lg mb-2 font-semibold">
						相关信息
					</h3>
					<nav
						class="pl-6 text-sm">
						<router-link
							class="mb-2 list-item w-fit"
							:to="{
								name: 'private-policy'
							}">
							隐私政策
						</router-link>
						<router-link
							class="mb-2 list-item w-fit"
							:to="{
								name: 'private-policy'
							}">
							CHANGELOG
						</router-link>
						<router-link
							class="mb-2 list-item w-fit"
							:to="{
								name: 'private-policy'
							}">
							SITEMAP
						</router-link>
					</nav>
				</section>
				
				<section>
					<h3
						class="text-lg mb-2 font-semibold">
						关于我们
					</h3>
					<nav
						class="pl-6 text-sm">
						<router-link
							class="mb-2 list-item w-fit"
							:to="{
								name: 'private-policy'
							}">
							商务合作
						</router-link>
						<router-link
							class="mb-2 list-item w-fit"
							:to="{
								name: 'apps'
							}">
							联系我们
						</router-link>
					</nav>
				</section>
				
			</footer>

			<p
				class="text-xs py-4 flex items-center justify-center">
				<img
					class="w-4 h-4 mr-2"
					src="/logo-xs.png">
				广播云 Copyright © {{ year }} 重庆相对科技有限公司
			</p>

		</div>
		

	</main>

</template>

<script setup>

import { ref, defineAsyncComponent, computed } from 'vue';
import { useForm } from '~/composables/form.js';
import { useRouter } from 'vue-router';
import { useAuth } from '~/plugins/mode.js';
import axios from '~/plugins/axios.js';

const year = (new Date()).getFullYear();

const CustomDialog = defineAsyncComponent(() => import('~/components/custom-dialog.vue'));

const showLogoutDialog = ref(false);

const router = useRouter();

const company = computed(() => useAuth()?.company);

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

</script>

<script>
import resolveConfig from 'tailwindcss/resolveConfig'


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