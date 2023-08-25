<template>
    <div
        class="p-10 my-10 mx-auto w-4/5 rounded-md font-bold text-white text-center space-y-10 bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400">
        <div class="text-4xl">
            {{ t("Error 404: page has been deleted or not found!!.") }}
        </div>
        <nuxt-link class="btn" to="/"> {{ t("Return home") }} </nuxt-link>
    </div>
</template>

<script setup>
const { t } = useI18n();
</script>
<style></style>
