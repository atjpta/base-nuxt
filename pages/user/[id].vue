<template>
    <div class="mt-10 space-y-5">
        <UserVInfo :user="useUser.model" />
        <div class="">
            <OtherVTabs :tabs="tabs" />
        </div>
        <NuxtPage />
    </div>
</template>

<script setup>
const useUser = userStore();
const route = useRoute();
const { t } = useI18n();
const tabs = [
    {
        url: `/user/${route.params.id}/home`,
        title: "Home",
    },
    {
        url: `/user/${route.params.id}/change-password`,
        title: "Change password",
    },
    {
        url: `/user/${route.params.id}/setting`,
        title: "Setting",
    },
];

const getApi = async () => {
    try {
        await useUser.findOne(route.params.id);
        // navigateTo(`${route.params.id}/home`);
    } catch (error) {
        navigateTo("/error/404");
    }
};

onMounted(async () => {
    await getApi();
});

useHead({
    title: t("Profile"),
});
definePageMeta({});
</script>

<style></style>
