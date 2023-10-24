<template>
    <div class="container mx-auto mt-5">
        <div class="flex flex-col md:flex-row  space-y-10 md:space-y-0 space-x-0 md:space-x-10 items-center md:items-start">
            <div class="w-fit mx-auto">
                <PlaylistVMono2 :data="usePlaylist.model" />
                <div class="flex justify-center space-x-5 mt-3">
                    <button @click="ModalEdit.openModal"
                        class="btn flex w-fit btn-ghost btn-xs text-warning tooltip tooltip-top" :data-tip="t('Edit')">
                        <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                        <div class="lg:flex hidden">
                            {{ t('Edit') }}
                        </div>
                    </button>

                    <SingerVEdit :data="ModalEdit" @save="edit" :loading="isLoadingCreate" />

                    <button @click="modalConfirm.openModal()"
                        class="btn flex w-fit btn-ghost btn-xs text-error tooltip tooltip-top" :data-tip="t('Delete')">
                        <font-awesome-icon :icon="['fas', 'trash-can']" />
                        <div class="lg:flex hidden">
                            {{ t('Delete') }}
                        </div>
                    </button>

                    <DialogVConfirm @confirm="deleteOne" :data="modalConfirm" />

                </div>
            </div>
            <div class="w-3/4 bg-gradient-to-r from-green-400/10 via-cyan-400/10 to-blue-400/10">
                <PlaylistVListMusic :data="usePlaylist.model" />
            </div>
        </div>
    </div>
</template>

<script setup>

const usePlaylist = playlistStore()
const isLoadingCreate = ref(false)
const route = useRoute()
const isLoading = ref(false)
const useNotification = notificationStore()
const { t } = useI18n()
const modalConfirm = ref({ isLoading: false, closeModal: null, openModal: null, content: t('Are you sure you want to delete?'), title: t('Alert!!') })
const getApi = async () => {
    await usePlaylist.findOne(route.params.id)
}

const ModalEdit = ref({
    openModal: null,
    name: computed(() => { return usePlaylist.model.name }),
    avatar: computed(() => { return usePlaylist.model.url_image })
})


const edit = async (data, close) => {
    try {
        isLoading.value = true
        await usePlaylist.update(usePlaylist.model._id, data);
        await getApi()
        useNotification.show('success', t('Update success!!'))
        close()
    } catch (error) {
        if (error.message == BaseHttpStatus.FORBIDDEN.code) {
            useNotification.show('error', t(`You need higher permissions to update!!`))
        }
        else {
            useNotification.show('error', t(`Can't update!!`))
        }
        console.log(error);
    }
    finally {
        isLoading.value = false
    }
}


const deleteOne = async () => {
    try {
        modalConfirm.value.isLoading = true
        await usePlaylist.deleteOne(usePlaylist.model._id)
        modalConfirm.value.isLoading = false
        modalConfirm.value.closeModal()
        useNotification.show('success', t('Delete success!!'))
        navigateTo('/for-you/playlist')
    } catch (error) {
        useNotification.show('error', t(`Can't delete!!`))
    }
    finally {
        modalConfirm.value.isLoading = false
    }
}




watchSyncEffect(() => {
    getApi()
})

</script>

<style></style>