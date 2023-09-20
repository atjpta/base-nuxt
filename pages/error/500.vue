<template>
    <div
        class="w-fit p-10 m-10 mx-auto rounded-md font-bold text-white text-center space-y-10 bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400">
        <div class="text-4xl">
            {{ t("Error 500: server not working!!.") }}
        </div>
        <div class="text-4xl">
            {{ t("You can come back another time!!.") }}
        </div>
        <nuxt-link class="btn" to="/"> {{ t("Return home") }} </nuxt-link>
    </div>
</template>

<script setup>
const { t } = useI18n();
</script>
<style></style>
