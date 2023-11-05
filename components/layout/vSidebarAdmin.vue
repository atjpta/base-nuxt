<template>
    <div class="">
        <div class="flex mb-10 justify-between    ">

            <div></div>
            <div class=" sm:px-2 sm:mx-2 ">
                <div @click="navigateTo('/admin/manager/overview')" class="">
                    <OtherVLogo />
                </div>
            </div>
            <div class="">
                <label for="my-drawer-3" class="btn btn-sm sm:btn-md btn-ghost lg:hidden flex">
                    <font-awesome-icon :icon="['fas', 'x']" />
                </label>
            </div>
        </div>

        <OtherVMenu :turnOffDrawer="props.turnOffDrawer" :index="0" :menu="list" />

    </div>
</template>

<script setup>

const props = defineProps({
    turnOffDrawer: Function
})

const list = ref([
    {
        icon: `dice-d6`,
        title: 'overview',
        url: '/admin/manager/overview',
        list: [
        ],
    },
    {
        icon: `user`,
        title: 'user',
        url: '/admin/manager/user',
        level: 3,
        list: [],
    },
    {
        icon: `flag`,
        title: 'report',
        url: '/admin/manager/report',
        level: 3,
        list: [
            {
                icon: `comments`,
                title: 'comment',
                url: '/admin/manager/report/comment',
                level: 4,
                list: [],
            },
            {
                icon: `warning`,
                title: 'List warning',
                url: '/admin/manager/report/list-warning',
                level: 4,
                list: [],
            },
            {
                icon: `ban`,
                title: 'List banned',
                url: '/admin/manager/report/list-banned',
                level: 4,
                list: [],
            },
        ],
    },
    {
        icon: `music`,
        title: 'song',
        url: '/admin/manager/music',
        level: 3,
        list: [],
    },
    {
        icon: `microphone-lines`,
        title: 'singer',
        url: '/admin/manager/singer',
        level: 3,
        list: [],
    },
    {
        icon: `table-list`,
        title: 'genre',
        url: '/admin/manager/genre',
        level: 3,
        list: [],
    },
    {
        icon: `globe`,
        title: 'country',
        url: '/admin/manager/country',
        level: 3,
        list: [],
    },
    {
        icon: `image`,
        title: 'news',
        url: '/admin/manager/news',
        level: 3,
        list: [],
    },
    {
        icon: `user`,
        title: 'level1',
        url: '/admin/manager/level1',
        level: 3,
        list: [
            {
                icon: `user`,
                title: 'level1-1',
                url: '/admin/manager/level1/level1-1',
                level: 4,
                list: [
                    {
                        icon: `user`,
                        title: 'level1-1-1',
                        url: '/admin/manager/level1/level1-1/level1-1-1',
                        level: 5,
                        list: [],
                    }
                ]
            },
            {
                icon: `user`,
                title: 'level1-2',
                url: '/admin/manager/level1/level1-2',
                level: 4,
                list: [
                    {
                        icon: `user`,
                        title: 'level1-2-1',
                        url: '/admin/manager/level1/level1-2/level1-2-1',
                        level: 5,
                        list: [],
                    },
                    {
                        icon: `user`,
                        title: 'level1-2-2',
                        url: '/admin/manager/level1/level1-2/level1-2-2',
                        level: 5,
                        list: [],
                    }
                ]
            },
            {
                icon: `user`,
                title: 'level1-3',
                url: '/admin/manager/level1/level1-3',
                level: 4,
                list: [
                ]
            }
        ],
    },


])

</script>

<style></style>
