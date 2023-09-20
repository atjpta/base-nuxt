<template>
    <div>
        <div>
            <div class="join">
                <input v-model="data" class="input input-sm sm:input-md  input-bordered join-item w-1/2 sm:w-full "
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
const emit = defineEmits(['search'])
onMounted(() => {
    if (data.value) {
        emit('search', data.value)
    }
})
</script>

<style></style>