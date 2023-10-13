<template>
    <div>
        <div>
            <div
                class=" mt-10 md:ring-1  md:rounded-2xl m-auto md:w-3/4 mx-auto bg-gradient-to-r hover:from-green-500/30 from-green-500/0 hover:via-cyan-500/0 via-cyan-500/30 hover:to-blue-500/30 to-blue-500/0">
                <div class="space-y-10 pb-10 pt-5">
                    <div class="text-5xl font-extrabold text-center">
                        {{ data.name }}
                    </div>
                    <div
                        class="flex md:flex-row flex-col  justify-center xl:space-x-20 xl:mx-5 space-y-5 md:space-y-0 md:space-x-5">
                        <div class="xl:w-96 md:w-60 xl:h-96 md:h-60">
                            <img :class="usePlay.play ? 'animate-bounce-slow' : ''"
                                class=" mx-auto md:rounded-2xl xl:w-96 md:w-60 xl:h-96 md:h-60 h-80 w-80"
                                :src="data.url_image" alt="main">
                        </div>

                        <div class="xl:w-96 md:w-60 xl:h-96 md:h-60  flex flex-col justify-between">
                            <div class="space-y-2 mx-5 md:mx-0">
                                <div class="flex space-x-2 items-center flex-wrap ">
                                    <div class="tooltip w-5" :data-tip="t('singer')">
                                        <font-awesome-icon :icon="['fas', 'microphone-lines']" />
                                    </div>
                                    <div @click="navigateTo(`/singer/${i._id}`)"
                                        class="btn m-1 btn-sm btn-ghost bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30"
                                        v-for="i in data?.singer" :key="i._id">
                                        {{ i.name }}
                                    </div>
                                </div>
                                <div class="flex space-x-2 items-center">
                                    <div class="tooltip w-5" :data-tip="t('genre')">
                                        <font-awesome-icon :icon="['fas', 'table-list']" />
                                    </div>
                                    <div @click="navigateTo(`/genre/${i._id}`)"
                                        class="m-1 btn btn-sm btn-ghost bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30"
                                        v-for="i in data?.genre" :key="i._id">
                                        {{ i.name }}
                                    </div>
                                </div>
                                <div class="flex space-x-2 items-center">
                                    <div class="tooltip w-5" :data-tip="t('country')">
                                        <font-awesome-icon :icon="['fas', 'globe']" />
                                    </div>
                                    <div @click="navigateTo(`/country/${i._id}`)"
                                        class="m-1 btn btn-sm btn-ghost bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30"
                                        v-for="i in data?.country" :key="i._id">
                                        {{ i.name }}
                                    </div>
                                </div>
                            </div>

                            <div class="mt-5 md:mt-0 flex justify-around">
                                <div
                                    class="xl:text-2xl btn xl:btn-md btn-sm btn-ghost shadow-md bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30">
                                    <font-awesome-icon :icon="['fas', 'heart']" />
                                    1
                                </div>

                                <div
                                    class="xl:text-2xl btn xl:btn-md btn-sm btn-ghost shadow-md bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30">
                                    <font-awesome-icon :icon="['fas', 'comments']" />
                                    1
                                </div>

                                <div
                                    class="xl:text-2xl btn xl:btn-md btn-sm btn-ghost shadow-md bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30">
                                    <font-awesome-icon :icon="['fas', 'plus']" />
                                    <font-awesome-icon :icon="['fas', 'icons']" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: Object,
});

const { t } = useI18n()

const usePlay = playStore()
</script>

<style></style>
