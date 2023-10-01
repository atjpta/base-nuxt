<template>
    <div>
        <div>
            <div class="form-control w-52">
                <label class="cursor-pointer label">
                    <input v-model="usePlay.isBgImage" type="checkbox" class="toggle toggle-primary" checked />
                </label>
            </div>
        </div>
    </div>
</template>
<script setup>
const usePlay = playStore()
</script>

<style></style>