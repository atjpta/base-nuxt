<template>
    <tr class="w-full overflow-scroll">
        <td class=""></td>

        <td>
            <div class="flex items-center space-x-3">
                <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                        <img :src="data.author.avatar" :alt="data.avatar" />
                    </div>
                </div>
                <div>
                    <div class="font-bold">{{ data.author.fullName }}</div>
                </div>
            </div>
        </td>

        <td>
            <div class="">
                {{ data.status[0]?.times ?? 0 }}
            </div>
        </td>

        <td class="lg:w-52 w-16">
            <div class="flex lg:flex-row flex-col">

                <div :onclick="`report_modal_${data.author._id}.showModal()`"
                    class="btn flex w-fit btn-ghost btn-xs text-primary tooltip tooltip-left indicator"
                    :data-tip="t('View report')">
                    <font-awesome-icon :icon="['fas', 'eye']" />
                    <div class="lg:flex hidden">
                        {{ t('View') }}
                    </div>
                    <div class="indicator-item badge ">
                        {{ data.count_reports }}
                    </div>
                </div>
                <ReportVDetail :id="data.author._id" />

                <button @click="ModalEdit.openModal"
                    class="btn flex w-fit btn-ghost btn-xs text-warning tooltip tooltip-left " :data-tip="t('Edit')">
                    <font-awesome-icon :icon="['fas', 'edit']" />
                    <div class="lg:flex hidden">
                        {{ t('Edit') }}
                    </div>
                </button>

                <ReportVEditAdmin :data="ModalEdit" @save="edit" :loading="isLoading" />

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
const useStatusComment = statusCommentStore()
const emit = defineEmits(['refreshData'])
const isLoading = ref(false)
const { t } = useI18n()

const ModalEdit = ref({
    openModal: null,
    day: computed(() => { return props.data.status[0]?.endTime }),
    status: computed(() => { return props.data.status[0]?.isBanned ?? false }),
})


const edit = async (data, close) => {
    try {

        isLoading.value = true
        if (props.data.status[0]) {
            await useStatusComment.update(props.data.status[0]._id, { ...data, times: props.data.status[0].times + 1 });
        }
        else {
            await useStatusComment.create({ ...data, user: props.data.author._id });
        }
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
        await useStatusComment.deleteOne(props.data._id)
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