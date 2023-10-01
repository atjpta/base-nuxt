<template>
    <div class="space-y-10">
        <div class="flex items-center">
            <div class="w-40">
                {{ t("Select theme:") }}
            </div>
            <SettingVTheme />
        </div>
        <div class="flex items-center">
            <div class="w-40">
                {{ t("Select language:") }}
            </div>
            <SettingVLanguage />
        </div>

        <div class="flex items-center">
            <div class="w-40">
                {{ t("Back ground:") }}
            </div>
            <SettingVBackGround />
        </div>
    </div>
</template>

<script setup>
const { t } = useI18n();
useHead({
    title: `${t("Profile")} - ${t("Setting")}`,
});
</script>

<style></style>
