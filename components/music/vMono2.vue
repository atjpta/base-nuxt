<template>
    <div>
        <div
            class=" flex space-x-5 w-full  h-24 p-4  hover:bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30 ">
            <div>
                <div class="w-16 h-16 overflow-hidden rounded-2xl cursor-pointer">
                    <img @click="play" class="rounded-2xl w-16 h-16 duration-500  hover:scale-110" :src="data?.url_image"
                        alt="avatar">
                </div>
            </div>

            <div class="flex justify-between w-full items-center">
                <div class="space-y-1">
                    <div class="font-extrabold text-2xl">{{ data?.name }}</div>
                    <div class="flex space-x-2 items-center">
                        <div @click="navigateTo(`/singer/${i._id}`)"
                            class="btn btn-xs btn-ghost bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30"
                            v-for="i in data?.singer" :key="i._id">
                            {{ i.name }}
                        </div>
                    </div>
                </div>
                <div>
                    <div class="btn-sm btn btn-ghost btn-circle">
                        <font-awesome-icon :icon="['fas', 'ellipsis']" />
                    </div>
                </div>
            </div>

        </div>
        <div class="divider my-0"></div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: Object
})

const usePlay = playStore()

function play() {
    usePlay.song = props.data;
    usePlay.playAudio()
    navigateTo(`/music/${props.data._id}`)
}
const { t } = useI18n()
</script>

<style></style>