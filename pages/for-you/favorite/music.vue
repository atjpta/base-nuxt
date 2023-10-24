<template>
    <div>
        <OtherVTitle class="my-10 text-center" title="List favorite music" />
        <div v-if="useFavorite.list.length > 0" class="flex flex-wrap justify-center">
            <MusicVMono class="m-5" :data="i" v-for="(i) in useFavorite.list" :key="i._id" />
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
    await useFavorite.findModelByUSer('musics')
}

onMounted(() => {
    getApi()
})
</script>

<style></style>