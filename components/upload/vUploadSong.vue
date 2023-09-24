<template>
    <div>

        <div v-if="data.url">
            <audio ref="audio" class="my-1  h-8 w-full max-w-xs" :src="data.url" controls>
                <source type="audio/mpeg" />
            </audio>
        </div>

        <div class="flex justify-between">
            <input ref="input" class="file-input file-input-sm file-input-bordered file-input-success w-full max-w-xs"
                type="file" @change="previewFiles" accept="audio/mp3,audio/*;capture=microphone" />
        </div>

    </div>
</template>

<script setup>
const props = defineProps({
    data: Object
})
const { t } = useI18n()
const previewSong = ref()
const previewFiles = (e) => {
    console.log(audio.value);
    const file = e.target.files[0];
    const theReader = new FileReader();
    theReader.onloadend = async () => {
        previewSong.value = theReader.result;

    };
    theReader.readAsDataURL(file);
    props.data.file = file;
}

const audio = ref()

const input = ref()

const cancel = () => {
    input.value.value = null
    props.data.file = null
    previewSong.value = null
}
</script>
