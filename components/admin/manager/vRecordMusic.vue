<template>
    <tr class="w-full overflow-scroll">
        <td class=" hidden lg:flex"></td>


        <td>
            <div class="flex items-center space-x-3">
                <div class="avatar">
                    <div class="rounded-2xl w-32 h-32">
                        <img :src="data.url_image" :alt="data.url_image" />
                    </div>
                </div>
                <div>
                    <div class="space-y-1">
                        <div class="font-extrabold text-2xl">{{ data.name }}</div>
                        <div class="flex space-x-2 items-center">
                            <div class="tooltip w-5" :data-tip="t('singer')">
                                <font-awesome-icon :icon="['fas', 'microphone-lines']" />
                            </div>
                            <div @click="navigateTo(`/explorer/singer/${i._id}`)"
                                class="btn btn-xs btn-ghost bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30"
                                v-for="i in data.singer" :key="i._id">
                                {{ i.name }}
                            </div>
                        </div>
                        <div class="flex space-x-2 items-center">
                            <div class="tooltip w-5" :data-tip="t('genre')">
                                <font-awesome-icon :icon="['fas', 'table-list']" />
                            </div>
                            <div @click="navigateTo(`/explorer/genre/${i._id}`)"
                                class="btn btn-xs btn-ghost bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30"
                                v-for="i in data.genre" :key="i._id">
                                {{ i.name }}
                            </div>
                        </div>
                        <div class="flex space-x-2 items-center">
                            <div class="tooltip w-5" :data-tip="t('country')">
                                <font-awesome-icon :icon="['fas', 'globe']" />
                            </div>
                            <div @click="navigateTo(`/explorer/country/${i._id}`)"
                                class="btn btn-xs btn-ghost bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30"
                                v-for="i in data.country" :key="i._id">
                                {{ i.name }}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </td>




        <td class="lg:w-52 w-16">
            <div class="flex lg:flex-row flex-col">

                <nuxtLink :to="`/admin`" class="btn flex w-fit btn-ghost btn-xs text-primary tooltip tooltip-left"
                    :data-tip="t('View')">
                    <font-awesome-icon :icon="['fas', 'eye']" />
                    <div class="lg:flex hidden">
                        {{ t('View') }}
                    </div>
                </nuxtLink>

                <button @click="ModalEdit.openModal"
                    class="btn flex w-fit btn-ghost btn-xs text-warning tooltip tooltip-left" :data-tip="t('Edit')">
                    <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                    <div class="lg:flex hidden">
                        {{ t('Edit') }}
                    </div>
                </button>

                <MusicVEdit :data="ModalEdit" @save="edit" :loading="isLoading" />

                <button @click="modalConfirm.openModal()"
                    class="btn flex w-fit btn-ghost btn-xs text-error tooltip tooltip-left" :data-tip="t('Delete')">
                    <font-awesome-icon :icon="['fas', 'trash-can']" />
                    <div class="lg:flex hidden">
                        {{ t('Delete') }}
                    </div>
                </button>

                <DialogVConfirm @confirm="deleteOne" :data="modalConfirm" />

            </div>
        </td>
        <td class=" hidden lg:flex"></td>

    </tr>
</template>

<script setup>

const props = defineProps({
    data: Object,
})
const useNotification = notificationStore()
const useMusic = musicStore()
const emit = defineEmits(['refreshData'])
const isLoading = ref(false)
const { t } = useI18n()
const modalConfirm = ref({ isLoading: false, closeModal: null, openModal: null, content: t('Are you sure you want to delete?'), title: t('Alert!!') })


const ModalEdit = ref({
    openModal: null,
    name: computed(() => { return props.data.name }),
    url_image: computed(() => { return props.data.url_image }),
    url: computed(() => { return props.data.url }),
    genre: new Set(props.data.genre),
    country: new Set(props.data.country),
    singer: new Set(props.data.singer)
})
// genre: computed(() => { return new Set(props.data.genre) }),
// country: computed(() => { return new Set(props.data.country) }),
// singer: computed(() => { return new Set(props.data.singer) }),

const edit = async (data, close) => {
    try {
        isLoading.value = true
        await useMusic.update(props.data._id, data);
        emit('refreshData')
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
        await useMusic.deleteOne(props.data._id)
        emit('refreshData')
        modalConfirm.value.isLoading = false
        modalConfirm.value.closeModal()
        useNotification.show('success', t('Delete success!!'))
    } catch (error) {
        if (error.message == BaseHttpStatus.FORBIDDEN.code) {
            useNotification.show('error', t(`You need higher permissions to delete!!`))
        }
        else if (error.message == BaseHttpStatus.NOT_ACCEPT.code) {
            useNotification.show('error', t(`Can't delete ROOT!!`))
        }
        else {
            useNotification.show('error', t(`Can't delete!!`))
        }
    }
    finally {
        modalConfirm.value.isLoading = false
    }
}

onUpdated(() => {
    ModalEdit.value.country = new Set(props.data.country)
    ModalEdit.value.singer = new Set(props.data.singer)
    ModalEdit.value.genre = new Set(props.data.genre)
})

</script>

<style></style>