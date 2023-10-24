<template>
    <div class="container mx-auto mt-5">
        <div class="flex flex-col md:flex-row  space-y-10 md:space-y-0 space-x-0 md:space-x-10 items-center md:items-start">
            <div class="w-fit mx-auto">
                <SingerVMono :data="useSinger.model" />
                <div class="text-center m-3">
                    <div @click="heart" :class="isHeart ? 'text-red-500' : ''"
                        class="xl:text-2xl btn xl:btn-md btn-sm btn-ghost shadow-md bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30">
                        <font-awesome-icon :icon="['fas', 'heart']" />
                        {{ lengthHeart }}
                    </div>
                </div>
            </div>
            <div class="w-3/4">
                <MusicVList type="singer" />
            </div>
        </div>
    </div>
</template>

<script setup>

const useSinger = singerStore()
const route = useRoute()
const useFavorite = favoriteStore()
const lengthHeart = ref(0)


const isHeart = useState(`isHeartSinger`)

const heart = async () => {
    isHeart.value = !isHeart.value
    if (isHeart.value) {
        lengthHeart.value += 1
        await useFavorite.create({
            model: useSinger.model._id,
            modelType: 'singers'
        });
    }
    else {
        lengthHeart.value -= 1
        await useFavorite.deleteOne(useSinger.model._id);
    }
}

const getHeart = async () => {
    try {
        const data = await useFavorite.findOneByUser(useSinger.model._id)
        if (data) {
            isHeart.value = true;
        }
    }
    catch (error) {
        isHeart.value = false
    }

}


const getApi = async () => {
    await useSinger.findOne(route.params.id)
    lengthHeart.value = await useFavorite.findModelLength(route.params.id)
    getHeart()

}

watchSyncEffect(() => {
    getApi()
})

</script>

<style></style>