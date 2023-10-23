import { describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { Game } from '../Game';
import { MatrixFactory } from '../MatrixFactory';
import type { SquareSlidingStrategy } from '../sliding/SquareSlidingStrategy';
import type { SquareSpawnerStrategy } from '../spawning/SquareSpawnerStrategy';

describe(Game.name, () => {
  describe(Game.prototype.up.name, () => {
    it('should call spawner and slider', () => {
      const matrix = new MatrixFactory().create(1);
      const spawner = mock<SquareSpawnerStrategy>();
      const slider = mock<SquareSlidingStrategy>();
      const game = new Game(2, matrix, matrix.getSquares(), spawner, slider);

      // verify state before
      expect(spawner.spawn).not.toBeCalled();
      expect(slider.slideDown).not.toBeCalled();
      expect(slider.slideLeft).not.toBeCalled();
      expect(slider.slideRight).not.toBeCalled();
      expect(slider.slideUp).not.toBeCalled();

      game.up();

      // verify state after
      expect(spawner.spawn).toBeCalledTimes(1);
      expect(slider.slideDown).not.toBeCalled();
      expect(slider.slideLeft).not.toBeCalled();
      expect(slider.slideRight).not.toBeCalled();
      expect(slider.slideUp).toBeCalledTimes(1);
    });
  });
  describe(Game.prototype.left.name, () => {
    it('should call spawner and slider', () => {
      const matrix = new MatrixFactory().create(1);
      const spawner = mock<SquareSpawnerStrategy>();
      const slider = mock<SquareSlidingStrategy>();
      const game = new Game(2, matrix, matrix.getSquares(), spawner, slider);

      // verify state before
      expect(spawner.spawn).not.toBeCalled();
      expect(slider.slideDown).not.toBeCalled();
      expect(slider.slideLeft).not.toBeCalled();
      expect(slider.slideRight).not.toBeCalled();
      expect(slider.slideUp).not.toBeCalled();

      game.left();

      // verify state after
      expect(spawner.spawn).toBeCalledTimes(1);
      expect(slider.slideDown).not.toBeCalled();
      expect(slider.slideLeft).toBeCalledTimes(1);
      expect(slider.slideRight).not.toBeCalled();
      expect(slider.slideUp).not.toBeCalled();
    });
  });
  describe(Game.prototype.right.name, () => {
    it('should call spawner and slider', () => {
      const matrix = new MatrixFactory().create(1);
      const spawner = mock<SquareSpawnerStrategy>();
      const slider = mock<SquareSlidingStrategy>();
      const game = new Game(2, matrix, matrix.getSquares(), spawner, slider);

      // verify state before
      expect(spawner.spawn).not.toBeCalled();
      expect(slider.slideDown).not.toBeCalled();
      expect(slider.slideLeft).not.toBeCalled();
      expect(slider.slideRight).not.toBeCalled();
      expect(slider.slideUp).not.toBeCalled();

      game.right();

      // verify state after
      expect(spawner.spawn).toBeCalledTimes(1);
      expect(slider.slideDown).not.toBeCalled();
      expect(slider.slideLeft).not.toBeCalled();
      expect(slider.slideRight).toBeCalledTimes(1);
      expect(slider.slideUp).not.toBeCalled();
    });
  });
  describe(Game.prototype.down.name, () => {
    it('should call spawner and slider', () => {
      const matrix = new MatrixFactory().create(1);
      const spawner = mock<SquareSpawnerStrategy>();
      const slider = mock<SquareSlidingStrategy>();
      const game = new Game(2, matrix, matrix.getSquares(), spawner, slider);

      // verify state before
      expect(spawner.spawn).not.toBeCalled();
      expect(slider.slideDown).not.toBeCalled();
      expect(slider.slideLeft).not.toBeCalled();
      expect(slider.slideRight).not.toBeCalled();
      expect(slider.slideUp).not.toBeCalled();

      game.down();

      // verify state after
      expect(spawner.spawn).toBeCalledTimes(1);
      expect(slider.slideDown).toBeCalledTimes(1);
      expect(slider.slideLeft).not.toBeCalled();
      expect(slider.slideRight).not.toBeCalled();
      expect(slider.slideUp).not.toBeCalled();
    });
  });
});
