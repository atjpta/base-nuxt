<template>
    <div class=" w-[calc(100vw-328px)] min-w-full lg:w-full overflow-auto sm:p-5 mx-auto">
        <div class="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 w-fit mx-auto">
            <component class=" p-5" v-for="(data, index) in listData" :key="index" @refreshData="refreshCb" :data="data"
                :is="cpn" />
        </div>
    </div>
</template>

<script setup lang="ts">


const { t } = useI18n();

const props = defineProps<{
    listData: any[];
    cpn: Component;
    listTitle: string[];
    refreshCb: any; // function
}>();

</script>

<style></style>