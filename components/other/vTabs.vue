<template>
    <div>
        <div>
            <div class="tabs tabs-boxed w-fit bg-transparent">
                <nuxtLink :to="i.url" v-for="i in props.tabs" :key="i.title" class="tab hover:bg-base-300">
                    {{ i.title }}
                </nuxtLink>
            </div>
            <div class="divider my-0"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    tabs: ITabs[];
}>();

interface ITabs {
    url: string;
    title: string;
}
</script>

<style></style>
