
<template>
    <div>
        <div>
            <OtherVTitle class="pl-3" title="singer" />
            <div v-if="data">
                <div class="my-5  carousel rounded-box sm:w-full w-[100vw] space-x-5 items-center">
                    <SingerVMono class="carousel-item" v-for="i in data" :key="i._id" :data="i" />
                    <OtherVMore class="carousel-item" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const useSinger = singerStore()
const data = ref()

const getApi = async () => {
    data.value = await useSinger.search('', myConstant.PAGINATION.minPage, myConstant.PAGINATION.minLimit)
    data.value = data.value.list
}

onMounted(() => {
    getApi()
})
</script>

<style></style>