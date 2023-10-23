<template>
  <g class="grid-square" :style="style" :data-id="square.id">
    <rect :style="rectStyle" x="5" y="5" :width="SizeInPixels - 10" :height="SizeInPixels - 10" />
    <text
      v-if="!square.obstacle"
      class="grid-square__score"
      :x="SizeInPixels / 2"
      :y="SizeInPixels / 2"
      dominant-baseline="middle"
      text-anchor="middle"
      alignment-baseline="middle"
      fill="white"
      >{{ square.score }}</text
    >
  </g>
</template>

<script setup lang="ts">
import { SizeInPixels } from '@/utils/Constants';
import type { CSSProperties } from 'vue';
import { computed, unref } from 'vue';

export type GridSquareViewModel = {
  id: string;
  x: number;
  y: number;
  score: number;
  obstacle: boolean;
};

const props = defineProps<{
  square: GridSquareViewModel;
}>();

const x = computed(() => props.square.x * 100);
const y = computed(() => props.square.y * 100);
const style = computed<CSSProperties>(() => ({
  transform: `translate(${unref(x)}px, ${unref(y)}px)`,
}));

const rectStyle = computed<CSSProperties>(() => {
  let colour: string;
  if (props.square.obstacle) {
    colour = '--color-grid-square-obstacle';
  } else {
    colour =
      props.square.score > 64
        ? '--color-grid-square-large'
        : props.square.score > 8
        ? '--color-grid-square-medium'
        : '--color-grid-square-small';
  }

  return {
    fill: `var(${colour})`,
  };
});
</script>

<style scoped>
@keyframes grid-square-enter {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.grid-square {
  animation-name: grid-square-enter;
  animation-duration: 400ms;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
  transition: transform 200ms ease-in-out;
}

.grid-square__score {
  font-size: 48px;
  line-height: 48px;
  font-weight: 700;
}
</style>
