<template>
    <div>
        <div class="w-full navbar">
            <div class="">
                <!-- for must same default.vue in layout -->
                <label for="my-drawer-3" class="btn btn-square btn-ghost">
                    <font-awesome-icon :icon="['fas', 'bars']" />
                </label>
            </div>
            <div class="flex-1 px-2 mx-2">
                <OtherVLogo />
            </div>
            <div class="">
                <ul class="menu menu-horizontal">
                    <!-- Navbar menu content here -->
                    <div>
                        <LayoutVTheme />
                    </div>
                    <div v-if="useAuth.user._id">
                        <LayoutVDropDownAvatar />
                    </div>
                    <div v-else class="space-x-2">
                        <nuxt-link class="btn" to="/auth/sign-in">{{ t("Login") }}</nuxt-link>
                        <nuxt-link class="btn" to="/auth/sign-up">{{ t("Register") }}</nuxt-link>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
const { t } = useI18n();

const useAuth = authStore();

const loadAuth = async () => {
    await useAuth.loadAuthState();
};

onMounted(() => {
    loadAuth();
});
</script>

<style></style>
