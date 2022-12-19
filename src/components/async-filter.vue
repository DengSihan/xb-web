<template>
    <nav
        class="flex items-start mb-2">
        <span
            class="w-[8rem] leading-8"
            v-html="label"/>
        <div
            class="w-[calc(100%-8rem)] -m-1">
            <router-link
                :to="getOptionRoute(null)"
                custom
                v-slot="{ route, href, navigate }">
                <a
                    class="text-sm p-1 rounded m-1 inline-block whitespace-nowrap"
                    :href="href"
                    :class="[
                        currentFullPath === route.fullPath ? 'text-white bg-blue-600' : ''
                    ]"
                    @click="navigate"
                    v-wave="currentFullPath !== route.fullPath"
                    v-html="nullLabel"/>
            </router-link>
            <router-link
                v-for="{label, value} in options"
                :key="`${param}-${value}`"
                :to="getOptionRoute(value)"
                custom
                v-slot="{ route, href, navigate }">
                <a
                    class="text-sm p-1 rounded m-1 inline-block whitespace-nowrap"
                    :href="href"
                    :class="[
                        currentFullPath === route.fullPath ? 'text-white bg-blue-600' : ''
                    ]"
                    @click="navigate"
                    v-wave="currentFullPath !== route.fullPath"
                    v-html="label"/>
            </router-link>
        </div>
    </nav>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, computed, watch, onBeforeMount } from 'vue';
import { pick, cloneDeep } from 'lodash';
import axios from '~/plugins/axios.js';

const route = useRoute(),
	router = useRouter();

let props = defineProps({
    api: {
        required: true,
        type: String,
    },
    label: {
        required: true,
        type: String,
    },
    param: {
        required: true,
        type: String,
    },
    nullLabel: {
        required: false,
        type: String,
        default: '全部'
    }
});

const options = ref([]);

onBeforeMount(() => {
    axios.get(props.api)
        .then(({ data }) => {
            options.value = data;
        });
});

const getOptionRoute = (value) => {

	let query = cloneDeep(route.query);

	if (value !== (query[props.param] ?? '')) {
		delete query.page;
		query[props.param] = value;
	}
	
	if (!value) {
		delete query[props.param];
	}

	return {
		...pick(route, ['name', 'params']),
		query,
	};
};


const currentFullPath = computed(() => {
	return route.fullPath;
});


</script>