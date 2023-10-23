import { random } from 'lodash';
import { nanoid } from 'nanoid';
import { Square } from '../Square';
import type { SquareSpawnerStrategy } from './SquareSpawnerStrategy';
import type { GameState } from '../GameState';

export class SquareSpawnerDefaultStrategy implements SquareSpawnerStrategy {
  public spawn(game: GameState): Square | undefined {
    if (game.squares.length >= Math.pow(game.size, 2)) {
      return undefined;
    }

    // find all empty spaces
    const spaces: Array<{ x: number; y: number }> = [];
    for (let column = 0; column < game.size; column++) {
      for (let row = 0; row < game.size; row++) {
        const square = game.matrix.getSquare(column, row);
        if (!square) {
          spaces.push({
            x: column,
            y: row,
          });
        }
      }
    }

    // randomly pick a space
    const space = spaces[random(0, spaces.length - 1, false)];

    // create a new square
    const newSquare = new Square({
      id: nanoid(),
      score: 2,
      x: space.x,
      y: space.y,
    });

    // update internals
    game.squares.push(newSquare);
    game.matrix.setSquare(newSquare);
    return newSquare;
  }
}
