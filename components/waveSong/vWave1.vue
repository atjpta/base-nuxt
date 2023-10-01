<template>
    <div>
        <div class="overflow-hidden ">
            <div>
                <div class="flex justify-center items-center relative">
                    <!-- <span class="indicator-item indicator-center indicator-middle"> -->
                    <div :class="loading ? 'toast toast-middle toast-center lg:w-96 lg:h-96 w-60 h-60' : 'absolute'">
                        <img ref="image"
                            :class="loading ? 'rounded-full lg:w-96 lg:h-96 w-60 h-60' : 'rounded-full lg:w-32 lg:h-32 w-20 h-20'"
                            :src="data?.url_image" alt="" />
                    </div>
                    <!-- </span> -->
                    <div class="">
                        <canvas class="" ref="canvas" />
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    data: Object
})
const canvas = ref();
const image = ref();

const loading = ref(true)

const animateId = ref()


const sourceWave = useState('loadSource')

function load() {
    if (sourceWave.value) {
        loading.value = false
        const ctx = canvas.value.getContext("2d");
        canvas.value.width = window.innerWidth;
        canvas.value.height = window.innerHeight - 100;



        class Bar {
            constructor(x, y, width, height, color, index) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                this.color = color;
                this.index = index;
            }
            update(micInput) {
                const sound = micInput * 500 || 500;
                if (sound > this.height) {
                    this.height = sound;
                } else {
                    this.height -= this.height * 0.03;
                }
            }
            draw(context, volume) {
                context.fillStyle = this.color;
                context.fillRect(this.x, this.y, this.width, this.height);

            }
        }

        let fftSize = 1024;
        const source = sourceWave.value;
        let bars = [];
        let barWidth = canvas.value?.width / fftSize;
        function createBars() {
            for (let i = 5; i < fftSize / 4; i++) {
                let color = `hsl(${i}, 100%, 50%)`;
                bars.push(new Bar(i, 0, 5, 512, color, i));
            }
        }
        let indexRotate = 0;
        createBars();
        const animate = () => {
            ctx.clearRect(0, 0, canvas.value?.width, canvas.value?.height);
            const samples = source.getSamples();
            const volume = source.getVolume();
            drawVisualiner(fftSize / 2, 0, barWidth, 10, source.dataArray);
            ctx.save();
            ctx.rotate(indexRotate++);
            ctx.restore();
            const vScale = (10 * volume) / 3;
            if (image.value) {

                image.value.style.transform = `scale(${vScale})`;
            }

            animateId.value = requestAnimationFrame(animate);
        }
        animate()

        function drawVisualiner(bufferLength, x, barWidth, barheight, dataArray) {
            for (let i = 0; i < bufferLength; i++) {
                const barheight = dataArray[i] * 2;
                ctx.save();
                ctx.translate(canvas.value?.width / 2, canvas.value?.height / 2);

                ctx.rotate(i);
                const heu = 120 + i * 0.5;
                ctx.fillStyle = `hsl(${heu}, 100%, 50%)`;
                ctx.beginPath();
                ctx.arc(50, barheight / 2, barheight / 2, 0, Math.PI / 4);
                ctx.fill();
                ctx.stroke();
                x += barWidth;
                ctx.restore();
            }
        }
    }



}

watch(sourceWave, () => {
    load()
})


onMounted(() => {
    load()
})

</script>

<style>
.wrapper-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#imageSpin {
    animation: rotate 5s linear infinite;
}

#canvas {
    position: absolute;
    z-index: 9;
    width: 500px;
    height: 500px;
    animation: rotate;
}

.containerCanvas {
    position: relative;
    width: 500px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
