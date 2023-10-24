
<template>
    <div>
        <div>
            <OtherVTitle class="pl-3" title="New" />
            <div v-if="data">
                <div class="my-5  carousel rounded-box sm:w-full w-[100vw] space-x-5 items-center">
                    <MusicVMono class="carousel-item" v-for="i in data" :key="i._id" :data="i" />
                    <OtherVMore @click="navigateTo('/explorer/music')" class="carousel-item cursor-pointer" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const useMusic = musicStore()
const data = ref()


const usePlay = playStore();


const getApi = async () => {
    data.value = await useMusic.search('', myConstant.PAGINATION.minPage, myConstant.PAGINATION.minLimit)
    data.value = data.value.list
    usePlay.setList(data.value);
}

onMounted(() => {
    getApi()
})
</script>

<style></style>