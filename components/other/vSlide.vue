<template>
    <div>
        <div class="container p-10 mx-auto">
            <div class="w-full lg:h-96 h-60 overflow-hidden relative">
                <div class="w-fit mx-auto">
                    <div
                        class="w-fit h-full  absolute right-1/2 translate-x-1/2  scroll-smooth carousel carousel-center rounded-box">
                        <TransitionGroup name="list">
                            <div class=" lg:mx-[25px] lg:w-[600px] lg:h-96 w-80 h-60  hover:scale-110 duration-300"
                                v-for="(i, index) in list" :key="i.id">
                                <div>
                                    <img @click="select(index)"
                                        class="lg:w-[600px] lg:h-96 w-80 h-60 duration-300 cursor-pointer "
                                        :class="index == 1 ? 'scale-100' : 'scale-75 opacity-50'"
                                        :src="i.url || `~/assets/image/1.jpg`" />
                                </div>
                            </div>
                        </TransitionGroup>
                    </div>
                </div>
                <div>
                    <div class=" absolute left-2 top-1/2 -translate-y-1/2 ">
                        <div @click="pre" class="btn btn-circle btn-sm btn-outline">
                            {{ '<' }} </div>
                        </div>
                        <div class=" absolute right-2 top-1/2 -translate-y-1/2 ">
                            <div @click="next" class="btn btn-circle btn-sm btn-outline">
                                {{ '>' }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup>
const props = defineProps({
    listDefault: Array,
})
const list = ref([]);
const index = ref(1);
const delay = 1500;
const isScroll = ref()
const createData = (size) => {
    if (props.listDefault) {

        for (let i = 0; i < size; i++) {
            list.value.push(props.listDefault[i]);
        }
        isScroll.value = scroll()
    }
};

const scroll = (() => {
    const test = setInterval(() => {
        next()
    }, delay);
    return test
})


const scrollingRandom = () => {
    let random = ~~(Math.random() * 100) % 20;
    if (random < 5) {
        random = 5;
    }
    let times = 0;
    list.length = 0;
    const scroll = setInterval(() => {
        times++;
        if (times >= random) {
            clearInterval(scroll);
        }
        next()
    }, delay);

};

const next = () => {
    index.value++;
    if (index.value > props.listDefault.length - 1) {
        index.value = 0
    }
    let i = index.value
    if (index.value + 1 > props.listDefault.length - 1) {
        i = -1;
    }
    list.value.shift();
    list.value.push(props.listDefault[i + 1]);
    setTimeout(() => {
    }, delay / 2);
}

const pre = () => {
    index.value--;
    if (index.value < 0) {
        index.value = props.listDefault.length - 1;
    }
    let i = index.value

    if (index.value - 1 < 0) {
        i = props.listDefault.length;
    }
    list.value.pop();
    list.value.unshift(props.listDefault[i - 1]);
    setTimeout(() => {
    }, delay / 2);
}

const select = (index) => {
    if (index == 0) {
        pre()
    }
    else if (index == 2) {
        next()
    }
}
const scrolling = () => {
    isScroll.value = scrollingRandom()
    isScroll.value = scroll()
};

const Stop = () => {
    clearInterval(isScroll.value);
}

onMounted(() => {
    createData(3);
});

onUnmounted(() => {
    Stop()
})
</script>

<style>
.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.2s ease;
}

.list-leave-active {
    opacity: 0;
    display: none;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}
</style>
