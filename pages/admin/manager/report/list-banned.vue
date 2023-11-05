<template>
    <div class="">
        <div class="flex justify-between my-3">
            <OtherVSearch id="search-country-admin" @search="search" />
        </div>
        <SkeletonVTable v-if="isLoading" />

        <OtherVTable :is-user="false" class="" v-show="!isLoading" :refresh-cb="refreshData" :list-title="listTitle"
            :list-data="[...listData]" :cpn="AdminManagerVRecordBanned" />

        <div class="toast lg:right-[calc(50%-144px)] right-1/2 translate-x-1/2">
            <OtherVPagination @getMore="getMore" :total="total" />
        </div>
    </div>
</template>

<script setup>
import AdminManagerVRecordBanned from '~~/components/admin/manager/vRecordBanned';

const { t } = useI18n()
const useStatusComment = statusCommentStore()
const listTitle = ref([
    'user',
    'number of warning',
    'status',

])
const listData = ref([])
const total = ref(0)
const indexPage = ref(1)
const indexPageLimit = ref(1)
const isLoading = ref(false)
const key = ref('')

const getMore = async (page, limit) => {
    try {
        isLoading.value = true
        indexPage.value = page;
        indexPageLimit.value = limit
        const result = await useStatusComment.findAllBanned(page, limit);
        listData.value = result?.list;
        total.value = result?.total;
    } catch (error) {
        console.log(error);
    }
    finally {
        isLoading.value = false
    }
}

const refreshData = async () => {
    await getMore(indexPage.value, indexPageLimit.value)
}

const search = async (data) => {
    key.value = data
    await getMore(1, myConstant.PAGINATION.minLimit)
}

const getApi = async () => {
    try {
        await getMore(1, myConstant.PAGINATION.minLimit)
    } catch (error) {
        navigateTo('/error/500')
    }
}

onMounted(() => {
    getApi();
})
</script>

<style></style>