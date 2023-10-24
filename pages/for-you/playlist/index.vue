<template>
    <div class="">
        <SingerVEdit :data="ModalEdit" @save="create" :loading="isLoadingCreate" />

        <OtherVTitle class="my-10 text-center" title="playlist" />
        <div class="flex justify-between my-3">
            <OtherVSearch id="search-music" @search="search" />
            <div @click="ModalEdit.openModal()" class="btn bg-teal-300  ">
                <font-awesome-icon :icon="['fas', 'circle-plus']" />
                {{ t('Add') }}
            </div>
        </div>
        <SkeletonVTable v-if="isLoading" />

        <OtherVList class="" v-show="!isLoading" :refresh-cb="refreshData" :list-title="listTitle"
            :list-data="[...listData]" :cpn="mono" />

        <div class="m-5 text-center">
            <OtherVPagination @getMore="getMore" :total="total" />
        </div>

    </div>
</template>

<script setup>
import mono from '~~/components/playlist/vMono2';

const { t } = useI18n()
const usePlaylist = playlistStore()
const listTitle = ref([])
const isLoadingCreate = ref(false)
const listData = ref([])
const total = ref(0)
const indexPage = ref(1)
const useNotification = notificationStore()
const indexPageLimit = ref(1)
const isLoading = ref(false)
const key = ref('')
const ModalEdit = ref({
    openModal: null,
    name: null,
    avatar: null
})
const create = async (data, close) => {
    try {
        isLoadingCreate.value = true
        await usePlaylist.create(data)
        await getApi()
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
        const result = await usePlaylist.search(key.value, page, limit);
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

watchSyncEffect(() => {
    getApi();
})
</script>

<style></style>