<template>
  <div>
    <!-- xem trước ảnh -->
    <transition name="bounce">
      <div v-if="previewImage || data.url">
        <img class="bg-transparent rounded-2xl my-2 w-32 h-32" :src="previewImage || data.url"
          :alt="t(`let's select file for device`)" />
      </div>
    </transition>
    <!-- input ảnh -->
    <div class="flex justify-between">
      <input ref="input" @change="previewFiles($event)" accept="image/*" type="file"
        class="file-input file-input-sm file-input-bordered file-input-success w-full max-w-xs" />
      <div v-if="previewImage" @click="cancel()" class="ml-1 btn btn-outline btn-error btn-sm">
        <font-awesome-icon :icon="['fas', 'trash-can']" />
        xóa
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object
})
const { t } = useI18n()
const previewImage = ref()

const previewFiles = (e) => {
  const file = e.target.files[0];
  const theReader = new FileReader();
  theReader.onloadend = async () => {
    previewImage.value = theReader.result;
  };
  theReader.readAsDataURL(file);
  props.data.file = file;
}

const input = ref()

const cancel = () => {
  input.value.value = null
  props.data.file = null
  previewImage.value = null
}

</script>

<style></style>
