
<template>
    <div>
        <div>
            <OtherVTitle class="pl-3" title="Genre" />
            <div v-if="data">
                <div class="my-5  carousel rounded-box sm:w-full w-[100vw] space-x-5 items-center">
                    <div v-for="(i, ) in data" :key="i._id">
                        <GenreVMono class="carousel-item" :data="i" />
                    </div>
                    <OtherVMore class="carousel-item" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const useGenre = genreStore()
const data = ref()

const getApi = async () => {
    data.value = await useGenre.search('', myConstant.PAGINATION.minPage, myConstant.PAGINATION.minLimit)
    data.value = data.value.list
}

onMounted(() => {
    getApi()
})
</script>

<style></style>