<template>
    <div class=" overflow-auto h-screen">
        <div class="bg-gradient-to-r from-green-400/5 via-cyan-400/5 to-blue-400/5 min-h-screen">
            <NotificationVManager />
            <div class="drawer">
                <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col">
                    <!-- Navbar -->
                    <LayoutVHeader class="" />
                    <div class="container sm:mx-auto duration-500">
                        <slot />
                    </div>
                </div>
                <div class="drawer-side z-40">
                    <label for="my-drawer-3" class="drawer-overlay"></label>
                    <ul class="menu p-4 w-72 h-full bg-base-100">
                        <!-- Sidebar content here -->
                        <LayoutVSidebar />
                    </ul>
                </div>
            </div>
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

onMounted(() => {
    loadAuth();
});
</script>

<style></style>
