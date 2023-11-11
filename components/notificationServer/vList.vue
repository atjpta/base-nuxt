<template>
    <div>


        <div class="sm:h-12 h-8">
            <div class="dropdown dropdown-end dropdown-bottom ">
                <label tabindex="0" class="cursor-pointer">
                    <div class="btn btn-ghost sm:btn-md btn-sm indicator">
                        <div v-if="sumNewNotification > 0"
                            class="indicator-item top-2 right-2 badge-error w-5 h-5 rounded-full flex justify-center items-center">
                            {{ sumNewNotification }}
                        </div>
                        <font-awesome-icon class="text-teal-400 text-2xl" :icon="['fas', 'bell']" />
                    </div>
                </label>
                <ul tabindex="0"
                    class="dropdown-content z-[1] menu bg-base-100 lg:menu-horizontal rounded-box lg:mb-64 w-72 p-0">
                    <div class="bg-gradient-to-r from-green-400/10 via-cyan-400/10 to-blue-400/10 w-full p-2 rounded-box">

                        <div v-if="useNotificationServer.list.length == 0" class="h-40  flex justify-center items-center">
                            {{ t(`You don't have notification!!`) }}
                        </div>

                        <div v-else>
                            <div class="text-right">
                                <div @click="updateViewByUser" class="btn btn-xs btn-ghost">
                                    {{ t('Mark read all!!') }}
                                </div>
                            </div>



                            <li v-for="i in useNotificationServer.list" :key="i._id">
                                <a @click="updateViewOne(i._id)" class="w-full m-0.5" :class="getCssHover(i.type)">
                                    <font-awesome-icon :class="getCss(i.type)" class="text-xl "
                                        :icon="['fas', getIcon(i.type)]" />
                                    <div>
                                        {{ t(i.content) }}
                                    </div>
                                    <div v-if="!i.isView" class="rounded-full w-3 h-3 bg-error">
                                    </div>
                                    <div class="btn btn-sm btn-ghost" @click="deleteOne($event, i._id)">
                                        <font-awesome-icon class=" " :icon="['fas', 'x']" />

                                    </div>
                                </a>
                            </li>
                            <div @click="deleteByUser" class="btn btn-xs btn-ghost">
                                {{ t('Delete all!!') }}
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
const { t } = useI18n()
const useNotificationServer = notificationsServerStore()

const sumNewNotification = computed(() => {
    return useNotificationServer.list.filter(e => !e.isView).length
})

const getApi = async () => {
    useNotificationServer.findAllByUser()
}

watchSyncEffect(() => {
    getApi()
})

const getIcon = (type) => {
    if (type == 'warning') {
        return 'warning'
    }
    if (type == 'error') {
        return 'bolt'
    }
    return 'info-circle'
}

const getCss = (type) => {
    if (type == 'warning') {
        return 'text-warning'
    }
    if (type == 'error') {
        return 'text-error'
    }
    return 'text-info'
}

const getCssHover = (type) => {
    if (type == 'warning') {
        return 'hover:bg-warning/20'
    }
    if (type == 'error') {
        return 'hover:bg-error/20'
    }
    return 'hover:bg-info/20'
}

const updateViewOne = async (id) => {
    await useNotificationServer.updateViewOne(id, { isView: true })
    await getApi()
}

const updateViewByUser = async () => {
    await useNotificationServer.updateViewByUser()
    await getApi()
}

const deleteOne = async (e, id) => {
    e.stopPropagation();
    await useNotificationServer.deleteOne(id)
    if (useNotificationServer.list.length > 1) {
        await getApi()
    }
    else {
        useNotificationServer.list = []
    }
}

const deleteByUser = async (id) => {
    await useNotificationServer.deleteByUser()
    useNotificationServer.list = []
}

</script>

<style></style>