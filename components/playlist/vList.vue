<template>
    <div>
        <SingerVEdit :data="ModalEdit" @save="create" :loading="isLoadingCreate" />

        <div class="indicator ">
            <div class="lg:w-96 w-60 ">
                <div class="">
                    <div class="flex justify-between">
                        <div class="text-4xl font-semibold">Playlist</div>
                        <div @click="ModalEdit.openModal()" class="btn bg-teal-300  ">
                            <font-awesome-icon :icon="['fas', 'circle-plus']" />
                            {{ t('Add') }}
                        </div>

                    </div>

                    <div class="divider"></div>
                </div>
                <div v-if="usePlaylist.list.length > 0">
                    <PlaylistVMono @click="addMusic(i)" :data="i" v-for="i in usePlaylist.list" :key="i._id" />
                </div>
                <div v-else>
                    {{ t('List empty!!') }}
                </div>


            </div>
        </div>
    </div>
</template>

<script setup>
const { t } = useI18n()
const isLoadingCreate = ref(false)
const usePlaylist = playlistStore()
const usePlay = playStore()
const useNotification = notificationStore()
const ModalEdit = ref({
    openModal: null,
    name: null,
    avatar: null
})


const create = async (data, close) => {
    try {
        isLoadingCreate.value = true
        await usePlaylist.create(data)
        await getApi()
        useNotification.show('success', t(`Create success!!`))
        close()
    } catch (error) {
        useNotification.show('error', t(`Can't create!!`))
    } finally {
        isLoadingCreate.value = false
    }
}

const addMusic = async (data) => {
    try {
        await usePlaylist.addMusic(data._id, { music: usePlay.song._id })
        useNotification.show('success', t(`Add success!!`))

    } catch (error) {
        useNotification.show('error', t(`Can't add music!!`))
    }
}

const getApi = async () => {
    try {
        await usePlaylist.findAll()
    } catch (error) {

    }
}

watchSyncEffect(() => {
    getApi()
})

// onMounted(() => {
//     getApi();
// })

</script>

<style></style>