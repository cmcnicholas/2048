<template>
  <div class="app-number-input">
    <img class="app-number-input__icon" :src="icon" height="32" />
    <input
      v-model="value"
      type="number"
      class="app-number-input__value"
      :min="min"
      :max="max"
      @change="onChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, unref, watch } from 'vue';

const props = defineProps<{
  icon: string;
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
  display: flex;
  align-items: center;
  background: var(--color-number-input);
}

.app-number-input__icon {
  margin-left: 20px;
}

.app-number-input__value {
  border: 0 none;
  padding: 20px;
  background: var(--color-number-input);
  color: var(--color-number-input-text);
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  width: 90px;
}
</style>
