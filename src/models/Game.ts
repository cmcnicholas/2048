import type { GameState } from './GameState';
import type { Matrix } from './Matrix';
import { Square } from './Square';
import type { SquareSlidingStrategy } from './sliding/SquareSlidingStrategy';
import type { SquareSpawnerStrategy } from './spawning/SquareSpawnerStrategy';

export class Game implements GameState {
  public readonly squares: Square[];
  public readonly matrix: Matrix;
  public readonly size: number;
  public score: number = 0;
  private readonly spawner: SquareSpawnerStrategy;
  private readonly slider: SquareSlidingStrategy;

  public constructor(
    size: number,
    matrix: Matrix,
    squares: Square[],
    spawner: SquareSpawnerStrategy,
    slider: SquareSlidingStrategy,
  ) {
    this.size = size;
    this.matrix = matrix;
    this.squares = squares;
    this.spawner = spawner;
    this.slider = slider;
  }

  public up(): void {
    this.slider.slideUp(this);
    this.spawner.spawn(this);
  }

  public left(): void {
    this.slider.slideLeft(this);
    this.spawner.spawn(this);
  }

  public right(): void {
    this.slider.slideRight(this);
    this.spawner.spawn(this);
  }

  public down(): void {
    this.slider.slideDown(this);
    this.spawner.spawn(this);
  }
}
