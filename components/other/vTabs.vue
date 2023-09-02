<template>
    <div>
        <div>
            <div class="tabs tabs-boxed w-fit bg-transparent">
                <nuxtLink :to="i.url" v-for="i in list" :key="i.title" class="tab hover:bg-base-300">
                    {{ t(i.title) }}
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

const { t } = useI18n();

const list = computed(() => {
    return props.tabs.filter((e) => e.isShow);
});

interface ITabs {
    url: string;
    title: string;
    isShow: boolean;
}
</script>

<style></style>
