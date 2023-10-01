<template>
    <div>
        <div class="">
            <WaveSongVWave1 :data="usePlay.song" class=" " />
        </div>
    </div>
</template>

<script setup>

const route = useRoute()
const useMusic = musicStore()
const usePlay = playStore()
const getApi = async () => {
    useMusic.list.push(usePlay.song)
    await useMusic.getRandom(route.params.id, myConstant.PAGINATION.minLimit)
    usePlay.list = useMusic.list
}

const listData = computed(() => {
    if (useMusic.list) {

        return useMusic.list.map((e, i) => {
            return {
                id: i,
                ...e
            }
        })
    }
})

onMounted(() => {
    getApi()
})
</script>

<style></style>
