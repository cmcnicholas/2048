import { MatrixFactory } from '@/models/MatrixFactory';
import { Square } from '@/models/Square';
import { describe, expect, it } from 'vitest';
import { SquareSpawnerDefaultStrategy } from '../SquareSpawnerDefaultStrategy';

describe(SquareSpawnerDefaultStrategy.name, () => {
  describe(SquareSpawnerDefaultStrategy.prototype.spawn.name, () => {
    it('should spawn square in empty game', () => {
      const matrix = new MatrixFactory().create(2);
      const spawner = new SquareSpawnerDefaultStrategy();

      // verify state before
      expect(matrix.getRaw()).toEqual([[undefined, undefined], [undefined, undefined]]);

      const spawned = spawner.spawn({
        matrix,
        score: 0,
        size: matrix.size,
        squares: matrix.getSquares(),
      });

      // verify state after
      if (!spawned) {
        expect.fail('expected spawned to exist');
      }

      expect(matrix.getSquare(spawned.x, spawned.y)).toStrictEqual(spawned);
    });
    it('should spawn square in existing game with 1 space', () => {
      const matrix = new MatrixFactory().create(2);
      const spawner = new SquareSpawnerDefaultStrategy();

      const topLeft = new Square({ id: '1', x: 0, y: 0, score: 2 });
      const bottomLeft = new Square({ id: '2', x: 0, y: 1, score: 2 });
      const topRight = new Square({ id: '3', x: 1, y: 0, score: 2 });
      matrix.setSquare(topLeft);
      matrix.setSquare(bottomLeft);
      matrix.setSquare(topRight);

      // verify state before
      expect(matrix.getRaw()).toEqual([[topLeft, bottomLeft], [topRight, undefined]]);

      const spawned = spawner.spawn({
        matrix,
        score: 0,
        size: matrix.size,
        squares: matrix.getSquares(),
      });

      // verify state after
      if (!spawned) {
        expect.fail('expected spawned to exist');
      }

      // we know where it will end up
      expect(spawned.x).toEqual(1);
      expect(spawned.y).toEqual(1);
    });
    it('should not spawn square in existing game with no space space', () => {
      const matrix = new MatrixFactory().create(2);
      const spawner = new SquareSpawnerDefaultStrategy();

      matrix.setSquare(new Square({ id: '1', x: 0, y: 0, score: 2 }));
      matrix.setSquare(new Square({ id: '2', x: 0, y: 1, score: 2 }));
      matrix.setSquare(new Square({ id: '3', x: 1, y: 0, score: 2 }));
      matrix.setSquare(new Square({ id: '4', x: 1, y: 1, score: 2 }));

      const spawned = spawner.spawn({
        matrix,
        score: 0,
        size: matrix.size,
        squares: matrix.getSquares(),
      });

      // verify state after
      expect(spawned).toBeUndefined();
    });
  });
});
