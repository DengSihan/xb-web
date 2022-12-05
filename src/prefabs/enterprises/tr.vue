<template>

    <tr>
        <td
            v-html="highlight(enterprise.name)"/>
        <td
            class="font-mono"
            v-html="highlight(enterprise.code)"/>
        <td>
            {{ enterprise.count }}
        </td>
        <td>
            <time
                class="text-sm font-mono"
                :datetime="enterprise.created_at"
                :title="fromNow(enterprise.created_at)">
                {{ formatTimestamp(enterprise.created_at) }}
            </time>
        </td>
        <td>
            <router-link
                class="xb-link"
                :to="{
                    name: 'enterprises/show',
                    params: {
                        enterpriseId: enterprise.id,
                    }
                }">
                企业详情
            </router-link>
        </td>
    </tr>

</template>

<script setup>
import { useTime } from '~/composables/time.js';

const props = defineProps({
    enterprise: {
        type: Object,
        required: true,
    },
    highlight: {
        type: Function,
        required: true,
    },
});

const {
	fromNow,
	formatTimestamp,
} = useTime();

</script>