<template>
    <div>
        <dialog ref="modal" class="modal modal-top sm:modal-middle">
            <form method="dialog"
                class="modal-box py-10 glass bg-gradient-to-r from-green-400/20 via-cyan-400/20 to-blue-400/20 bg-base-100">
                <div class="space-y-5">
                    <div>
                        <div class="text-2xl">
                            {{ t('Time warning') }}
                        </div>
                        <select v-model="day" class="select select-success w-full max-w-xs">
                            <option :value="0"> {{ t('Select day') }}</option>
                            <option :value="1">{{ `1 ${t('day')}` }}</option>
                            <option :value="3">{{ `3 ${t('day')}` }}</option>
                            <option :value="7">{{ `7 ${t('day')}` }}</option>
                        </select>
                    </div>
                    <div>
                        <div class="text-2xl">
                            {{ t('Status') }}
                        </div>
                        <select v-model="status" class="select select-success w-full max-w-xs">
                            <option :value="false">{{ `${t('active')}` }}</option>
                            <option :value="true">{{ `${t('banned')}` }}</option>
                        </select>
                    </div>

                    <div class="flex justify-end space-x-5">
                        <div :class="loading ? 'loading' : ''" @click="emitSave" class="btn btn-primary btn-sm">
                            {{ t('Save') }}
                        </div>
                        <button class="btn text-error btn-ghost btn-sm">
                            {{ t('Cancel') }}
                        </button>
                    </div>
                </div>
            </form>
            <form method="dialog" class="modal-backdrop">
                <button ref="btnClose">close</button>
            </form>
        </dialog>

    </div>
</template>

<script setup>
const props = defineProps({
    data: Object,
    loading: Boolean,
})
const { t } = useI18n()

const btnClose = ref()

const modal = ref()

const status = ref(false)

const day = ref(0)

const emit = defineEmits(['save'])

const emitSave = () => {
    emit('save', { isBanned: status.value, day: day.value }, close)
}

const openModal = () => {
    modal.value.showModal();
}

const close = () => {
    btnClose.value.click()
    setDefault()
}

const setDefault = () => {
    if (props.data) {
        props.data.openModal = openModal
    }

}

onMounted(() => {

    setDefault()
})

</script>

<style></style>