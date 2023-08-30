<template>
    <div>
        <UserVChangePassword />
    </div>
</template>

<script setup>
const { t } = useI18n();
useHead({
    title: `${t("Profile")} - ${t("Change password")}`,
});
</script>

<style></style>
