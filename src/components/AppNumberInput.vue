<template>
  <input
    v-model="value"
    type="number"
    class="app-number-input"
    :min="min"
    :max="max"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import { ref, unref, watch } from 'vue';

const props = defineProps<{
  default: number;
  min: number;
  max: number;
}>();

const emit = defineEmits({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  change: (value: number) => true,
});

const value = ref<number>();

const onChange = () => {
  const num = unref(value);
  if (num !== undefined && !isNaN(num)) {
    emit('change', num);
  }
};

watch(
  () => props.default,
  (defaultValue) => {
    value.value = defaultValue;
  },
  {
    immediate: true,
  },
);
</script>

<style scoped>
.app-number-input {
  border: 0 none;
  padding: 20px;
  background: var(--color-number-input);
  color: var(--color-number-input-text);
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  outline: none;
}
</style>
