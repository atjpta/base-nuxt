<template>
    <tr class="w-full overflow-scroll">
        <td class=" hidden lg:flex"></td>


        <td>
            <div class="flex items-center space-x-3">
                <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                        <img :src="data.avatar" :alt="data.avatar" />
                    </div>
                </div>
                <div>
                    <div class="font-bold">{{ data.name }}</div>
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

                <SingerVEdit :data="ModalEdit" @save="edit" :loading="isLoading" />

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
const useCountry = countryStore()
const emit = defineEmits(['refreshData'])
const isLoading = ref(false)
const { t } = useI18n()
const modalConfirm = ref({ isLoading: false, closeModal: null, openModal: null, content: t('Are you sure you want to delete?'), title: t('Alert!!') })


const ModalEdit = ref({
    openModal: null,
    name: computed(() => { return props.data.name }),
    avatar: computed(() => { return props.data.avatar })
})

const edit = async (data, close) => {
    try {
        isLoading.value = true
        await useCountry.update(props.data._id, data);
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
        await useCountry.deleteOne(props.data._id)
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

</script>

<style></style>