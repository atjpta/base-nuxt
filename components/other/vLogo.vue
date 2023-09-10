<template>
    <div>
        <div>
            <div class="scale-100 sm:scale-125 btn btn-ghost bg-transparent hover:bg-transparent font-bold indicator">
                <div
                    class="w-20 h-9 duration-500 ring-4 ring-green-300/30 -skew-x-12 -skew-y-6 rounded-tl-full rounded-br-full bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400">
                </div>
                <div class="indicator-item top-1/2 right-1/2 translate-x-1/2">
                    <div
                        class="animate-ping w-8 h-8 ring-4 ring-green-300/30 rounded-full bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400">
                    </div>
                </div>

                <div class="indicator-item top-[48%] right-1/2 translate-x-1/2">
                    <div class="text-3xl">
                        <font-awesome-icon class="text-red-500" :icon="['fas', 'compact-disc']" spin />
                    </div>
                </div>
                <div
                    class="text-white font-extrabold px-3 indicator-item top-1/2 right-1/2 translate-x-1/2 -skew-x-12 -skew-y-6 scale-75">
                    BaseNuxt
                </div>
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style></style>
