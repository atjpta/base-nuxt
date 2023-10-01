<template>
    <div>
        <div
            class="glass rounded-2xl cursor-pointer flex space-x-5 w-fit  h-80 p-4 bg-gradient-to-r hover:bg-gradient-to-l from-green-500/30 via-cyan-500/0 to-blue-500/30 ">
            <div>
                <div class="w-60 h-60 overflow-hidden rounded-full ">
                    <img class="rounded-full w-60 h-60 duration-500  hover:scale-110" :src="data?.avatar" alt="avatar">
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