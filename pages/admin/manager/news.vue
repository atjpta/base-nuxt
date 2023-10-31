<template>
    <div class="">
        <NewsVEdit :data="ModalEdit" @save="create" :loading="isLoadingCreate" />
        <div class="flex justify-between my-3">
            <OtherVSearch id="search-news-admin" @search="() => { }" />

            <div @click="ModalEdit.openModal()" class="btn bg-teal-300  btn-sm">
                <font-awesome-icon :icon="['fas', 'circle-plus']" />
                {{ t('Add') }}
            </div>

        </div>
        <SkeletonVTable v-if="isLoading" />

        <OtherVTable :is-user="false" class="" v-show="!isLoading" :refresh-cb="refreshData" :list-title="listTitle"
            :list-data="[...listData]" :cpn="AdminManagerVRecordNews" />

        <div class="toast lg:right-[calc(50%-144px)] right-1/2 translate-x-1/2">
            <OtherVPagination @getMore="getMore" :total="total" />
        </div>

    </div>
</template>

<script setup>
import AdminManagerVRecordNews from '~~/components/admin/manager/vRecordNews';

const { t } = useI18n()
const useNews = newsStore()
const listTitle = ref([])
const listData = ref([])
const total = ref(0)
const indexPage = ref(1)
const indexPageLimit = ref(1)
const isLoading = ref(false)
const key = ref('')
const isLoadingCreate = ref(false)
const useNotification = notificationStore()

const ModalEdit = ref({
    openModal: null,
    name: null,
    avatar: null
})

const create = async (data, close) => {
    try {
        isLoadingCreate.value = true
        await useNews.create(data)
        await refreshData()
        useNotification.show('success', t(`Create success!!`))
        close()
    } catch (error) {
        useNotification.show('error', t(`Can't create!!`))
    } finally {
        isLoadingCreate.value = false
    }
}

const getMore = async (page, limit) => {
    try {
        isLoading.value = true
        indexPage.value = page;
        indexPageLimit.value = limit
        const result = await useNews.search(key.value, page, limit);
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