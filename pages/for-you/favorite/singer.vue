<template>
    <div>
        <OtherVTitle class="my-10 text-center" title="List favorite singer" />

        <div v-if="useFavorite.list.length > 0" class="flex flex-wrap justify-center">
            <SingerVMono class="m-5" :data="i" v-for="(i) in useFavorite.list" :key="i._id" />
        </div>
        <div v-else class="text-center">
            {{ t("List empty!!") }}
        </div>
    </div>
</template>

<script setup>

const useFavorite = favoriteStore()
const { t } = useI18n()
const getApi = async () => {
    useFavorite.list = []
    await useFavorite.findModelByUSer('singers')
}

watchSyncEffect(() => {
    getApi()
})
</script>

<style></style>