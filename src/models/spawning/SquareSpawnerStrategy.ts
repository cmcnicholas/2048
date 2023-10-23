import type { GameState } from '../GameState';
import type { Square } from '../Square';

/**
 * spawns random squares into a game
 */
export interface SquareSpawnerStrategy {
  spawn(game: GameState): Square | undefined;
}
