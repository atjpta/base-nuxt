<template>
    <div class="">
        <div class="card sm:card-side bg-gradient-to-r from-green-400/50 via-cyan-400/50 to-blue-400/50 shadow-xl mx-auto">
            <figure>
                <img class="sm:w-56" :src="props.user.avatar" alt="Album" />
            </figure>
            <div class="card-body">
                <div>
                    <div class="font-bold">
                        {{ props.user.fullName }}
                    </div>
                    <div class="">
                        {{ props.user.email }}
                    </div>
                    <div class="">
                        {{ `${t("Join date")}: ${time}` }}
                    </div>
                    <div class="">
                        {{ `${t("Introduce")}: ...` }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { t } = useI18n();
const props = defineProps({
    user: Object,
});

const time = computed(() => {
    return myMixin.getDate(props.user.createdAt);
});
</script>

<style>
/* 
<template>
    <div class="w-3/5 mx-auto h-44">
        <div class="indicator w-full">
            <!-- avatar -->
            <div class="indicator-item indicator-start left-20 top-1/2">
                <img class="w-40 h-40 rounded-full" :src="props.user.avatar" alt="" />
            </div>
            <!-- info -->
            <div
                class="h-40 w-full pl-44 py-5 rounded-l-full rounded-r-full bg-gradient-to-r from-green-400/50 via-cyan-400/50 to-blue-400/50">
                <div>
                    <div class="font-bold">
                        {{ props.user.fullName }}
                    </div>
                    <div class="">
                        {{ props.user.email }}
                    </div>
                    <div class="">
                        {{ `${t("Join date")}: ${time}` }}
                    </div>
                    <div class="">
                        {{ `${t("Introduce")}: ...` }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template> */
</style>
