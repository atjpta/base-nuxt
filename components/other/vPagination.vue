<template>
    <div>
        <div class="toast toast-center ">

            <div class="join">
                <button :class="isLoading1 ? 'loading' : ''" @click="pre" :disabled="index == 1"
                    class="join-item btn ">«</button>
                <button :disabled="isLoading2" class="join-item btn" onclick="modelPagination.showModal()">
                    {{ t('Page') }} {{ index }}
                </button>
                <button :class="isLoading3 ? 'loading' : ''" :disabled="index == maxPage" @click="next"
                    class="join-item btn">»</button>
            </div>



        </div>

        <dialog id="modelPagination" class="modal ">
            <form method="dialog" class="modal-box">
                <h3 class="font-bold text-lg">{{ t("Select page") }}</h3>

                <div class="sm:columns-3 columns-2">
                    <div v-for="i in maxPage" :key="i">
                        <div @click="goTo(i)" :class="i == index ? 'router-link-exact-active' : ''"
                            class="btn  btn-ghost my-1 ">
                            {{ t('Page') }} {{ i }}
                        </div>
                    </div>
                </div>

                <button ref="close" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

            </form>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </div>
</template>

<script setup>
const { t } = useI18n()
const props = defineProps({
    total: Number,
})

const maxPage = computed(() => {
    return Math.floor(props.total / myConstant.PAGINATION.minLimit) + 1
})

const isLoading1 = ref(false)
const isLoading2 = ref(false)
const isLoading3 = ref(false)

const close = ref()

const index = ref(1)

const emit = defineEmits(['getMore'])

const goTo = (i) => {
    try {
        isLoading2.value = true
        index.value = i
        emit('getMore', index.value, myConstant.PAGINATION.minLimit);
        close.value.click()
    } catch (error) {
        console.log(error);
    }
    finally {
        isLoading2.value = false
    }
}

const next = () => {
    try {
        isLoading3.value = true
        index.value++
        emit('getMore', index.value, myConstant.PAGINATION.minLimit);
    } catch (error) {
        console.log(error);
    }
    finally {
        isLoading3.value = false
    }

}

const pre = () => {
    try {
        isLoading1.value = true
        index.value--
        emit('getMore', index.value, myConstant.PAGINATION.minLimit);
    } catch (error) {
        console.log(error);
    }
    finally {
        isLoading1.value = false
    }

}

</script>

<style></style>