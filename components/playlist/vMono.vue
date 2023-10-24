<template>
    <div class=" ">
        <div
            class="flex space-x-10 py-3 items-center cursor-pointer hover:bg-gradient-to-r from-green-400/20 via-cyan-400/20 to-blue-400/20">
            <div>
                <img class="w-12 h-12 avatar" :src="data.url_image" alt="">
            </div>
            <div class="font-semibold">
                {{ data.name }}
            </div>


        </div>
        <div class="divider my-0">

        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: Object
})


</script>

<style></style>