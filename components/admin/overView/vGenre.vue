<template>
    <div>
        <div>
            <AdminOverViewVStat :data="data" />
        </div>
    </div>
</template>

<script setup>
const useStore = genreStore()

const data = ref({
    title: 'genre',
    data: '',
    icon: 'table-list',
    url: '/admin/manager/genre'
},);

const getApi = async () => {
    try {
        data.value.data = await useStore.getTotal()
    } catch (error) {
        data.value.data = 0
    }
}

onMounted(() => {
    getApi()
})

</script>


