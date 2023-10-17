<template>
  <div class="flex items-center justify-center">
    <div @click="voteFavorite()" :class="loading ? 'loading' : ''" class="flex btn btn-sm btn-circle btn-ghost">
      <font-awesome-icon :class="isFavorite._id ? ' text-red-500' : ''" class="text-2xl" :icon="['fas', 'heart']" />
    </div>
    <div>{{ slF }}</div>
  </div>
</template>

<script setup>
const useFavorite = favoriteStore();
const isFavorite = ref({});
const loading = ref(false);
const useAuth = authStore();
const useNotification = notificationStore()
const props = defineProps({
  model: String,
  type: String,
  sl: Number,
});

const slF = ref(props.sl);
const { t } = useI18n()
async function getFavorite() {
  isFavorite.value = {};

  if (!useAuth.user) {
    useNotification.show('info', t(`You need login before to use feature!!`))
    return;
  }
  try {
    const favorite = await useFavorite.findOneByUser(props.model);
    if (favorite._id) {
      isFavorite.value = favorite;
    }
  } catch (error) {
  }
}

async function voteFavorite() {
  if (!useAuth.user) {
    useNotification.show('info', t(`You need login before to use feature!!`))
    return;
  }
  loading.value = true;
  try {
    if (isFavorite.value._id) {
      await useFavorite.deleteOne(isFavorite.value.model);
      if (slF.value) {
        slF.value = parseInt(slF.value) - 1;
      }
    } else {
      await useFavorite.create({
        model: props.model,
        user: useAuth.user.id,
        modelType: props.type,
      });
      if (slF.value) {
        slF.value = parseInt(slF.value) + 1;
      } else if (slF.value == 0) {
        slF.value = 1;
      }
    }
    await getFavorite();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

watch(props, () => {
  getFavorite();
});

onMounted(() => {
  if (props.type == "comments") {
    getFavorite();
  }
});
</script>

<style></style>
