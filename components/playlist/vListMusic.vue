<template>
    <div>
        <div v-for="i in data.list" :key="i._id">
            <div class="indicator w-full ">
                <MusicVMono2 class="w-full" :data="i" />
                <div @click="removeMusic(i._id)" class="indicator-item top-1/2 -translate-y-1/2 right-16">
                    <div :data-tip="t('Remove from playlist')"
                        class="tooltip tooltip-left flex items-center btn btn-xs w-12 btn-ghost bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30">
                        <font-awesome-icon :icon="['fas', 'minus']" />
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
const usePlaylist = playlistStore()
const { t } = useI18n()

const removeMusic = async (id) => {
    await usePlaylist.removeMusic(props.data._id, { music: id })
    await usePlaylist.findOne(props.data._id)
}
</script>

<style></style>