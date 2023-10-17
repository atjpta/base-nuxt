<template>
    <div>
        <div class="form-control">
            <div class="input-group">
                <input v-model="data.content" type="text" placeholder="nhập..."
                    class="input input-success input-bordered w-full" />
                <button @click="$emit('send')" :class="loading ? 'loading' : ''"
                    class="btn btn-square btn-outline btn-success">
                    <font-awesome-icon :icon="['fas', 'paper-plane']" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: Object,
    loading: Boolean,
});
</script>

<style></style>
