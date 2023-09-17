<template>
    <div class="sticky top-0 z-[1] bg-base-100/50 blur-none ring-0">
        <div class="w-full navbar h-12 sm:h-16 min-h-min  items-center">
            <div class="lg:hidden">
                <!-- for must same default.vue in layout -->
                <label for="my-drawer-3" class="btn btn-sm sm:btn-md btn-ghost">
                    <font-awesome-icon :icon="['fas', 'bars']" />
                </label>
            </div>
            <div class="flex-1 sm:px-2 sm:mx-2 ">
                <div @click="navigateTo('/admin/manager/overview')" class="lg:hidden">
                    <OtherVLogo />
                </div>
            </div>

            <div class="">
                <ul class="sm:space-x-2 space-x-0.5 flex">
                    <!-- Navbar menu content here -->
                    <div>
                        <LayoutVTheme />
                    </div>

                    <div v-if="useAdmin.admin._id" class="flex items-center sm:space-x-4 space-x-1">
                        <div class="btn btn-ghost sm:btn-md btn-sm">
                            <font-awesome-icon class="text-teal-400 text-2xl" :icon="['fas', 'bell']" />
                        </div>
                        <LayoutVDropDownAvatar />
                    </div>
                    <div v-else>
                        <div class="hidden sm:flex space-x-2">
                            <nuxt-link class="btn btn-sm sm:btn-md w-32" to="/admin">
                                {{ t("Login") }}
                            </nuxt-link>
                        </div>

                        <div class="sm:hidden space-x-0.5">
                            <nuxt-link class="btn btn-ghost text-teal-400 btn-sm sm:btn-md sm:text-2xl text-xl"
                                to="/auth/sign-in">
                                <div class="sm:hidden">
                                    <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
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
const { t, locale } = useI18n();

const useAdmin = adminStore()
</script>

<style></style>
