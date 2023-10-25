<template>
    <div class="indicator w-full">
        <ReportVEdit :data="ModalEdit" @save="sendReport" :loading="isLoading" />
        <!-- report -->
        <div class="indicator-item top-[50%] right-10">
            <div :class="[isCreate ? 'btn-disabled' : '']" @click="ModalEdit.openModal" class="btn btn-sm btn-ghost">
                <font-awesome-icon :icon="['fas', 'flag']" />
            </div>

        </div>
        <div class=" w-full ">
            <div class="flex w-full">

                <!-- avatar -->
                <div class="text-center text-xl">
                    <div class="w-16 mx-auto">
                        <img class="w-12 h-12 rounded-full mx-auto" :src="data.createdBy?.avatar" alt="" />
                    </div>
                    <div class="flex flex-col items-center w-16 mx-auto">
                        <FavoriteVHeart :sl="data.favorite[0]?.count || 0" type="comments" :model="data._id" />
                        <div @click="openComment = !openComment" class="btn btn-ghost btn-sm btn-circle">
                            <font-awesome-icon class="text-xl" :icon="['fas', 'share']" />
                        </div>
                    </div>
                </div>

                <!-- content and name createdBy + time -->
                <div class="ml-2">
                    <div class="text-2xl font-medium">{{ data.createdBy?.fullName }}</div>
                    <div class="text-xs mb-2">{{ data.createdAt }}</div>
                    <div>
                        {{ data.content }}
                    </div>
                </div>
            </div>
            <div class="text-xs">
                <div v-if="!showChild && data.child[0]?.count > 0" @click="getChild()" class="btn btn-xs btn-ghost">
                    Xem {{ data.child[0]?.count }} phản hồi khác...
                </div>
                <div v-if="showChild && data.child[0]?.count > 0" @click="showChild = false" class="btn btn-xs btn-ghost">
                    Ẩn {{ data.child[0]?.count }} phản hồi khác...
                </div>
            </div>
            <!-- <CommentVInput :data="{ id:  data._id, modelType: 'cmt' }" v-if="openComment" class="mx-3 mt-1" /> -->
            <CommentVInput v-if="openComment" :loading="loading" @send="send" :data="dataInput" class="mx-3 mt-1" />
            <div v-if="showChild" class="ml-10">
                <div class="divider"></div>

                <div v-for="(i, n) in listChild" :key="n">
                    <CommentVMono :data="i" />
                    <div v-if="(n < listChild.length - 1)" class="divider my-0"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const useComment = commentStore();
const useAuth = authStore();
const useNotification = notificationStore()
const props = defineProps({
    data: Object,
});
const ModalEdit = ref({
    openModal: null,
    name: '',
})


const isLoading = ref(false)

const loading = ref(false);
const { t } = useI18n()
const dataInput = ref({
    id: computed(() => { return props.data._id }),
    modelType: "comments",
});
const isCreate = computed(() => {
    if (useAuth.user && props.data.createdBy) {
        return useAuth.user._id == props.data.createdBy?._id
    }
})
const useReport = reportStore()
const showChild = ref(false);
const listChild = ref([]);
const openComment = ref(false);

async function getChild() {
    showChild.value = true;
    try {
        listChild.value = await useComment.findBy(props.data._id);
    } catch (error) {
        console.log(error);
    }
}

async function send() {
    if (!useAuth.user) {
        useNotification.show('info', t(`You need login before to use feature!!`))
        return;
    }
    try {
        if (dataInput.value.content.length > 0) {
            loading.value = true;

            await useComment.create({
                content: dataInput.value.content,
                model: dataInput.value.id,
                modelType: dataInput.value.modelType,
            });
            dataInput.value.content = "";
            useNotification.show('success', t(`Send success!!`))
            loading.value = false;
            openComment.value = false;
            getChild();
        }
        return;
    } catch (error) {
        console.log(error);
    }
}


async function sendReport(data, close) {
    if (!useAuth.user) {
        useNotification.show('info', t(`You need login before to use feature!!`))
        return;
    }
    try {
        isLoading.value = true
        if (data.length > 0) {
            await useReport.create({
                author: props.data.createdBy._id,
                comment: props.data._id,
                content: data
            });
            useNotification.show('success', t('Report success!!'))
        }
        close()
    } catch (error) {
        console.log(error);
    }
    finally {
        isLoading.value = false
    }
}
</script>

<style></style>
