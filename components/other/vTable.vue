<template>
    <div
        class=" w-[calc(100vw-328px)] min-w-full lg:w-full overflow-auto  bg-gradient-to-r from-green-400/10 via-cyan-400/10 to-blue-400/10 rounded-2xl p-5">
        <div class="">
            <table class="table w-full ">
                <thead>
                    <tr>
                        <th></th>
                        <th v-for="(title, index) in listTitle" :key="index">
                            <div>{{ t(title) }}</div>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="">
                    <component class=" hover:bg-gradient-to-l from-green-400/20 via-cyan-400/20 to-blue-400/20 px-10"
                        v-for="(data, index) in listData" :key="index" @refreshData="refreshCb" :data="data" :is="cpn" />
                </tbody>
            </table>
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