<template>
  <div>
    <!-- list đã chọn -->
    <div class="space-x-1 my-1 flex">
      <div class="rounded-2xl px-3 py-1 bg-gradient-to-r from-green-400/20 via-cyan-400/20 to-blue-400/20"
        v-for="i in data" :key="i._id">
        {{ i.name }}
        <div @click="remove(i)" class="btn btn-circle btn-xs ml-1 btn-ghost">
          <font-awesome-icon :icon="['fas', 'xmark']" />
        </div>
      </div>
    </div>
    <select v-model="select" @change="add()" class="select-sm select select-success w-full max-w-xs">
      <option disabled :value="{}">chọn</option>
      <option :value="i" v-for="i in list" :key="i">
        {{ i.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Set,
  list: Array,
});

const select = ref({});

function isHave() {
  let mark = false;
  props.data.forEach((e) => {
    if ((e._id) == select.value._id) {
      mark = true;
      return;
    }
  });
  return mark;
}

function add() {
  if (select.value.name) {
    if (!isHave()) {
      props.data.add(select.value);
    }
  }
}

function remove(i) {
  props.data.delete(i);
}
</script>

<style></style>
