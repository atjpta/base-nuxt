<template>
    <div>
        <button class="btn btn-sm sm:btn-md" onclick="modelLanguageSetting.showModal()">
            {{ listLanguage.get(locale) }}
        </button>
        <dialog id="modelLanguageSetting" class="modal">
            <form method="dialog" class="modal-box bg-gradient-to-r from-green-400/10 via-cyan-400/10 to-blue-400/10">
                <h3 class="font-bold text-lg">{{ t("Select language") }}</h3>

                <div class="sm:columns-3 columns-2">
                    <div v-for="i in listLanguage" :key="i" class="form-control">
                        <label @click="setLanguage(i[0])" class="label cursor-pointer">
                            <span class="label-text">{{ i[1] }}</span>
                            <input type="radio" name="radio-theme" class="radio checked:bg-teal-400"
                                :checked="i[0] == locale" />
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
const { locale, t } = useI18n();
const listLanguage = new Map().set("en", "English").set("vi", "VietNamese");
const setLanguage = (data) => {
    locale.value = data;
    localStorage.setItem("language", data);
};
</script>

<style></style>
