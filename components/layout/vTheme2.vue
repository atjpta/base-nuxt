
<template>
    <div class="flex">
        <button @click="theme = !theme" class="btn btn-ghost" data-toggle-theme="dark,light" data-act-class="ACTIVECLASS">
            <font-awesome-icon v-if="theme" :icon="['fas', 'sun']" />
            <font-awesome-icon v-else :icon="['fas', 'moon']" />
        </button>
    </div>
</template>

<script setup>
import { themeChange } from "theme-change";
const theme = ref();
const setTheme = () => {
    theme.value = localStorage.getItem("theme") == "light" ? true : false;
}

onMounted(() => {
    setTheme();
    themeChange(false);
});
</script>

<style></style>