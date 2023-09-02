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
const useAuth = authStore();

const itMe = computed(() => {
    return useUser.model._id == useAuth.user._id;
});

const route = useRoute();
const { t } = useI18n();
const tabs = computed(() => {
    return [
        {
            url: `/user/${route.params.id}/home`,
            title: "Home",
            isShow: true,
        },
        {
            url: `/user/${route.params.id}/edit-profile`,
            title: "Edit profile",
            isShow: itMe.value,
            props: useUser.model,
        },
        {
            url: `/user/${route.params.id}/change-password`,
            title: "Change password",
            isShow: itMe.value,
        },
        {
            url: `/user/${route.params.id}/setting`,
            title: "Setting",
            isShow: itMe.value,
        },
    ];
});

const getApi = async () => {
    try {
        const data = await useUser.findOne(route.params.id);
        useUser.model = data;
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
