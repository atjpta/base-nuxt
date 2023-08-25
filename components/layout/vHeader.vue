<template>
    <div>
        <div class="w-full navbar h-12 sm:h-16 min-h-min flex items-center">
            <div class="">
                <!-- for must same default.vue in layout -->
                <label for="my-drawer-3" class="btn btn-sm sm:btn-md btn-ghost">
                    <font-awesome-icon :icon="['fas', 'bars']" />
                </label>
            </div>
            <div class="flex-1 sm:px-2 sm:mx-2">
                <OtherVLogo />
            </div>
            <div class="">
                <ul class="sm:space-x-2 space-x-0.5 flex">
                    <!-- Navbar menu content here -->
                    <div>
                        <LayoutVTheme />
                    </div>

                    <div v-if="useAuth.user._id" class="flex items-center sm:space-x-4 space-x-1">
                        <div class="btn btn-ghost sm:btn-md btn-sm">
                            <font-awesome-icon class="text-teal-400 text-2xl" :icon="['fas', 'bell']" />
                        </div>
                        <LayoutVDropDownAvatar />
                    </div>
                    <div v-else>
                        <div class="hidden sm:flex space-x-2">
                            <nuxt-link class="btn text-teal-400 btn-sm sm:btn-md" to="/auth/sign-in">
                                {{ t("Login") }}
                            </nuxt-link>
                            <nuxt-link class="btn text-teal-400 btn-sm sm:btn-md" to="/auth/sign-up">
                                {{ t("Register") }}
                            </nuxt-link>
                        </div>

                        <div class="sm:hidden space-x-0.5">
                            <nuxt-link class="btn btn-ghost text-teal-400 btn-sm sm:btn-md sm:text-2xl text-xl"
                                to="/auth/sign-in">
                                <div class="sm:hidden">
                                    <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
                                </div>
                            </nuxt-link>
                            <nuxt-link class="btn btn-ghost text-teal-400 btn-sm sm:btn-md sm:text-2xl text-xl"
                                to="/auth/sign-up">
                                <div class="sm:hidden">
                                    <font-awesome-icon :icon="['fas', 'user-pen']" />
                                </div>
                            </nuxt-link>
                        </div>
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
