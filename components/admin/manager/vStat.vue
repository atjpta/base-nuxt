<template>
    <div class="flex justify-center flex-wrap gap-5">
        <div v-for="i in props.list" :key="i.title" class="stats shadow cursor-pointer" @click="navigateTo(i.url)">
            <div class="stat">
                <div class="stat-figure text-primary text-2xl">
                    <font-awesome-icon :icon="['fas', i.icon]" />
                </div>
                <div class="stat-title">{{ t(i.title) }}</div>
                <div class="stat-value text-success">{{ i.data }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    list: IStat[];
}>();
const { t } = useI18n()

interface IStat {
    title: string;
    icon: string;
    data: string;
    url: string
}
</script>