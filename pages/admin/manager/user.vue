<template>
    <div class="">
        <div class="flex justify-between my-5 ">

            <OtherVSearch id="search-user" @search="search" />

            <div class="btn bg-teal-300  btn-sm">
                <font-awesome-icon :icon="['fas', 'circle-plus']" />
                {{ t('Add') }}
            </div>

        </div>
        <SkeletonVTable v-if="isLoading" />

        <OtherVTable :is-user="false" class="" v-show="!isLoading" :refresh-cb="refreshData" :list-title="listTitle"
            :list-data="listData" :cpn="AdminManagerVRecordUser" />

        <div class="toast lg:right-[calc(50%-144px)] right-1/2 translate-x-1/2">
            <OtherVPagination @getMore="getMore" :total="total" />
        </div>

    </div>
</template>

<script setup>
import AdminManagerVRecordUser from '~~/components/admin/manager/vRecordUser';

const { t } = useI18n()
const useUser = userStore()
const useRole = roleStore()
const listTitle = ref([
    'Name', 'Avatar', 'Role',
])
const listData = ref([])
const total = ref(0)
const indexPage = ref(1)
const indexPageLimit = ref(1)
const usePermission = permissionStore()
const isLoading = ref(false)
const key = ref('')
const getMore = async (page, limit) => {
    try {
        isLoading.value = true
        indexPage.value = page;
        indexPageLimit.value = limit
        const result = await useUser.findAll(page, limit, key.value);
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
        await usePermission.findAll()
        await useRole.findAll();
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