<template>
    <div>
        <div>
            <MusicVCard :data="usePlay.song" />
            <MusicVList :data="listData" />
        </div>
    </div>
</template>

<script setup>

const route = useRoute()
const useMusic = musicStore()
const usePlay = playStore()
const getApi = async () => {
    // useMusic.list.push(usePlay.song)
    await useMusic.getRandom(route.params.id, myConstant.PAGINATION.minLimit)
    if (useMusic.list) {
        usePlay.list = useMusic.list
    }
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
