import { Game } from './Game';
import type { MatrixFactory } from './MatrixFactory';
import { Square } from './Square';
import type { SquareSlidingStrategy } from './sliding/SquareSlidingStrategy';
import type { SquareSpawnerStrategy } from './spawning/SquareSpawnerStrategy';

export class GameFactory {
  private readonly matrixFactory: MatrixFactory;
  private readonly squareSpawner: SquareSpawnerStrategy;
  private readonly squareSliding: SquareSlidingStrategy;

  public constructor(
    matrixFactory: MatrixFactory,
    spawnerStrategy: SquareSpawnerStrategy,
    sliderStrategy: SquareSlidingStrategy,
  ) {
    this.matrixFactory = matrixFactory;
    this.squareSpawner = spawnerStrategy;
    this.squareSliding = sliderStrategy;
  }

  public create(size: number, obstacles: number): Game {
    const squares: Square[] = [];
    const matrix = this.matrixFactory.create(size);

    const game = new Game(size, matrix, squares, this.squareSpawner, this.squareSliding);

    // create starting square
    this.squareSpawner.spawn(game);

    // spawn obstacles
    for (let i = 0; i < obstacles; i++) {
      this.squareSpawner.spawnObstacle(game);
    }

    return game;
  }
}
