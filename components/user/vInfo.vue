<template>
    <div class="">
        <div class="card sm:card-side bg-gradient-to-r from-green-400/50 via-cyan-400/50 to-blue-400/50 shadow-xl mx-auto">
            <figure>
                <img class="sm:w-56 sm:h-56 hover:scale-110 duration-500" :src="props.user.avatar" alt="Album" />
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
const useUser = userStore();
const time = computed(() => {
    return myMixin.getDate(props.user.createdAt);
});

const update = async (data) => {
    try {
        const user = await useUser.update(data);
    } catch (error) { }
};
</script>

<style></style>
