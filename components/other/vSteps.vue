<template>
    <div>
        <div>
            <div class="mx-auto w-fit">
                <ul class="steps">
                    <li v-for="i in props.steps" :key="i.index" :class="i.index <= props.stepIndex ? 'step-success' : ''"
                        class="step">
                        {{ i.name }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    steps: ISteps[];
    stepIndex: number;
}>();

interface ISteps {
    name: string;
    index: number;
}
</script>

<style></style>
