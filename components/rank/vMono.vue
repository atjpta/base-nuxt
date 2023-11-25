<template>
    <div>
        <div @click="play"
            class="cursor-pointer p-5 hover:bg-gradient-to-l from-green-400/10 via-cyan-400/10 to-blue-400/10">

            <div class="flex items-center justify-center">
                <div :class="CssRank" class=" p-2 sm:w-32 w-16 text-center font-extrabold text-teal-400 sm:text-2xl">
                    {{ index + 1 }}
                </div>
                <div class="w-1/2 flex items-center space-x-5 font-extrabold sm:text-2xl">
                    <div class="w-16 h-16 overflow-hidden rounded-2xl cursor-pointer">
                        <img class="rounded-2xl w-16 h-16 duration-500  hover:scale-110" :src="data?.music.url_image"
                            alt="avatar">
                    </div>
                    <div>
                        {{ data.music.name }}
                    </div>
                </div>
                <div class="sm:w-32 w-16 text-center">
                    {{ data.view }}
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: Object,
    index: Intl,
})


const usePlay = playStore()

function play() {
    usePlay.prePlay(props.data.music)
    navigateTo(`/explorer/music/${props.data.music._id}`)
}

const CssRank = computed(() => {
    if (props.index == 0) {
        return 'mask mask-star-2 bg-yellow-300'
    }
    if (props.index == 1) {
        return 'mask mask-star-2 bg-white'
    }
    if (props.index == 2) {
        return 'mask mask-star-2 bg-orange-200'
    }
    return ''
})

</script>

<style></style>