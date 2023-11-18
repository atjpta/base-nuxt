<template>
    <div>
        <div>
            <AdminOverViewVStat :data="data" />
        </div>
    </div>
</template>

<script setup>
const useStore = userStore()

const data = ref({
    title: 'user',
    data: '',
    icon: 'user',
    url: '/admin/manager/user'
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


