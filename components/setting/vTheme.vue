<template>
    <div>
        <button @click="getTheme()" class="btn btn-sm sm:btn-md" onclick="modelThemeSetting.showModal()">
            {{ theme }}
        </button>
        <dialog id="modelThemeSetting" class="modal">
            <form method="dialog" class="modal-box">
                <h3 class="font-bold text-lg">{{ t("Select theme") }}</h3>

                <div class="sm:columns-3 columns-2">
                    <div v-for="i in themes" :key="i" class="form-control">
                        <label class="label cursor-pointer">
                            <span class="label-text">{{ i }}</span>
                            <input :data-set-theme="i" data-act-class="ACTIVECLASS" type="radio" name="radio-theme"
                                class="radio checked:bg-teal-400" :checked="theme == i" />
                        </label>
                    </div>
                </div>

                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <div class="modal-action">
                    <button class="btn">OK</button>
                </div>
            </form>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </div>
</template>

<script setup>
import { themeChange } from "theme-change";
const { t } = useI18n();

const theme = ref(localStorage.getItem("theme"));

const getTheme = () => {
    theme.value = localStorage.getItem("theme");
};

const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
];
onMounted(() => {
    themeChange(false);
});
</script>

<style></style>
