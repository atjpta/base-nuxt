<template>
    <div>
        <div>
            <div
                class=" mt-10 md:ring-1  md:rounded-2xl m-auto md:w-3/4 mx-auto bg-gradient-to-r hover:from-green-500/30 from-green-500/0 hover:via-cyan-500/0 via-cyan-500/30 hover:to-blue-500/30 to-blue-500/0">
                <div class="space-y-10 pb-10 pt-5">
                    <div class="text-5xl font-extrabold text-center">
                        {{ data.name }}
                    </div>
                    <div
                        class="flex md:flex-row flex-col  justify-center xl:space-x-20 xl:mx-5 space-y-5 md:space-y-0 md:space-x-5">
                        <div class="xl:w-96 md:w-60 xl:h-96 md:h-60">
                            <img :class="usePlay.play ? 'animate-bounce-slow' : ''"
                                class=" mx-auto md:rounded-2xl xl:w-96 md:w-60 xl:h-96 md:h-60 h-80 w-80"
                                :src="data.url_image" alt="main">
                        </div>

                        <div class="xl:w-96 md:w-60 xl:h-96 md:h-60  flex flex-col justify-between">
                            <div class="space-y-2 mx-5 md:mx-0">
                                <div class="flex space-x-2 items-center flex-wrap ">
                                    <div class="tooltip w-5" :data-tip="t('singer')">
                                        <font-awesome-icon :icon="['fas', 'microphone-lines']" />
                                    </div>
                                    <div @click="navigateTo(`/explorer/singer/${i._id}`)"
                                        class="btn m-1 btn-sm btn-ghost bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30"
                                        v-for="i in data?.singer" :key="i._id">
                                        {{ i.name }}
                                    </div>
                                </div>
                                <div class="flex space-x-2 items-center">
                                    <div class="tooltip w-5" :data-tip="t('genre')">
                                        <font-awesome-icon :icon="['fas', 'table-list']" />
                                    </div>
                                    <div @click="navigateTo(`/explorer/genre/${i._id}`)"
                                        class="m-1 btn btn-sm btn-ghost bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30"
                                        v-for="i in data?.genre" :key="i._id">
                                        {{ i.name }}
                                    </div>
                                </div>
                                <div class="flex space-x-2 items-center">
                                    <div class="tooltip w-5" :data-tip="t('country')">
                                        <font-awesome-icon :icon="['fas', 'globe']" />
                                    </div>
                                    <div @click="navigateTo(`/explorer/country/${i._id}`)"
                                        class="m-1 btn btn-sm btn-ghost bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30"
                                        v-for="i in data?.country" :key="i._id">
                                        {{ i.name }}
                                    </div>
                                </div>

                                <div class="flex space-x-2 items-center">
                                    <div class="tooltip w-5" :data-tip="t('view')">
                                        <font-awesome-icon :icon="['fas', 'headphones']" />
                                    </div>
                                    <div>
                                        {{ data.view }}
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5 md:mt-0 flex justify-around">
                                <div @click="heart" :class="isHeart ? 'text-red-500' : ''"
                                    class="xl:text-2xl btn xl:btn-md btn-sm btn-ghost shadow-md bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30">
                                    <font-awesome-icon :icon="['fas', 'heart']" />
                                    {{ lengthHeart }}
                                </div>

                                <div onclick="my_modal_comment.showModal()"
                                    class="xl:text-2xl btn xl:btn-md btn-sm btn-ghost shadow-md bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30">
                                    <font-awesome-icon :icon="['fas', 'comments']" />
                                    {{ data.count_comments || 0 }}
                                </div>

                                <div onclick="my_modal_playlist.showModal()"
                                    class="xl:text-2xl btn xl:btn-md btn-sm btn-ghost shadow-md bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30">
                                    <font-awesome-icon :icon="['fas', 'plus']" />
                                    <font-awesome-icon :icon="['fas', 'icons']" />
                                </div>

                                <a :href="baseService.BaseService.baseUrl + `${useMusic.urlBase}/download/${data._id}`"
                                    class="xl:text-2xl btn xl:btn-md btn-sm btn-ghost shadow-md bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30">
                                    <font-awesome-icon :icon="['fas', 'download']" />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div>
            <div>
                <dialog id="my_modal_comment" class="modal">

                    <div
                        class="modal-box max-w-fit p-10 overflow-hidden glass bg-gradient-to-r from-green-400/20 via-cyan-400/20 to-blue-400/20 bg-base-100">
                        <form method="dialog">
                            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>

                        <CommentVComment :data="data" />
                    </div>

                    <form method="dialog" class="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </div>


        <div>
            <div>
                <dialog id="my_modal_playlist" class="modal">

                    <div
                        class="modal-box max-w-fit p-10 overflow-hidden glass bg-gradient-to-r from-green-400/20 via-cyan-400/20 to-blue-400/20 bg-base-100">
                        <form method="dialog">
                            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>

                        <PlaylistVList />
                    </div>

                    <form method="dialog" class="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: Object,
});

const { t } = useI18n()

const usePlay = playStore()
const useMusic = musicStore()
const useFavorite = favoriteStore()
const useAuth = authStore()
const useComment = commentStore()
const isHeart = useState(`isHeart`)
const lengthHeart = ref(0)
const route = useRoute()
const heart = async () => {
    isHeart.value = !isHeart.value
    if (isHeart.value) {
        lengthHeart.value += 1
        await useFavorite.create({
            model: props.data._id,
            modelType: 'musics'
        });
    }
    else {
        lengthHeart.value -= 1
        await useFavorite.deleteOne(props.data._id);
    }
}

const getApi = async () => {
    try {
        if (route.params.id) {
            lengthHeart.value = await useFavorite.findModelLength(route.params.id)
            if (useAuth.user._id) {
                getHeart()
            }
            useComment.list = await useComment.findBy(route.params.id);

        }
    }
    catch (error) {
        // lengthHeart.value = 0
    }
}

const getHeart = async () => {
    try {
        const data = await useFavorite.findOneByUser(props.data._id)
        if (data) {
            isHeart.value = true;
        }
    }
    catch (error) {
        isHeart.value = false
    }

}


onMounted(() => {
    getApi()
})

onUnmounted(() => {
    useComment.list = []
})




</script>

<style></style>
