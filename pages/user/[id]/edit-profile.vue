<template>
    <div>
        <UserVEditProfile />
    </div>
</template>

<script setup>
const { t } = useI18n();

useHead({
    title: `${t("Profile")} - ${t("Edit profile")}`,
});
</script>

<style></style>
