<template>
    <div>
        <div>
            <AdminOverViewVStat :data="data" />
        </div>
    </div>
</template>

<script setup>
const useStore = commentStore()

const data = ref({
    title: 'comment',
    data: '',
    icon: 'comments',
    url: '/admin/manager/overview'
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


