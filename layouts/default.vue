<template>
    <div class=" overflow-auto h-screen">
        <div class="bg-gradient-to-r from-green-400/5 via-cyan-400/5 to-blue-400/5 min-h-screen">
            <!-- bg -->
            <div class="toast toast-center toast-middle h-screen w-screen blur-lg bg-cover " :style="image">
            </div>
            <NotificationVManager />
            <div class="drawer">
                <input ref="btnTurnOff" id="my-drawer-3" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col">
                    <!-- Navbar -->
                    <LayoutVHeader class="" />
                    <div class="container sm:mx-auto duration-500 min-h-screen">
                        <slot />
                    </div>
                    <LayoutVFooter />
                </div>
                <div class="drawer-side z-40">
                    <label for="my-drawer-3" class="drawer-overlay"></label>
                    <ul
                        class="menu p-4 w-72 h-full bg-base-100 bg-gradient-to-r from-green-400/20 via-cyan-400/20 to-blue-400/20">
                        <!-- Sidebar content here -->
                        <LayoutVSidebar :turnOffDrawer="turnOffDrawer" />
                    </ul>
                </div>
            </div>
            <PlayMusicVFooterMusic class="fixed bottom-0 w-full" />
        </div>
    </div>
</template>

<script setup>
const { t, locale } = useI18n();

const useAuth = authStore();

const loadAuth = async () => {
    await useAuth.loadAuthState();
    locale.value = localStorage.getItem("language") || "vi";
    console.log('load loadAuth user');

};

const usePlay = playStore();

const image = computed(() => {
    if (usePlay.isBgImage) {
        return `background-image: url(${usePlay.song.url_image || usePlay.image})`;
    } else return "";
});

const btnTurnOff = ref()

const turnOffDrawer = () => {
    btnTurnOff.value.click()

}

onMounted(() => {
    loadAuth();
});
</script>

<style></style>
