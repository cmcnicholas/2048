<template>
  <button class="app-button" @click="onClick">{{ text }}</button>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
}>();

const emit = defineEmits({
  click: () => true,
});

const onClick = () => emit('click');
</script>

<style scoped>
.app-button {
  border: 0 none;
  padding: 20px;
  background: var(--color-button);
  color: var(--color-button-text);
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  outline: none;
}

.app-button:hover {
  background: var(--color-button-hover);
}
</style>
