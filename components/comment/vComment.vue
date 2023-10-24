<template>
    <div>
        <div class="indicator">
            <div class="lg:w-[50vw] w-[80vw] h-[70vh]">
                <div class="">
                    <div class="text-4xl font-semibold">{{ t('Comment') }}</div>
                    <div class="divider"></div>
                </div>
                <div class="pb-32 h-full">
                    <div class="h-full overflow-y-scroll carousel flex flex-col">
                        <div v-for="(i, n) in useComment.list" :key="n">
                            <CommentVMono :data="i" />
                            <div v-if="(n < useComment.list.length - 1)" class="divider"></div>
                        </div>
                        <div v-if="(useComment.list.length < 1)" class="text-center text-2xl">
                            {{ t('Not comment!!') }}
                        </div>
                    </div>
                </div>

            </div>
            <CommentVInput :loading="loading" @send="send" :data="data"
                class="indicator-item indicator-center indicator-bottom lg:w-[50vw] w-[80vw]" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: Object
})
const useComment = commentStore();
const useAuth = authStore();
const loading = ref(false);
const { t } = useI18n()
const useNotification = notificationStore()
const route = useRoute()


const send = async () => {
    if (!useAuth.user) {
        useNotification.show('info', t(`You need login before to use feature!!`))
        return;
    }
    try {
        if (props.data.content.length > 0) {
            loading.value = true;

            await useComment.create({
                content: props.data.content,
                model: props.data._id,
                modelType: 'musics',
            });
            useComment.list = await useComment.findBy(route.params.id);
            useNotification.show('success', t(`Send success!!`))
            loading.value = false;
            props.data.content = "";
        }
        return;
    } catch (error) {

    }
}

</script>

<style></style>
