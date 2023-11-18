<template>
    <div>
        <div>
            <AdminOverViewVStat :data="data" />
        </div>
    </div>
</template>

<script setup>
const useStore = musicStore()

const data = ref({
    title: 'view',
    data: '',
    icon: 'headphones',
    url: '/admin/manager/music'
},);

const getApi = async () => {
    try {
        data.value.data = await useStore.getTotalView()
    } catch (error) {
        data.value.data = 0
    }
}

onMounted(() => {
    getApi()
})

</script>


