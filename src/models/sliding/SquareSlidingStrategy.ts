import type { Game } from '../Game';

/**
 * strategy for sliding squares along an axis
 */
export interface SquareSlidingStrategy {
  slideUp(game: Game): void;
  slideDown(game: Game): void;
  slideLeft(game: Game): void;
  slideRight(game: Game): void;
}
