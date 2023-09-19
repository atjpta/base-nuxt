<template>
    <div>
        <div class="flex justify-end">
            <div class="btn bg-teal-300  btn-sm">
                <font-awesome-icon :icon="['fas', 'circle-plus']" />
                {{ t('Add') }}
            </div>
        </div>
        <SkeletonVTable v-if="isLoading" />
        <OtherVTable v-show="!isLoading" :refresh-cb="refreshData" :get-more-cb="getMore" :total="total"
            :list-title="listTitle" :list-data="listData" :cpn="AdminManagerVRecordUser" />
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
const isLoading = ref(false)
const getMore = async (page, limit) => {
    try {
        isLoading.value = true
        // await myMixin.testAwait()
        indexPage.value = page;
        indexPageLimit.value = limit
        const result = await useUser.findAll(page, limit);
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
        await useRole.findAll();
    } catch (error) {
        navigateTo('/error/500')
    }
}

onMounted(() => {
    getApi();
})
</script>

<style></style>