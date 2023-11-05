<template>
    <div class="">
        <div>

            <dialog ref="dialog" :id="`report_modal_${id}`" class="modal report_modal">
                <div
                    class="modal-box  w-11/12 max-w-5xl h-2/3 bg-gradient-to-r from-green-400/10 via-cyan-400/10 to-blue-400/10">
                    <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <!-- content -->

                    <OtherVTitle title="Report detail" class="mb-10 text-center" />
                    <div class="text-right">
                        <div @click="deleteByAuthor(useReport.model[0].reports[0].author)"
                            class=" btn btn-sm text-error btn-ghost">
                            {{ t('remove all report') }}
                        </div>
                    </div>
                    <div>
                        <div v-for="i in useReport.model" :key="i._id">
                            <div class="text-left">
                                <div class="text-xl">
                                    {{ t("Content comment") }}
                                </div>
                                <div class="p-1">
                                    {{ i.comment.content }}
                                </div>

                                <div class="text-xl">
                                    {{ t("Report") }}
                                </div>
                                <div class="">
                                    <div v-for="j in i.reports" :key="j._id">
                                        <div
                                            class="flex items-center  justify-between hover:bg-gradient-to-r from-green-400/10 via-cyan-400/10 to-blue-400/10 p-3">
                                            <div class="flex items-center space-x-3 w-1/4">
                                                <div class="avatar">
                                                    <div class="mask mask-squircle w-12 h-12">
                                                        <img :src="j.createdBy.avatar" :alt="j.createdBy.avatar" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="font-bold">{{ j.createdBy.fullName }}</div>
                                                </div>
                                            </div>

                                            <div class="text-left w-2/4">
                                                {{ j.content }}
                                            </div>

                                            <div>
                                                <button @click="deleteById(j._id)"
                                                    class="btn flex w-fit btn-ghost btn-xs text-error tooltip tooltip-left "
                                                    :data-tip="t('remove')">
                                                    <font-awesome-icon :icon="['fas', 'x']" />
                                                    <div class="lg:flex hidden">
                                                        {{ t('remove') }}
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="divider"></div>
                        </div>
                    </div>

                </div>

                <form method="dialog" class="modal-backdrop">
                    <button ref="btnClose">close</button>
                </form>
            </dialog>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    id: String
})
const useNotification = notificationStore()
const { t } = useI18n()
let observer = null;
const useReport = reportStore()

const btnClose = ref()

const getApi = async () => {
    await useReport.findOne(props.id)
}

const deleteById = async (id) => {
    try {
        await useReport.deleteOne(id);
        await getApi()
        useNotification.show('success', t('Remove success'))
    } catch (error) {
        useNotification.show('error', t(`can't remove`))

    }
}

const deleteByAuthor = async (id) => {
    try {
        await useReport.deleteByAuthor(id);
        useNotification.show('success', t('Remove success'))
        btnClose.value.click()
    } catch (error) {
        useNotification.show('error', t(`can't remove`))

    }
}

onMounted(() => {
    observer = new MutationObserver((mutationList, observer) => {
        getApi()
    });

    observer.observe(document.querySelector('#report_modal' + `_${props.id}`), { attributes: true });
});

onUnmounted(() => observer && observer.disconnect());
</script>

<style></style>
