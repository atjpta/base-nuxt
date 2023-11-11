<template>
    <tr class="w-full overflow-scroll">
        <td class=""></td>

        <td>
            <div class="flex items-center space-x-3">
                <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                        <img :src="data.user.avatar" :alt="data.avatar" />
                    </div>
                </div>
                <div>
                    <div class="font-bold">{{ data.user.fullName }}</div>
                </div>
            </div>
        </td>

        <td>
            <div class="">
                {{ data.times }}
            </div>
        </td>

        <td>
            <div class="">
                {{ myMixin.getDayFromNow(data.endTime) }}
            </div>
        </td>

        <td class="lg:w-52 w-16">
            <div class="flex lg:flex-row flex-col">

                <button @click="modalConfirm.openModal()"
                    class="btn flex w-fit btn-ghost btn-xs text-error tooltip tooltip-left" :data-tip="t('remove')">
                    <font-awesome-icon :icon="['fas', 'x']" />
                    <div class="lg:flex hidden">
                        {{ t('remove') }}
                    </div>
                </button>

                <DialogVConfirm @confirm="edit" :data="modalConfirm" />

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
const modalConfirm = ref({ isLoading: false, closeModal: null, openModal: null, content: t('Are you sure you want to remove warning this user?'), title: t('Alert!!') })
const useNotificationServer = notificationsServerStore()

const edit = async () => {
    try {
        isLoading.value = true
        await useStatusComment.update(props.data._id, { day: -99 });
        await useNotificationServer.create({
            user: props.data.user._id,
            content: `You use feature comment!!`,
            type: "info"
        })
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

</script>

<style></style>