<template>
    <tr class="w-full overflow-scroll">
        <td></td>

        <td>{{ data.fullName }}</td>

        <td>
            <div class="flex items-center space-x-3">
                <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                        <img :src="data.avatar" :alt="data.avatar" />
                    </div>
                </div>

                <div>
                    <div class="font-bold">{{ data.username }}</div>
                    <div class="text-sm opacity-50">{{ data.email }}</div>
                </div>
            </div>
        </td>

        <td>{{ data.role.name }}</td>

        <th>
            <div class="flex lg:flex-row flex-col">

                <nuxtLink :to="`/user/${data._id}/home`"
                    class="btn flex w-fit btn-ghost btn-xs text-primary tooltip tooltip-left" :data-tip="t('View')">
                    <font-awesome-icon :icon="['fas', 'eye']" />
                    <div class="lg:flex hidden">
                        {{ t('View') }}
                    </div>
                </nuxtLink>

                <button @click="openModal" class="btn flex w-fit btn-ghost btn-xs text-warning tooltip tooltip-left"
                    :data-tip="t('Edit')">
                    <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                    <div class="lg:flex hidden">
                        {{ t('Edit') }}
                    </div>
                </button>

                <dialog ref="modal" class="modal">
                    <form method="dialog" class="modal-box">
                        <h3 class="font-bold text-lg">{{ t("Edit role") }}</h3>

                        <div class="">
                            <div class="form-control">
                                <div v-for="(i, index) in useRole.list" :key="i._id">
                                    <label class="label cursor-pointer">
                                        <span class="label-text">{{ i.name }}</span>
                                        <input @click="selectRole = i._id" type="radio" name="radio-role"
                                            class="radio checked:bg-teal-400" :checked="i.name == data.role.name" />
                                    </label>
                                    <div v-if="index < useRole.list.length - 1" class="divider my-0">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        <div class="modal-action">
                            <div :class="isLoading ? 'loading' : ''" @click="edit" class="btn btn-primary">{{ t('Save')
                            }}</div>
                            <button ref="closeModal" class="btn btn-ghost text-error">{{ t('Cancel') }}</button>
                        </div>
                    </form>

                    <form method="dialog" class="modal-backdrop">
                        <button>close</button>
                    </form>

                </dialog>

                <button @click="modalConfirm.openModal()"
                    class="btn flex w-fit btn-ghost btn-xs text-error tooltip tooltip-left" :data-tip="t('Delete')">
                    <font-awesome-icon :icon="['fas', 'trash-can']" />
                    <div class="lg:flex hidden">
                        {{ t('Delete') }}
                    </div>
                </button>

                <DialogVConfirm @confirm="deleteOne" :data="modalConfirm" />

            </div>
        </th>

    </tr>
</template>

<script setup>
const props = defineProps({
    data: Object,
})
const useRole = roleStore()
const useNotification = notificationStore()
const modal = ref()
const closeModal = ref()
const useUser = userStore()
const selectRole = ref()
const emit = defineEmits(['refreshData'])
const isLoading = ref(false)
const { t } = useI18n()
const modalConfirm = ref({ isLoading: false, closeModal: null, openModal: null, content: t('Are you sure you want to delete?'), title: t('Alert!!') })


const edit = async () => {
    try {
        isLoading.value = true
        await useUser.updateRole(props.data._id, { role: selectRole.value })
        emit('refreshData')
        useNotification.show('success', t('Update success!!'))
        closeModal.value.click()
    } catch (error) {
        if (error.message == BaseHttpStatus.FORBIDDEN.code) {
            useNotification.show('error', t(`You need higher permissions to update!!`))
        }
        else {
            useNotification.show('error', t(`Can't update!!`))
        }
    }
    finally {
        isLoading.value = false
    }
}

const deleteOne = async () => {
    try {
        modalConfirm.value.isLoading = true
        await useUser.deleteOne(props.data._id)
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

const openModal = () => {
    selectRole.value = props.data.role._id
    modal.value.showModal();
}
</script>

<style></style>