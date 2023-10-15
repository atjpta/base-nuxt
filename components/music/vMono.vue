<template>
    <div @click="play">
        <div
            class="glass flex space-x-5 w-fit rounded-2xl h-40 p-4 bg-gradient-to-r hover:bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30 ">
            <div>
                <div class="w-32 h-32 overflow-hidden rounded-2xl cursor-pointer">
                    <img class="rounded-2xl w-32 h-32 duration-500  hover:scale-110" :src="data?.url_image" alt="avatar">
                </div>
            </div>

            <div>
                <div class="space-y-1">
                    <div class="font-extrabold text-2xl">{{ data?.name }}</div>
                    <div class="flex space-x-2 items-center">
                        <div class="tooltip w-5" :data-tip="t('singer')">
                            <font-awesome-icon :icon="['fas', 'microphone-lines']" />
                        </div>
                        <div @click="navigateTo(`/singer/${i._id}`)"
                            class="btn btn-xs btn-ghost bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30"
                            v-for="i in data?.singer" :key="i._id">
                            {{ i.name }}
                        </div>
                    </div>
                    <div class="flex space-x-2 items-center">
                        <div class="tooltip w-5" :data-tip="t('genre')">
                            <font-awesome-icon :icon="['fas', 'table-list']" />
                        </div>
                        <div @click="navigateTo(`/genre/${i._id}`)"
                            class="btn btn-xs btn-ghost bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30"
                            v-for="i in data?.genre" :key="i._id">
                            {{ i.name }}
                        </div>
                    </div>
                    <div class="flex space-x-2 items-center">
                        <div class="tooltip w-5" :data-tip="t('country')">
                            <font-awesome-icon :icon="['fas', 'globe']" />
                        </div>
                        <div @click="navigateTo(`/country/${i._id}`)"
                            class="btn btn-xs btn-ghost bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30"
                            v-for="i in data?.country" :key="i._id">
                            {{ i.name }}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: Object
})

const usePlay = playStore()

function play() {
    usePlay.prePlay(props.data)

}
const { t } = useI18n()
</script>

<style></style>