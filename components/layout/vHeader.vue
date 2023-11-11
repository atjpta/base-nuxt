<template>
    <div class="sticky top-0 z-[1] glass ring-0">
        <div class="w-full navbar h-12 sm:h-16 min-h-min flex items-center justify-between">
            <div class="">
                <!-- for must same default.vue in layout -->
                <label for="my-drawer-3" class="btn btn-sm sm:btn-md btn-ghost">
                    <font-awesome-icon :icon="['fas', 'bars']" />
                </label>
                <div @click="navigateTo('/')" class="sm:px-2 sm:mx-2">
                    <OtherVLogo />
                </div>
            </div>

            <div @mouseleave="isShow = false" class="hidden sm:flex relative">
                <OtherVSearch class="w-full" id="search-all" @search="search" />
                <div v-if="isShow">
                    <div class="bg-base-100 z-20">
                        <OtherVListAutoComplete
                            class="absolute left-0 translate-y-5 w-96 max-h-96 bg-base-100 overflow-y-scroll"
                            v-if="!loadingSearch" />
                        <div v-else>
                            {{ t('List empty!!') }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="">
                <ul class="sm:space-x-2 space-x-0.5 flex">
                    <!-- Navbar menu content here -->
                    <div>
                        <LayoutVTheme />
                    </div>

                    <div v-if="useAuth.user._id" class="flex items-center sm:space-x-4 space-x-1">
                        <NotificationServerVList />
                        <LayoutVDropDownAvatar />
                    </div>
                    <div v-else>
                        <div class="hidden sm:flex space-x-2">
                            <nuxt-link class="btn btn-sm sm:btn-md w-32" to="/auth/sign-in">
                                {{ t("Login") }}
                            </nuxt-link>
                            <nuxt-link class="btn btn-sm sm:btn-md w-32" to="/auth/sign-up">
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
const { t, locale } = useI18n();

const useAuth = authStore();
const useMusic = musicStore()
const useSinger = singerStore()
const useCountry = countryStore()
const useGenre = genreStore()
const data = useState('search-all')
const isShow = useState('isShowSearch', (() => false))
const loadingSearch = ref(false)
const search = () => {
    try {
        isShow.value = true
        loadingSearch.value = true
        useMusic.search(data.value, 1, 5);
        useSinger.search(data.value, 1, 5);
        useCountry.search(data.value, 1, 5);
        useGenre.search(data.value, 1, 5);
    } catch (error) {

    }
    finally {
        loadingSearch.value = false
    }
}

</script>

<style></style>
