<template>
    <div>
        <dialog ref="modal" class="modal modal-top sm:modal-middle">
            <form method="dialog"
                class="modal-box py-10 glass bg-gradient-to-r from-green-400/20 via-cyan-400/20 to-blue-400/20 bg-base-100">
                <div class="space-y-5">
                    <div>
                        <div class="text-2xl">
                            {{ t('Content') }}
                        </div>
                        <input v-model="name" type="text" :placeholder="t('Enter name...')"
                            class="input input-bordered input-success w-full max-w-xs" />
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

const name = ref()

const emit = defineEmits(['save'])

const emitSave = () => {
    emit('save', name.value, close)
}

const openModal = () => {
    modal.value.showModal();
    name.value = props.data.name
}

const close = () => {
    btnClose.value.click()
    setDefault()
}

const setDefault = () => {
    if (props.data) {
        name.value = null
        props.data.openModal = openModal
    }

}

onMounted(() => {

    setDefault()
})

</script>

<style></style>