<template>
    <div>
        <div class="toast toast-top h-fit z-50" :class="list.length > 0 ? '' : 'p-0'">
            <!-- <transition :name="bounce"> -->
            <div class="space-y-5">
                <component v-for="i in list" :key="i" :is="i.cpn" :index="i.key" />
            </div>
            <!-- </transition> -->
        </div>
    </div>
</template>

<script setup>
import vInfo from "./vInfo.vue";
import vSuccess from "./vSuccess.vue";
import vError from "./vError.vue";
const useNotification = notificationStore();
const list = computed(() => {
    const data = [];
    useNotification.list.forEach((e, key) => {
        switch (e.type) {
            case "info":
                data.push({ ...e, key, cpn: vInfo });
                break;

            case "error":
                data.push({ ...e, key, cpn: vError });
                break;

            case "success":
                data.push({ ...e, key, cpn: vSuccess });
                break;

            default:
                break;
        }
    });
    return data;
});
</script>

<style>
@keyframes bounce-in {
    0% {
        opacity: 0;
        transform: scale(0.9);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

.bounce-enter-active {
    animation: bounce-in 0.5s;
}
</style>
