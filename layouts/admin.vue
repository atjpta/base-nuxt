<template>
    <div class=" overflow-scroll h-screen ">
        <div class="bg-gradient-to-r from-green-400/5 via-cyan-400/5 to-blue-400/5 min-h-screen ">
            <NotificationVManager />
            <div class="drawer lg:drawer-open">
                <!-- <div class="drawer drawer-open"> -->
                <input ref="btnTurnOff" id="my-drawer-3" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col">
                    <!-- Navbar -->
                    <LayoutVHeaderAdmin class="" />
                    <div class="container sm:mx-auto sm:px-5 duration-500 ">
                        <slot />
                    </div>
                </div>
                <div class="drawer-side z-40">
                    <label for="my-drawer-3" class="drawer-overlay"></label>
                    <ul
                        class="menu p-4 w-72 h-full bg-base-100 bg-gradient-to-r from-green-400/20 via-cyan-400/20 to-blue-400/20">
                        <!-- Sidebar content here -->
                        <LayoutVSidebarAdmin :turnOffDrawer="turnOffDrawer" />
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { t, locale } = useI18n();
const useAdmin = adminStore();

const loadAuth = async () => {
    await useAdmin.loadAuthState();
    locale.value = localStorage.getItem("language") || "vi";
    console.log('load loadAuth admin');
};

const btnTurnOff = ref()

const turnOffDrawer = () => {
    btnTurnOff.value.click()

}

onMounted(() => {
    loadAuth();
});

</script>

<style></style>
