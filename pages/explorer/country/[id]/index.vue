<template>
    <div class="container mx-auto mt-5">
        <div class="flex flex-col md:flex-row  space-y-10 md:space-y-0 space-x-0 md:space-x-10 items-center md:items-start">
            <div class="w-fit mx-auto">
                <SingerVMono :data="useCountry.model" />
            </div>
            <div class="w-3/4">
                <MusicVList type="country" />

            </div>
        </div>
    </div>
</template>

<script setup>

const useCountry = countryStore()
const route = useRoute()
const useFavorite = favoriteStore()
const getApi = async () => {
    await useCountry.findOne(route.params.id)
    await useFavorite.findOneByUser(route.params.id)
}

watchSyncEffect(() => {
    getApi()
})

</script>

<style></style>