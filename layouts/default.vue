<template>
    <div>
        <div class="bg-gradient-to-r from-green-400/5 via-cyan-400/5 to-blue-400/5 min-h-screen">
            <NotificationVManager />
            <div class="drawer">
                <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col">
                    <!-- Navbar -->
                    <LayoutVHeader />
                    <div class="container sm:mx-auto px-5 duration-500">
                        <slot />
                    </div>
                </div>
                <div class="drawer-side">
                    <label for="my-drawer-3" class="drawer-overlay"></label>
                    <ul class="menu p-4 w-72 h-full bg-base-100">
                        <!-- Sidebar content here -->
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style></style>
