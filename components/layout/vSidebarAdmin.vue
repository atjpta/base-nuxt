<template>
    <div class="uppercase">
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

        <OtherVMenu :turnOffDrawer="props.turnOffDrawer" :index="0" :menu="listPermission" />
    </div>
</template>

<script setup>

const props = defineProps({
    turnOffDrawer: Function
})

const useAdmin = adminStore()

const listPermission = computed(() => {
    const newList = []
    if (useAdmin.admin) {
        list.value.forEach(e1 => {
            if (e1.key == 'overview' || useAdmin.admin.role == 'root') {
                newList.push(e1)
            }
            else {
                if (useAdmin.admin._id) {
                    useAdmin.admin.permissions.forEach((e2) => {
                        if (e1.key == e2.name) {
                            newList.push(e1)
                            return
                        }
                    })
                }
            }
        })
    }
    return newList
})

const list = ref([
    {
        icon: `dice-d6`,
        title: 'overview',
        url: '/admin/manager/overview',
        key: 'overview',
        list: [
        ],
    },
    {
        icon: `user`,
        title: 'user',
        url: '/admin/manager/user',
        key: 'users',
        level: 3,
        list: [],
    },
    {
        icon: `flag`,
        title: 'report',
        url: '/admin/manager/report',
        key: 'reports',
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
        key: 'musics',
        level: 3,
        list: [],
    },
    {
        icon: `microphone-lines`,
        title: 'singer',
        url: '/admin/manager/singer',
        key: 'singers',
        level: 3,
        list: [],
    },
    {
        icon: `table-list`,
        title: 'genre',
        url: '/admin/manager/genre',
        key: 'genres',
        level: 3,
        list: [],
    },
    {
        icon: `globe`,
        title: 'country',
        url: '/admin/manager/country',
        key: 'countries',
        level: 3,
        list: [],
    },
    {
        icon: `image`,
        title: 'news',
        url: '/admin/manager/news',
        key: 'news',
        level: 3,
        list: [],
    },
    // {
    //     icon: `user`,
    //     title: 'level1',
    //     url: '/admin/manager/level1',
    //     level: 3,
    //     list: [
    //         {
    //             icon: `user`,
    //             title: 'level1-1',
    //             url: '/admin/manager/level1/level1-1',
    //             level: 4,
    //             list: [
    //                 {
    //                     icon: `user`,
    //                     title: 'level1-1-1',
    //                     url: '/admin/manager/level1/level1-1/level1-1-1',
    //                     level: 5,
    //                     list: [],
    //                 }
    //             ]
    //         },
    //         {
    //             icon: `user`,
    //             title: 'level1-2',
    //             url: '/admin/manager/level1/level1-2',
    //             level: 4,
    //             list: [
    //                 {
    //                     icon: `user`,
    //                     title: 'level1-2-1',
    //                     url: '/admin/manager/level1/level1-2/level1-2-1',
    //                     level: 5,
    //                     list: [],
    //                 },
    //                 {
    //                     icon: `user`,
    //                     title: 'level1-2-2',
    //                     url: '/admin/manager/level1/level1-2/level1-2-2',
    //                     level: 5,
    //                     list: [],
    //                 }
    //             ]
    //         },
    //         {
    //             icon: `user`,
    //             title: 'level1-3',
    //             url: '/admin/manager/level1/level1-3',
    //             level: 4,
    //             list: [
    //             ]
    //         }
    //     ],
    // },
])

</script>

<style></style>
