<template>
    <div>
        <div class="container my-10 mx-auto">
            <div class="w-full lg:h-[700px] h-60 overflow-hidden relative">
                <div class="w-fit mx-auto">
                    <div
                        class="w-fit h-full  absolute right-1/2 translate-x-1/2  scroll-smooth carousel carousel-center rounded-box">

                        <WaveSongVWave1 :data="usePlay.song"
                            class="lg:w-[700px] lg:h-[700px] w-60 h-60 duration-300 cursor-pointer " />
                        <!-- <TransitionGroup name="list">
                            <div class=" lg:mx-[25px] lg:w-[700px] lg:h-[700px] w-60 h-60 duration-300"
                                v-for="(i, index) in list" :key="i?._id ?? index">
                                <div>
                                    

                                </div>
                            </div>
                        </TransitionGroup> -->
                    </div>
                </div>
                <div>
                    <div class=" absolute left-2 top-1/2 -translate-y-1/2 ">
                        <div @click="pre()" class="btn btn-circle btn-sm btn-outline">
                            {{ '<' }} </div>
                        </div>
                        <div class=" absolute right-2 top-1/2 -translate-y-1/2 ">
                            <div @click="next()" class="btn btn-circle btn-sm btn-outline">
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
const usePlay = playStore()
const list = ref([]);
const index = ref(1);
const delay = 1500;
const isScroll = ref()
const createData = (size) => {
    if (props.listDefault[1]) {
        for (let i = 0; i < size; i++) {
            list.value.push(props.listDefault[i]);
        }
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

const test = ref(props)

watch(test.value, (e) => {
    createData(3);
})

onMounted(() => {

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
