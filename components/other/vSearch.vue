<template>
    <div>
        <div>
            <div class="join">
                <input @input="processChange" v-model="data"
                    class="input bg-base-100/50 input-sm sm:input-md  input-bordered join-item w-52 md:w-96"
                    :placeholder="t('Search...')" />
                <button @click="emit('search', data)" class="btn btn-sm sm:btn-md join-item bg-teal-400"><font-awesome-icon
                        :icon="['fas', 'magnifying-glass']" /></button>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    id: String
})
const { t } = useI18n()
const data = useState(props.id)
const timeDelay = 300
const emit = defineEmits(['search'])

function debounce(func, timeout = timeDelay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}
function saveInput() {
    emit('search', data.value)
}
const processChange = debounce(() => saveInput());

onMounted(() => {
    if (data.value) {
        emit('search', data.value)
    }
})

onUnmounted(() => {
    clearInterval(timer)
})
</script>

<style></style>