<template>
  <div class="grid-layout">
    <svg
      class="grid-layout__root"
      :width="width"
      :height="height"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        v-for="checker of checkers"
        class="grid-layout__checker"
        :key="checker.id"
        :width="SizeInPixels"
        :height="SizeInPixels"
        :x="checker.x"
        :y="checker.y"
      />
      <GridSquare v-for="square of squares" :key="square.id" :square="square" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useCheckers } from '@/composables/useCheckers';
import { SizeInPixels } from '@/utils/Constants';
import { computed } from 'vue';
import type { GridSquareViewModel } from './GridSquare.vue';
import GridSquare from './GridSquare.vue';

const props = defineProps<{
  size: number;
  squares: GridSquareViewModel[];
}>();

const width = computed(() => props.size * SizeInPixels);
const height = computed(() => props.size * SizeInPixels);
const checkers = useCheckers(computed(() => props.size));
</script>

<style scoped>
.grid-layout {
  display: inline-block;
  background: var(--color-grid-layout);
  padding: 10px;
}

.grid-layout__root {
  display: block;
}

.grid-layout__checker {
  fill: var(--color-grid-layout-checker);
}
</style>
