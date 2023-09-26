<template>
    <div>
        <span
            class="italic before:h-[98%] before:my-auto py-1 before:block before:absolute before:-inset-1 before:-skew-y-3 before:-skew-x-12 before:bg-gradient-to-r before:from-green-400 before:via-cyan-400 before:to-blue-400 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 relative inline-block">
            <span class="relative text-white text-3xl font-black px-5">
                {{ t(title) }}
            </span>
        </span>
    </div>
</template>

<script setup>
const props = defineProps({
    title: String
})
const { t } = useI18n()
</script>

<style></style>