<template>
    <div>
        <dialog ref="modal" class="modal">

            <form method="dialog" class="modal-box">
                <h3 class="font-bold text-lg mb-5">{{ data.title || t("Alert!!") }}</h3>

                <div class="">
                    <div class="form-control">
                        {{ data.content || t('Content alert!') }}
                    </div>
                </div>

                <button @click="close" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                <div class="modal-action">
                    <div @click="confirm" :class="isLoading ? 'loading' : ''" class="btn btn-primary">{{ t('Ok') }}</div>
                    <button @click="close" ref="closeModal" class="btn btn-ghost text-error">{{ t('Cancel') }}</button>
                </div>

            </form>

            <form method="dialog" class="modal-backdrop">
                <button ref="closeModal" @click="close">close</button>
            </form>

        </dialog>
    </div>
</template>

<script setup>
const props = defineProps({
    data: Object
})
const { t } = useI18n()
const modal = ref()

const closeModal = ref()

const openModal = () => {
    modal.value.showModal();
}
const closeModalCb = () => {
    closeModal.value.click();
}

const setCb = () => {
    if (props.data) {
        props.data.openModal = openModal
        props.data.closeModal = closeModalCb
    }
}

const close = () => {
    emit('close');
}

const confirm = async () => {
    emit('confirm');
}

const isLoading = computed(() => {
    if (props.data?.isLoading) {
        return props.data.isLoading
    }
    return false
})

const emit = defineEmits(['close', 'confirm'])

onMounted(() => {
    setCb();
})

</script>

<style></style>