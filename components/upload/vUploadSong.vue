<template>
    <div>
        <audio v-if="data" class="my-1" controls :src="data" ref="audio">
            <source src="" type="audio/mpeg" />
        </audio>
        <input class="file-input file-input-bordered file-input-primary w-full max-w-xs" type="file"
            accept="audio/mp3,audio/*;capture=microphone" @change="useSong.previewFiles($event)" />
    </div>
</template>

<script setup>
import { songStore } from "~~/stores/song.store";
const useSong = songStore();
const props = defineProps({
    data: String,
    time: String,
});

const audio = ref();
</script>
