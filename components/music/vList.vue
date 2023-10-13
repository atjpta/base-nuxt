<template>
    <div>
        <div class="m-auto md:w-3/4 my-10">
            <OtherVTitle class="pl-3 mb-10" title="Suggest another" />
            <MusicVMono2 :data="i" v-for="i in data" :key="i._id" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: Array
})
const { t } = useI18n()
</script>

<style></style>