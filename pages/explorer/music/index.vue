<template>
    <div class="">
        <OtherVTitle class="my-10 text-center" title="List music" />
        <div class="flex justify-between my-3">
            <OtherVSearch id="search-music" @search="search" />
        </div>
        <SkeletonVTable v-if="isLoading" />

        <OtherVTable class="" v-show="!isLoading" :refresh-cb="refreshData" :list-title="listTitle"
            :list-data="[...listData]" :cpn="monoMusic" />

        <div class="m-5 text-center">
            <OtherVPagination @getMore="getMore" :total="total" />
        </div>

    </div>
</template>

<script setup>
import monoMusic from '~~/components/music/vRecordMusic';

const { t } = useI18n()
const useMusic = musicStore()
const listTitle = ref([])
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
        const result = await useMusic.search(key.value, page, limit);
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
        console.log(error);
        navigateTo('/error/500')
    }
}

onMounted(() => {
    getApi();
})
</script>

<style></style>