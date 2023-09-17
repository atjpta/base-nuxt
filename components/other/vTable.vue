<template>
    <div class="">
        <div class="overflow-x-auto">
            <table class="table table-zebra">
                <thead>
                    <tr>
                        <th v-for="(title, index) in listTitle" :key="index">
                            <div>{{ t(title) }}</div>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <component v-for="(data, index) in listData" :key="index" @refreshData="refreshCb" :data="data"
                        :is="cpn" />
                </tbody>
            </table>
            <div class="m-5 flex justify-center">
                <OtherVPagination @getMore="getMoreCb" :total="total.valueOf()" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">


const { t } = useI18n();

const props = defineProps<{
    total: Number;
    listData: any[];
    cpn: Component;
    listTitle: string[];
    getMoreCb: any; // function
    refreshCb: any; // function
}>();

</script>

<style></style>