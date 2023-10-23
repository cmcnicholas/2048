<template>
  <g class="grid-square" :style="style" :data-id="square.id">
    <rect
      ref="backgroundElement"
      :style="rectStyle"
      x="5"
      y="5"
      :width="SizeInPixels - 10"
      :height="SizeInPixels - 10"
    />
    <text
      v-if="!square.obstacle"
      class="grid-square__score"
      :x="SizeInPixels / 2"
      :y="SizeInPixels / 2"
      dominant-baseline="middle"
      text-anchor="middle"
      alignment-baseline="middle"
      >{{ square.score }}</text
    >
  </g>
</template>

<script setup lang="ts">
import { SizeInPixels } from '@/utils/Constants';
import type { CSSProperties } from 'vue';
import { computed, ref, unref, watch } from 'vue';

const backgroundElement = ref<SVGRectElement>();

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

const background = computed(() => {
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
  return colour;
});

const rectStyle = computed<CSSProperties>(() => ({
  fill: `var(${unref(background)})`,
}));

// merge animation by tracking score changes
watch(
  () => props.square.score,
  () => {
    unref(backgroundElement)?.animate(
      [
        {
          fill: `var(${unref(background)})`,
        },
        {
          fill: 'var(--color-grid-square-merge)',
        },
        {
          fill: `var(${unref(background)})`,
        },
      ],
      {
        duration: 400,
        easing: 'ease-out',
        iterations: 1,
      },
    );
  },
);
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
  fill: var(--color-grid-square-text);
}
</style>
