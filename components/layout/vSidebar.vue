<template>
    <div class="">
        <div class="flex mb-10 justify-between    ">

            <div></div>
            <div class=" sm:px-2 sm:mx-2 ">
                <div @click="goHome" class="">
                    <OtherVLogo />
                </div>
            </div>
            <div class="">
                <label for="my-drawer-3" class="btn btn-sm sm:btn-md btn-ghost lg:hidden flex">
                    <font-awesome-icon :icon="['fas', 'x']" />
                </label>
            </div>
        </div>

        <OtherVMenu :is-open="true" :turnOffDrawer="props.turnOffDrawer" :index="0" :menu="list" />

    </div>
</template>

<script setup>

const props = defineProps({
    turnOffDrawer: Function
})

const list = ref([
    {
        icon: `list`,
        title: 'explorer',
        url: '/explorer',
        level: 1,
        list: [
            {
                icon: `music`,
                title: 'music',
                url: '/explorer/music',
                level: 2,
                list: [
                ]
            },
            {
                icon: `microphone-lines`,
                title: 'singer',
                url: '/explorer/singer',
                level: 2,
                list: [
                ]
            },
            {
                icon: `table-list`,
                title: 'genre',
                url: '/explorer/genre',
                level: 2,
                list: [
                ]
            },
            {
                icon: `globe`,
                title: 'country',
                url: '/explorer/country',
                level: 2,
                list: [
                ]
            },
        ],
    },

    {
        icon: `user`,
        title: 'for you',
        url: '/for-you',
        level: 1,
        list: [
            {
                icon: `table-list`,
                title: 'playlist',
                url: '/for-you/playlist',
                level: 2,
                list: [
                ]
            },
            {
                icon: `heart`,
                title: 'music favorite',
                url: '/for-you/favorite/music',
                level: 2,
                list: [
                ]
            },
            {
                icon: `heart`,
                title: 'singer favorite',
                url: '/for-you/favorite/singer',
                level: 2,
                list: [
                ]
            },
        ],
    },


])

const goHome = () => {
    navigateTo('/')
    props.turnOffDrawer()
}

</script>

<style></style>
