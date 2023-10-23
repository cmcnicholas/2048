import type { GameState } from '../GameState';
import {
  nearestSpaceToWallAbove,
  nearestSpaceToWallBelow,
  nearestSpaceToWallLeft,
  nearestSpaceToWallRight,
  type FindNearestSpaceToWallFunction,
} from './FindNearestSpaceToWallFunction';
import type { SquareSlidingStrategy } from './SquareSlidingStrategy';

export class SquareSlidingDefaultStrategy implements SquareSlidingStrategy {
  public slideUp(game: GameState): void {
    // iterate top to bottom
    for (let column = 0; column < game.size; column++) {
      for (let row = 0; row < game.size; row++) {
        this.slideVertical(game, column, row, -1, nearestSpaceToWallAbove);
      }
    }
  }

  public slideDown(game: GameState): void {
    // iterate bottom to top
    for (let column = 0; column < game.size; column++) {
      for (let row = game.size - 1; row >= 0; row--) {
        this.slideVertical(game, column, row, 1, nearestSpaceToWallBelow);
      }
    }
  }

  public slideLeft(game: GameState): void {
    // iterate left to right
    for (let row = 0; row < game.size; row++) {
      for (let column = 0; column < game.size; column++) {
        this.slideHorizontal(game, column, row, -1, nearestSpaceToWallLeft);
      }
    }
  }

  public slideRight(game: GameState): void {
    // iterate right to left
    for (let row = 0; row < game.size; row++) {
      for (let column = game.size - 1; column >= 0; column--) {
        this.slideHorizontal(game, column, row, 1, nearestSpaceToWallRight);
      }
    }
  }

  /**
   * executes a vertical slide
   * @param game the game state
   * @param column the column to slide up or down
   * @param row the row to slide from
   * @param direction the direction of the slide, +1 = down, -1 = up
   * @param findNearestSpaceToWall function to find nearest empty space closest to the wall depending on direction
   */
  private slideVertical(
    game: GameState,
    column: number,
    row: number,
    direction: 1 | -1,
    findNearestSpaceToWall: FindNearestSpaceToWallFunction,
  ): void {
    const square = game.matrix.getSquare(column, row);

    // return early if obstacle
    if (square?.obstacle) {
      return;
    }

    // squares can be empty already
    if (square) {
      const moveTo = findNearestSpaceToWall(game.matrix, column, row);
      if (moveTo !== undefined && moveTo !== row) {
        // update square
        square.y = moveTo;

        // Do move
        game.matrix.clearSquare(column, row);
        game.matrix.setSquare(square);
      }

      // check if directly above/below is another square and not obstacle
      const adjacentSquare = game.matrix.getSquare(column, square.y + direction);
      if (adjacentSquare && !adjacentSquare.obstacle) {
        // check if they match score
        if (adjacentSquare.score === square.score) {
          // we have a collision so merge
          adjacentSquare.score += square.score;

          // update global score
          game.score += adjacentSquare.score;

          // remove the inner square
          game.matrix.clearSquare(column, square.y);

          // remove from the squares array
          // TODO better performance here would be to track using a Map and have a reverse lookup but grid is quite
          // small so revist later (or look to compute squares from the matrix)
          game.squares.splice(
            game.squares.findIndex((source) => source.id === square.id),
            1,
          );
        }
      }
    }
  }


  /**
   * executes a horizontal slide
   * @param game the game state
   * @param column the column to slide from
   * @param row the row to slide along
   * @param direction the direction of the slide, +1 = right, -1 = left
   * @param findNearestSpaceToWall function to find nearest empty space closest to the wall depending on direction
   */
  private slideHorizontal(
    game: GameState,
    column: number,
    row: number,
    direction: 1 | -1,
    findNearestSpaceToWall: FindNearestSpaceToWallFunction,
  ): void {
    const square = game.matrix.getSquare(column, row);

    // return early if obstacle
    if (square?.obstacle) {
      return;
    }

    // squares can be empty already
    if (square) {
      const moveTo = findNearestSpaceToWall(game.matrix, row, column);
      if (moveTo !== undefined && moveTo !== column) {
        // update square
        square.x = moveTo;

        // Do move
        game.matrix.clearSquare(column, row);
        game.matrix.setSquare(square);
      }

      // check if directly left/right is another square and not obstacle
      const adjacentSquare = game.matrix.getSquare(square.x + direction, row);
      if (adjacentSquare && !adjacentSquare.obstacle) {
        // check if they match score
        if (adjacentSquare.score === square.score) {
          // we have a collision so merge
          adjacentSquare.score += square.score;

          // update global score
          game.score += adjacentSquare.score;

          // remove the inner square
          game.matrix.clearSquare(square.x, row);

          // remove from the squares array
          // TODO better performance here would be to track using a Map and have a reverse lookup but grid is quite
          // small so revist later (or look to compute squares from the matrix)
          game.squares.splice(
            game.squares.findIndex((source) => source.id === square.id),
            1,
          );
        }
      }
    }
  }
}
