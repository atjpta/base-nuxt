<template>
    <div>
        <div>
            <AdminOverViewVStat :data="data" />
        </div>
    </div>
</template>

<script setup>
const useStore = singerStore()

const data = ref({
    title: 'singer',
    data: '',
    icon: 'microphone-lines',
    url: '/admin/manager/singer'
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


