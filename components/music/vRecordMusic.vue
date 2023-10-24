<template>
    <tr class="w-full overflow-scroll">
        <td></td>
        <td>
            <div @click="play" class="flex items-center justify-evenly cursor-pointer">
                <div class="flex space-x-10 w-1/2">
                    <div class="avatar ">
                        <div class="mask mask-squircle w-16 h-16">
                            <img :src="data.url_image" :alt="data.url_image" />
                        </div>
                    </div>
                    <div class="flex justify-between w-full items-center">
                        <div class="space-y-1">
                            <div class="font-extrabold text-2xl">{{ data?.name }}</div>
                            <div class="flex space-x-2 items-center">
                                <div @click="goToSinger($event, i._id)"
                                    class=" btn btn-xs btn-ghost bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30"
                                    v-for="i in data?.singer" :key="i._id">
                                    {{ i.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        {{ data.view || 0 }}
                        {{ t('Count view') }}
                    </div>
                </div>

            </div>
        </td>
        <td></td>

    </tr>
</template>




<script setup>
const props = defineProps({
    data: Object
})

const usePlay = playStore()

const goToSinger = (e, id) => {
    e.stopPropagation()
    navigateTo(`/explorer/singer/${id}`)
}
function play() {
    usePlay.prePlay(props.data)
}
const { t } = useI18n()
</script>

<style></style>