import { Game } from '@/models/Game';
import { GameFactory } from '@/models/GameFactory';
import { MatrixFactory } from '@/models/MatrixFactory';
import { SquareSlidingDefaultStrategy } from '@/models/sliding/SquareSlidingDefaultStrategy';
import { SquareSpawnerDefaultStrategy } from '@/models/spawning/SquareSpawnerDefaultStrategy';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGameStore = defineStore('game', () => {
  const game = ref<Game>();

  const resetGame = (size?: number) => {
    const matrixFactory = new MatrixFactory();
    const factory = new GameFactory(matrixFactory, new SquareSpawnerDefaultStrategy(), new SquareSlidingDefaultStrategy());
    game.value = factory.create(size ?? 5);
  }

  return { game, resetGame };
})
