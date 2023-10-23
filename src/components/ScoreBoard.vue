<template>
  <div class="score">
    <span class="score__title">Score</span>
    <span class="score__value">{{ score }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  score: string;
}>();
</script>

<style scoped>
.score {
  display: inline-flex;
  background: var(--color-scoreboard);
}

.score__title {
  display: block;
  font-size: 32px;
  font-weight: 700;
  color: var(--color-scoreboard-text);
  padding: 20px;
}

.score__value {
  display: block;
  background: var(--color-scoreboard-score);
  font-size: 32px;
  font-weight: 700;
  color: white;
  padding: 20px;
  min-width: 150px;
  text-align: center;
}
</style>
