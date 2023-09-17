<template>
    <div>
        <div class="text-sm breadcrumbs">
            <ul>
                <li @click="navigateTo('/admin/manager/overview')"><a>{{ t('home') }}</a></li>
                <li v-for="(i) in listUrl" :key="i"><a class="link-hover link">{{ t(i)
                }}</a></li>
            </ul>
        </div>
        <NuxtPage />
    </div>
</template>

<script setup>

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const listUrl = computed(() => {
    const [a, b, c, ...list] = route.path.split('/');
    return list

})

onMounted(async () => {
    if (route.path == '/admin/manager') {
        navigateTo('/admin/manager/overview')
    }
});

useHead({
    title: t("Admin"),
});
definePageMeta({
    layout: "admin",
    middleware: "admin",
});
</script>

<style></style>




