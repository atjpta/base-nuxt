<template>
    <div class="flex justify-center flex-wrap gap-5 ">
        <div class="stats shadow cursor-pointer w-72" @click="navigateTo(data.url)">
            <div class="stat p-6">
                <div class="stat-figure text-primary text-2xl">
                    <font-awesome-icon :icon="['fas', data.icon]" />
                </div>
                <div class="stat-title text-2xl uppercase font-bold">{{ t(data.title) }}</div>
                <div v-if="data.data" class="stat-value text-success">{{ data.data }}</div>
                <div v-else class="loading loading-lg">

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface IStat {
    title: string
    icon: string
    data: string
    url: string
}
const props = defineProps<{ data: IStat }>();
const { t } = useI18n()

</script>