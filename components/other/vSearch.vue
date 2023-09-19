<template>
    <div>
        <div>
            <div class="join">
                <input v-model="data" class="input input-bordered join-item" :placeholder="t('Search...')" />
                <button @click="emit('search', data)" class="btn join-item bg-teal-400"><font-awesome-icon
                        :icon="['fas', 'magnifying-glass']" /></button>
            </div>
        </div>
    </div>
</template>

<script setup>
const { t } = useI18n()
const data = useState()
const emit = defineEmits(['search'])
onMounted(() => {
    if (data.value) {
        emit('search', data.value)
    }
})
</script>

<style></style>