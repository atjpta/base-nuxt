<template>
    <div class="space-y-5">
        <div class="space-y-2">
            <div>
                {{ t("Name") }}
            </div>
            <input v-model="user.fullName" type="text" class="input" />
        </div>
        <div class="space-y-2">
            <div>
                {{ t("Avatar") }}
            </div>
            <img :src="avatar || user.avatar" class="w-32 h-32" alt="avatar" />
            <input @change="changeImage($event)" type="file" accept="image/*"
                class="file-input file-input-bordered w-full max-w-xs" />
        </div>
        <div class="flex justify-end">
            <div @click="update" :class="loading ? 'loading' : ''" class="btn">
                {{ t("Save") }}
            </div>
        </div>
    </div>
</template>

<script setup>
const { t } = useI18n();
const useUser = userStore();
const route = useRoute();
const useAuth = authStore();
const useNotification = notificationStore();
const avatar = ref();
const dataUpdate = ref(new FormData());
const user = ref({});
const loading = ref(false);
const getApi = async () => {
    user.value = await useUser.findOne(route.params.id);
};

const changeImage = async (event) => {
    const file = event.target.files[0];
    const theReader = new FileReader();
    theReader.onloadend = async () => {
        avatar.value = await theReader.result;
    };
    theReader.readAsDataURL(file);
    dataUpdate.value.set("file", file);
};

const update = async () => {
    try {
        loading.value = true;
        dataUpdate.value.set("fullName", user.value.fullName);
        const newData = await useUser.update(dataUpdate.value);
        useAuth.update(newData);
        useNotification.show("success", t("Update success"));
    } catch (error) {
        useNotification.show("error", t("Can't update"));
    } finally {
        loading.value = false;
    }
};

onMounted(async () => {
    await getApi();
});
</script>

<style></style>
