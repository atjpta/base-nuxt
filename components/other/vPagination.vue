<template>
    <div v-show="!delayShow">
        <div class="">
            <div class="join">
                <button :class="isLoading1 ? 'loading' : ''" @click="pre" :disabled="indexPage == 1"
                    class="join-item btn ">«</button>
                <button :disabled="isLoading2" class="join-item btn" onclick="modelPagination.showModal()">
                    {{ t('Page') }} {{ indexPage }}
                </button>
                <button :class="isLoading3 ? 'loading' : ''" :disabled="maxPage == 0 || indexPage == maxPage" @click="next"
                    class="join-item btn">»</button>
            </div>
        </div>

        <dialog id="modelPagination" class="modal">
            <form method="dialog" class="modal-box">
                <h3 class="font-bold text-lg">{{ t("Select page") }}</h3>

                <div class="sm:columns-3 columns-2">
                    <div v-for="i in maxPage" :key="i">
                        <div @click="goTo(i)" :class="i == indexPage ? 'router-link-exact-active' : ''"
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
    return Math.ceil(props.total / myConstant.PAGINATION.minLimit)
})

const delayShow = ref(true)

const setDelay = () => {
    setTimeout(() => {
        delayShow.value = false
    }, 500);
}

const isLoading1 = ref(false)
const isLoading2 = ref(false)
const isLoading3 = ref(false)

const close = ref()

const indexPage = ref(1)

const emit = defineEmits(['getMore'])

const goTo = (i) => {
    try {
        isLoading2.value = true
        indexPage.value = i
        emit('getMore', indexPage.value, myConstant.PAGINATION.minLimit);
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
        indexPage.value += 1
        emit('getMore', indexPage.value, myConstant.PAGINATION.minLimit);
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
        indexPage.value -= 1
        emit('getMore', indexPage.value, myConstant.PAGINATION.minLimit);
    } catch (error) {
        console.log(error);
    }
    finally {
        isLoading1.value = false
    }

}

onMounted(() => {
    setDelay()
})

</script>

<style></style>