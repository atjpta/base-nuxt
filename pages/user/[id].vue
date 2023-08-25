<template>
    <div>
        {{ useUser.model }}
    </div>
</template>

<script setup>
const useUser = userStore();
const route = useRoute();
const getApi = async () => {
    try {
        await useUser.findOne(route.params.id);
    } catch (error) {
        navigateTo("/error/404");
    }
};

onMounted(async () => {
    await getApi();
});
</script>

<style></style>
