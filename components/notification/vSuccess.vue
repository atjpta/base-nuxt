<template>
    <div class="alert shadow-lg glass">
        <font-awesome-icon class="text-teal-400" :icon="['fas', 'circle-check']" />
        <div>
            <h3 class="font-bold">Success!</h3>
            <div class="text-xs">
                {{ notification?.message || "it word ^^!!" }}
            </div>
        </div>
        <div @click="close()" class="radial-progress text-teal-400 cursor-pointer" :style="time" style="--size: 50px">
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
    if (timeCount.value > 10) {
        useNotification.update(props.index, timeCount.value);
    } else {
        useNotification.update(props.index, timeCount.value);
    }
};

onUnmounted(() => {
    update();
});
</script>
