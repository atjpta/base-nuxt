<template>
    <div>
        <div v-if="sum > 0" class="p-3">

            <div @click="goTo($event, 'music', i._id)"
                class="cursor-pointer p-2 px-5 rounded-2xl hover:bg-gradient-to-l from-green-400/20 via-cyan-400/20 to-blue-400/20 "
                v-for=" i in useMusic.list" :key="i._id">
                <font-awesome-icon :icon="['fas', 'music']" />
                {{ i.name }}
            </div>
            <div class="divider my-0"></div>
            <div @click="goTo($event, 'singer', i._id)"
                class="cursor-pointer p-2 px-5 rounded-2xl hover:bg-gradient-to-l from-green-400/20 via-cyan-400/20 to-blue-400/20"
                v-for=" i in useSinger.list" :key="i._id">
                <font-awesome-icon :icon="['fas', 'microphone-lines']" />
                {{ i.name }}
            </div>
            <div class="divider my-0"></div>

            <div @click="goTo($event, 'country', i._id)"
                class="cursor-pointer p-2 px-5 rounded-2xl hover:bg-gradient-to-l from-green-400/20 via-cyan-400/20 to-blue-400/20"
                v-for=" i in useCountry.list" :key="i._id">
                <font-awesome-icon :icon="['fas', 'globe']" />
                {{ i.name }}
            </div>
            <div class="divider my-0"></div>

            <div @click="goTo($event, 'genre', i._id)"
                class="cursor-pointer p-2 px-5 rounded-2xl hover:bg-gradient-to-l from-green-400/20 via-cyan-400/20 to-blue-400/20"
                v-for=" i in useGenre.list" :key="i._id">
                <font-awesome-icon :icon="['fas', 'table-list']" />
                {{ i.name }}
            </div>

        </div>

    </div>
</template>

<script setup>
const useMusic = musicStore()
const useSinger = singerStore()
const useCountry = countryStore()
const useGenre = genreStore()
const isShow = useState('isShowSearch', (() => false))

const sum = computed(() => {
    return useMusic.list.length + useSinger.list.length + useCountry.list.length + useGenre.list.length
})

const goTo = (e, type, id) => {
    e.stopPropagation();
    isShow.value = false
    navigateTo(`/explorer/${type}/${id}`)
}
</script>

<style></style>