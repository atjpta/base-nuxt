<template>
    <div>
        <ul class="" :class="props.index == 0 ? 'menu rounded-lg max-w-xs w-full' : 'my-2'">
            <li class="" v-for="(i, index) in props.menu" :key="index">
                <details v-if="i.list.length > 0" :open="countRoute > i.level && isInRoute(i.level, t(i.title))">
                    <summary class=""
                        :class="route.path.includes(i.url) ? 'bg-gradient-to-r from-green-400/50 via-cyan-400/50 to-blue-400/50' : ''">
                        <font-awesome-icon :icon="['fas', i.icon]" />
                        {{ t(i.title) }}
                    </summary>
                    <OtherVMenu :turnOffDrawer="props.turnOffDrawer" :menu="i.list" />
                </details>
                <NuxtLink v-else @click="props.turnOffDrawer()" :to="i.url">
                    <font-awesome-icon :icon="['fas', i.icon]" />
                    {{ t(i.title) }}
                </NuxtLink>
            </li>

        </ul>

    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    menu: IMenu[];
    index?: number;
    turnOffDrawer: Function

}>();
const { t } = useI18n()
const route = useRoute()
const countRoute = computed(() => {
    return myMixin.countTimesDuplicateInString(route.path, '/')
})

const isInRoute = (level: number, title: string) => {
    return myMixin.getValueMid(route.path, level) == title
}

const test = (e: any) => {
    e.stopPropagation()
}

interface IMenu {
    name: string;
    title: string;
    icon: string;
    url: string;
    level: number;
    list: IMenu[];
}
</script>

<style></style>