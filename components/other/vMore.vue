<template>
    <div class="w-40 h-40 flex justify-center items-center text-center  ">
        <div>
            <div class="btn btn-circle btn-lg btn-outline text-teal-300">
                <font-awesome-icon :icon="['fas', 'arrow-right']" />
            </div>
            <div class="text-2xl">
                {{ t('See more') }}
            </div>
        </div>
    </div>
</template>

<script setup>
const { t } = useI18n()
</script>

<style></style>