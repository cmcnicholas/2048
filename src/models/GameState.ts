import type { Matrix } from "./Matrix";
import type { Square } from "./Square";

/**
 * represents game state as an abstraction
 */
export interface GameState {
  readonly squares: Square[];
  readonly matrix: Matrix;
  readonly size: number;
  score: number;
}