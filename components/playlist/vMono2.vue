<template>
    <div>
        <div @click="navigateTo(`/for-you/playlist/${data._id}`)"
            class="glass rounded-2xl cursor-pointer flex space-x-5 w-fit h-80 p-4 bg-gradient-to-r hover:bg-gradient-to-l from-green-500/0 via-cyan-500/30 to-blue-500/30 ">
            <div>
                <div class="w-60 h-60 overflow-hidden mask mask-parallelogram-3 ">
                    <img class="mask mask-parallelogram-3 w-60 h-60 duration-500  hover:scale-110" :src="data?.url_image"
                        alt="avatar">
                </div>
                <div class="text-center text-2xl mt-3 font-bold">
                    {{ data.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: Object
})
const { t } = useI18n()
</script>

<style></style>