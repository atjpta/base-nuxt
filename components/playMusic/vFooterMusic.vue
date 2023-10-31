<template>
    <div class="w-98">
        <div class="relative bg-black">
            <div class="absolute -right-0 bottom-3">
                <div v-if="!open" @click="open = true" data-tip="hiện phát nhạc"
                    class="mx-5 my-1 tooltip tooltip-left flex btn btn-sm btn-primary hover:text-blue-400">
                    <font-awesome-icon :icon="['fas', 'compact-disc']" />
                </div>
                <div v-if="open" @click="open = false" data-tip="ẩn phát nhạc"
                    class="mx-5 my-1 tooltip tooltip-left flex btn btn-sm btn-primary hover:text-blue-400">
                    <font-awesome-icon :icon="['fas', 'compact-disc']" />
                </div>
            </div>
        </div>

        <div v-show="open" class="md:h-20 h-36 glass bg-gradient-to-l from-green-400/20 via-cyan-400/20 to-blue-400/20">
            <div class="mx-5 md:grid md:grid-cols-4 items-center gap-0 h-20">
                <!--ảnh -->
                <div class="mr-5 pt-1">
                    <!-- cái logo -->
                    <div v-if="!usePlay.song.url_image" class="h-16 flex items-center">
                        <div class="btn btn-ghost bg-transparent hover:bg-transparent font-bold indicator">
                            <div
                                class="w-20 h-9 duration-500 ring-4 ring-green-300/30 -skew-x-12 -skew-y-6 rounded-tl-full rounded-br-full bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400">
                            </div>
                            <div class="indicator-item top-1/2 right-1/2">
                                <div
                                    class="animate-ping w-8 h-8 ring-4 ring-green-300/30 rounded-full bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400">
                                </div>
                            </div>

                            <div class="indicator-item top-1/2 right-1/2">
                                <font-awesome-icon spin :icon="['fas', 'compact-disc']" />

                            </div>
                            <div
                                class="text-white font-extrabold px-3 indicator-item top-1/2 right-1/2 -skew-x-12 -skew-y-6">
                                Hmusic
                            </div>
                        </div>
                    </div>
                    <div v-else class="flex justify-between items-center">
                        <div @click="navigateTo(`/explorer/music/${usePlay.song._id}`)"
                            class="flex space-x-3 cursor-pointer">
                            <!-- thông tin bài hát -->
                            <div>
                                <img :class="usePlay.play ? 'animate-spin-slow' : ''" class="h-14 w-14 rounded-full"
                                    :src="usePlay.song.url_image" />
                            </div>
                            <div class="text-2xl font-extrabold">
                                {{ usePlay.song.name }}
                                <div class="text-xl font-extrabold flex space-x-1">
                                    <div class="btn btn-xs btn-ghost bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30"
                                        v-for="i in usePlay.song.singer" :key="i._id">
                                        {{ i.name }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- <div class="dropdown sm:dropdown-top sm:dropdown-right dropdown-left dropdown-top">
                            <label tabindex="0" class="btn btn-sm btn-circle btn-ghost hover:text-blue-400">
                                <font-awesome-icon class="text-2xl" :icon="['fas', 'ellipsis']" />
                            </label>
                            <ul tabindex="0" class="dropdown-content shadow bg-base-100 rounded-box w-60">
                                <div
                                    class="bg-gradient-to-l from-green-400/10 via-cyan-400/10 to-blue-400/10 rounded-box p-2">
                                    <li
                                        class="hover-bordered no-animation btn btn-ghost btn-block justify-start justify-items-center">
                                        <a>
                                            <PlaylistVAdd :id="usePlay.song.id || usePlay.song._id" />
                                        </a>
                                    </li>
                                    <li @click="showDialog()" class="hover-bordered btn btn-ghost btn-block justify-start">
                                        <OtherVIcon class-icon="text-2xl w-10 mr-1 " icon="fa-solid fa-comments" />
                                        Bình luận
                                    </li>
                                </div>
                            </ul>
                        </div> -->
                    </div>
                </div>

                <div class="md:col-span-2 w-full">
                    <!-- các nút btn -->
                    <div class="flex items-center justify-center space-x-5">
                        <div onclick="my_modal_playlist.showModal()"
                            class="text-2xl text-teal-500 btn xl:btn-md btn-sm btn-ghost btn-circle ">
                            <font-awesome-icon :icon="['fas', 'plus']" />
                        </div>

                        <div @click="usePlay.random = !usePlay.random" data-tip="phát ngẫu nhiên"
                            :class="[usePlay.random ? 'text-teal-500' : '']"
                            class="tooltip flex btn btn-sm btn-circle btn-ghost">
                            <font-awesome-icon class="text-2xl" :icon="['fas', 'shuffle']" />

                        </div>
                        <div @click="usePlay.pre()" class="btn btn-sm btn-circle text-teal-500 btn-ghost">
                            <font-awesome-icon class=" text-2xl" :icon="['fas', 'backward-step']" />
                        </div>
                        <!-- nút chơi nè -->
                        <button autofocus="true" @keydown.space.prevent="usePlay.playAudio()" @click="usePlay.playAudio()"
                            class="btn btn-circle text-teal-500 btn-ghost hover:bg-transparent hover:text-blue-400">
                            <font-awesome-icon class="text-4xl ring-4 ring-blue-400/50 hover:ring-green-400/50 rounded-full"
                                :icon="usePlay.play ? 'fa-solid fa-circle-pause' : 'fa-solid fa-circle-play'" />
                        </button>
                        <div @click="usePlay.next()" class="btn btn-sm btn-circle text-teal-500 btn-ghost">
                            <font-awesome-icon class="text-2xl" :icon="['fas', 'forward-step']" />
                        </div>
                        <div @click="usePlay.loop = !usePlay.loop" :class="[usePlay.loop ? 'text-teal-500' : '']"
                            data-tip="phát lại bài này" class="tooltip flex btn btn-sm btn-circle btn-ghost">
                            <font-awesome-icon class="text-2xl" :icon="['fas', 'rotate']" />
                        </div>
                        <div class="indicator" @mouseenter="openVolume = true" @mouseleave="openVolume = false">
                            <div @click="usePlay.mute()" class="flex text-teal-500 btn btn-sm btn-circle btn-ghost">
                                <font-awesome-icon class="text-2xl" :icon="usePlay.iconVolume" />
                            </div>
                            <div v-show="openVolume"
                                class="flex items-center indicator-item z-10 -top-20 right-1/2 -rotate-90 bg-base-100 p-2 rounded-full">
                                <input type="range" min="0" max="1" step="0.1" v-model="usePlay.audio.volume"
                                    class="range range-xs range-success w-40" />
                            </div>
                        </div>
                    </div>

                    <!-- thanh timer -->
                    <div class="flex justify-between items-center space-x-3">
                        <div>
                            <!-- <span id="current-time">0:00</span> -->
                            {{ usePlay.currentTime || "0:00" }}
                        </div>
                        <input type="range" min="0" :max="maxTime" v-model="usePlay.audio.currentTime"
                            class="range range-success range-lg h-2 ring-2 rounded-tl-full rounded-br-full rounded-none skew-x-[-45deg] bg-transparent w-full bg-gradient-to-l from-green-400/50 via-cyan-400 to-blue-400" />
                        <div>
                            {{ usePlay.duration || "0:00" }}
                        </div>
                    </div>
                </div>

                <audio crossorigin="anonymous" @ended="usePlay.nextEnd()" :loop="usePlay.loop"
                    @timeupdate="usePlay.timeUpdate()" @loadedmetadata="usePlay.loadedMetaData()"
                    @volumechange="usePlay.volumeChange()" v-show="false" :autoplay="true" :src="usePlay.song.url"
                    ref="audio" controls>
                    <source src="" type="audio/mpeg" />
                </audio>

                <!-- <audio crossorigin="anonymous" v-show="false" :loop="usePlay.loop" :autoplay="true" :src="usePlay.song.url"
                    ref="audio2" controls>
                    <source src="" type="audio/mpeg" />
                </audio> -->

            </div>
        </div>
    </div>
</template>

<script setup>
const usePlay = playStore();
const audio = ref();
// const audio2 = ref();
const open = useState('openPlayMusic', () => true)
const openVolume = ref(false);
const heart = ref();
const router = useRouter();
const isHeart = useState(`isHeart`)
const useFavorite = favoriteStore()
const useAuth = authStore()
const song = computed(() => {
    return usePlay.song._id
})
// const sourceWave = useState('loadSource')

const maxTime = computed(() => {
    return usePlay.audio.duration || usePlay.durationMusic
})


onMounted(() => {

    usePlay.audio = audio.value;
    // usePlay.audio2 = audio2.value;
    usePlay.loadStore();
    usePlay.router = router;
    // setDefault()


});


window.addEventListener("beforeunload", () => {
    usePlay.saveStore();
});

// const setDefault = () => {
//     usePlay.getSource = getSource
// }


// const getSource = () => {
//     class Source {
//         constructor(fftSize) {
//             this.initialized = false;
//             window.AudioContext = window.AudioContext || window.webkitURL.AudioContext;
//             this.audioContext = new window.AudioContext();
//             this.analyser = this.audioContext.createAnalyser();
//             try {
//                 this.source = this.audioContext.createMediaElementSource(audio2.value);
//             } catch (error) {
//                 console.log(error);
//             }

//             // console.log(this.analyser);
//             this.analyser.fftSize = fftSize;
//             const bufferLength = this.analyser.frequencyBinCount;
//             this.dataArray = new Uint8Array(bufferLength);
//             this.source.connect(this.analyser);
//             this.initialized = true;
//         }
//         getSamples() {
//             this.analyser.getByteFrequencyData(this.dataArray);
//             let normSamples = [...this.dataArray].map((e) => e / 128 - 1);
//             return normSamples;
//         }
//         getVolume() {
//             this.analyser.getByteFrequencyData(this.dataArray);
//             let normSamples = [...this.dataArray].map((e) => e / 128 - 1);
//             let sum = 0;
//             for (let i = 0; i < normSamples.length; i++) {
//                 sum += normSamples[i] * normSamples[i];
//             }
//             let volume = Math.sqrt(sum / normSamples.length);
//             return volume;
//         }
//     }
//     sourceWave.value = new Source(1024)
// }
</script>
