<template>
  <header class="app-header">
    <h1 class="app-title">2048</h1>
  </header>

  <main class="app-main">
    <ScoreBoard :score="score" />
    <div>
      <AppNumberInput :default="formSize" :min="3" :max="10" @change="onSizeChange" />
      <AppButton text="Reset" @click="onResetClick" />
    </div>
    <AppHelp />
    <GridLayout v-if="size" :size="size" :squares="squares" />
  </main>
</template>

<script setup lang="ts">
import { computed, ref, unref } from 'vue';
import AppButton from './components/AppButton.vue';
import AppHelp from './components/AppHelp.vue';
import AppNumberInput from './components/AppNumberInput.vue';
import GridLayout from './components/GridLayout.vue';
import ScoreBoard from './components/ScoreBoard.vue';
import { useGameKeyStroke } from './composables/useGameKeyStroke';
import { useGameStore } from './stores/game';

const score = computed(() => String(gameStore.game?.score ?? '-'));

// construct view models of the store game state
const squares = computed(
  () =>
    gameStore.game?.squares.map((square) => ({
      id: square.id,
      x: square.x,
      y: square.y,
      score: square.score,
    })) ?? [],
);

const size = computed(() => gameStore.game?.size);

const gameStore = useGameStore();
const formSize = ref(5);

const onResetClick = () => gameStore.resetGame(unref(formSize));
const onSizeChange = (value: number) => {
  formSize.value = value;
};

useGameKeyStroke(['ArrowRight', 'd'], () => gameStore.game?.right());
useGameKeyStroke(['ArrowLeft', 'a'], () => gameStore.game?.left());
useGameKeyStroke(['ArrowDown', 's'], () => gameStore.game?.down());
useGameKeyStroke(['ArrowUp', 'w'], () => gameStore.game?.up());

// start a new game automatically
gameStore.resetGame(unref(formSize));
</script>

<style scoped>
.app-title {
  text-align: center;
  font-size: 64px;
  font-weight: 700;
  margin-bottom: 20px;
}

.app-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
