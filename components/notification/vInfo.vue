<template>
    <div class="alert shadow-lg glass">
        <font-awesome-icon class="text-info" :icon="['fas', 'circle-info']" />
        <div>
            <h3 class="font-bold">New message!</h3>
            <div class="text-xs">
                {{ notification?.message || "You have 1 unread message" }}
            </div>
        </div>
        <div @click="close()" class="radial-progress text-info cursor-pointer" :style="time" style="--size: 50px">
            See
        </div>
    </div>
</template>

<script setup>
const useNotification = notificationStore();
const props = defineProps({
    index: Number,
});

const notification = ref();

const time = computed(() => {
    return `--value: ${(timeCount.value / 300) * 100};`;
});
let timeCount = ref();

const intervalId = setInterval(() => {
    timeCount.value--;
    if (timeCount.value == 0) {
        close();
        clearInterval(intervalId);
    }
}, 10); // Mỗi 1000ms (1 giây)

const getData = () => {
    notification.value = useNotification.list.get(props.index);
    timeCount.value = notification.value.time || 300;
};

const close = () => {
    useNotification.delete(props.index);
};

onMounted(() => {
    getData();
});

const update = () => {
    if (timeCount.value > 0) {
        useNotification.update(props.index, timeCount.value);
    }
};

onUnmounted(() => {
    update();
});
</script>
