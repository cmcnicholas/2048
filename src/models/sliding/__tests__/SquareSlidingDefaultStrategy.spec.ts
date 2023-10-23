import { MatrixFactory } from '@/models/MatrixFactory';
import { Square } from '@/models/Square';
import { describe, expect, it } from 'vitest';
import { SquareSlidingDefaultStrategy } from '../SquareSlidingDefaultStrategy';

describe(SquareSlidingDefaultStrategy.name, () => {
  describe(SquareSlidingDefaultStrategy.prototype.slideDown.name, () => {
    it('should slide down when empty', () => {
      const matrix = new MatrixFactory().create(2);
      const slider = new SquareSlidingDefaultStrategy();

      // verify state before
      expect(matrix.getRaw()).toEqual([
        [undefined, undefined],
        [undefined, undefined],
      ]);

      slider.slideDown({
        matrix,
        score: 0,
        size: matrix.size,
        squares: matrix.getSquares(),
      });

      // verify state after
      expect(matrix.getRaw()).toEqual([
        [undefined, undefined],
        [undefined, undefined],
      ]);
    });
    it('should slide single square down', () => {
      const matrix = new MatrixFactory().create(2);
      const spawner = new SquareSlidingDefaultStrategy();

      const topLeft = new Square({ id: '1', x: 0, y: 0, score: 2 });
      matrix.setSquare(topLeft);

      // verify state before
      expect(matrix.getRaw()).toEqual([
        [topLeft, undefined],
        [undefined, undefined],
      ]);

      spawner.slideDown({
        matrix,
        score: 0,
        size: matrix.size,
        squares: matrix.getSquares(),
      });

      // verify state after
      expect(matrix.getRaw()).toEqual([
        [undefined, topLeft],
        [undefined, undefined],
      ]);
      expect(topLeft.score).toEqual(2); // score should have stayed the same
    });
    it('should not slide down when two squares in same column but different scores', () => {
      const matrix = new MatrixFactory().create(2);
      const spawner = new SquareSlidingDefaultStrategy();

      const topLeft = new Square({ id: '1', x: 0, y: 0, score: 2 });
      const bottomLeft = new Square({ id: '2', x: 0, y: 1, score: 4 });
      matrix.setSquare(topLeft);
      matrix.setSquare(bottomLeft);

      // verify state before
      expect(matrix.getRaw()).toEqual([
        [topLeft, bottomLeft],
        [undefined, undefined],
      ]);

      spawner.slideDown({
        matrix,
        score: 0,
        size: matrix.size,
        squares: matrix.getSquares(),
      });

      // verify state after
      expect(matrix.getRaw()).toEqual([
        [topLeft, bottomLeft],
        [undefined, undefined],
      ]);
      expect(topLeft.score).toEqual(2); // score should have stayed the same
      expect(bottomLeft.score).toEqual(4); // score should have stayed the same
    });
    it('should slide down when two squares in same column and same scores', () => {
      const matrix = new MatrixFactory().create(2);
      const spawner = new SquareSlidingDefaultStrategy();

      const topLeft = new Square({ id: '1', x: 0, y: 0, score: 2 });
      const bottomLeft = new Square({ id: '2', x: 0, y: 1, score: 2 });
      matrix.setSquare(topLeft);
      matrix.setSquare(bottomLeft);

      // verify state before
      expect(matrix.getRaw()).toEqual([
        [topLeft, bottomLeft],
        [undefined, undefined],
      ]);

      spawner.slideDown({
        matrix,
        score: 0,
        size: matrix.size,
        squares: matrix.getSquares(),
      });

      // verify state after
      expect(matrix.getRaw()).toEqual([
        [undefined, bottomLeft],
        [undefined, undefined],
      ]);
      expect(bottomLeft.score).toEqual(4); // score should have increased
    });
    it('should slide down when three squares in same column and same scores prioritising closest to wall', () => {
      const matrix = new MatrixFactory().create(3);
      const spawner = new SquareSlidingDefaultStrategy();

      const topLeft = new Square({ id: '1', x: 0, y: 0, score: 2 });
      const middleLeft = new Square({ id: '2', x: 0, y: 1, score: 2 });
      const bottomLeft = new Square({ id: '3', x: 0, y: 2, score: 2 });
      matrix.setSquare(topLeft);
      matrix.setSquare(middleLeft);
      matrix.setSquare(bottomLeft);

      // verify state before
      expect(matrix.getRaw()).toEqual([
        [topLeft, middleLeft, bottomLeft],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
      ]);

      spawner.slideDown({
        matrix,
        score: 0,
        size: matrix.size,
        squares: matrix.getSquares(),
      });

      // verify state after
      expect(matrix.getRaw()).toEqual([
        [undefined, topLeft, bottomLeft],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
      ]);
      expect(topLeft.score).toEqual(2); // score should have stayed the same
      expect(bottomLeft.score).toEqual(4); // score should have increased
    });
  });

  describe(SquareSlidingDefaultStrategy.prototype.slideUp.name, () => {
    it('should slide up when empty', () => {
      const matrix = new MatrixFactory().create(2);
      const slider = new SquareSlidingDefaultStrategy();

      // verify state before
      expect(matrix.getRaw()).toEqual([
        [undefined, undefined],
        [undefined, undefined],
      ]);

      slider.slideUp({
        matrix,
        score: 0,
        size: matrix.size,
        squares: matrix.getSquares(),
      });

      // verify state after
      expect(matrix.getRaw()).toEqual([
        [undefined, undefined],
        [undefined, undefined],
      ]);
    });
    it('should slide single square up', () => {
      const matrix = new MatrixFactory().create(2);
      const spawner = new SquareSlidingDefaultStrategy();

      const bottomLeft = new Square({ id: '1', x: 0, y: 1, score: 2 });
      matrix.setSquare(bottomLeft);

      // verify state before
      expect(matrix.getRaw()).toEqual([
        [undefined, bottomLeft],
        [undefined, undefined],
      ]);

      spawner.slideUp({
        matrix,
        score: 0,
        size: matrix.size,
        squares: matrix.getSquares(),
      });

      // verify state after
      expect(matrix.getRaw()).toEqual([
        [bottomLeft, undefined],
        [undefined, undefined],
      ]);
      expect(bottomLeft.score).toEqual(2); // score should have stayed the same
    });
    it('should not slide up when two squares in same column but different scores', () => {
      const matrix = new MatrixFactory().create(2);
      const spawner = new SquareSlidingDefaultStrategy();

      const topLeft = new Square({ id: '1', x: 0, y: 0, score: 2 });
      const bottomLeft = new Square({ id: '2', x: 0, y: 1, score: 4 });
      matrix.setSquare(topLeft);
      matrix.setSquare(bottomLeft);

      // verify state before
      expect(matrix.getRaw()).toEqual([
        [topLeft, bottomLeft],
        [undefined, undefined],
      ]);

      spawner.slideUp({
        matrix,
        score: 0,
        size: matrix.size,
        squares: matrix.getSquares(),
      });

      // verify state after
      expect(matrix.getRaw()).toEqual([
        [topLeft, bottomLeft],
        [undefined, undefined],
      ]);
      expect(topLeft.score).toEqual(2); // score should have stayed the same
      expect(bottomLeft.score).toEqual(4); // score should have stayed the same
    });
    it('should slide up when two squares in same column and same scores', () => {
      const matrix = new MatrixFactory().create(2);
      const spawner = new SquareSlidingDefaultStrategy();

      const topLeft = new Square({ id: '1', x: 0, y: 0, score: 2 });
      const bottomLeft = new Square({ id: '2', x: 0, y: 1, score: 2 });
      matrix.setSquare(topLeft);
      matrix.setSquare(bottomLeft);

      // verify state before
      expect(matrix.getRaw()).toEqual([
        [topLeft, bottomLeft],
        [undefined, undefined],
      ]);

      spawner.slideUp({
        matrix,
        score: 0,
        size: matrix.size,
        squares: matrix.getSquares(),
      });

      // verify state after
      expect(matrix.getRaw()).toEqual([
        [topLeft, undefined],
        [undefined, undefined],
      ]);
      expect(topLeft.score).toEqual(4); // score should have increased
    });
    it('should slide up when three squares in same column and same scores prioritising closest to wall', () => {
      const matrix = new MatrixFactory().create(3);
      const spawner = new SquareSlidingDefaultStrategy();

      const topLeft = new Square({ id: '1', x: 0, y: 0, score: 2 });
      const middleLeft = new Square({ id: '2', x: 0, y: 1, score: 2 });
      const bottomLeft = new Square({ id: '3', x: 0, y: 2, score: 2 });
      matrix.setSquare(topLeft);
      matrix.setSquare(middleLeft);
      matrix.setSquare(bottomLeft);

      // verify state before
      expect(matrix.getRaw()).toEqual([
        [topLeft, middleLeft, bottomLeft],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
      ]);

      spawner.slideUp({
        matrix,
        score: 0,
        size: matrix.size,
        squares: matrix.getSquares(),
      });

      // verify state after
      expect(matrix.getRaw()).toEqual([
        [topLeft, bottomLeft, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
      ]);
      expect(topLeft.score).toEqual(4); // score should have increased
      expect(bottomLeft.score).toEqual(2); // score should have stayed the same
    });
  });

  describe(SquareSlidingDefaultStrategy.prototype.slideLeft.name, () => {
    it('should slide left when empty', () => {
      const matrix = new MatrixFactory().create(2);
      const slider = new SquareSlidingDefaultStrategy();

      // verify state before
      expect(matrix.getRaw()).toEqual([
        [undefined, undefined],
        [undefined, undefined],
      ]);

      slider.slideLeft({
        matrix,
        score: 0,
        size: matrix.size,
        squares: matrix.getSquares(),
      });

      // verify state after
      expect(matrix.getRaw()).toEqual([
        [undefined, undefined],
        [undefined, undefined],
      ]);
    });
    it('should slide single square left', () => {
      const matrix = new MatrixFactory().create(2);
      const spawner = new SquareSlidingDefaultStrategy();

      const topRight = new Square({ id: '1', x: 1, y: 0, score: 2 });
      matrix.setSquare(topRight);

      // verify state before
      expect(matrix.getRaw()).toEqual([
        [undefined, undefined],
        [topRight, undefined],
      ]);

      spawner.slideLeft({
        matrix,
        score: 0,
        size: matrix.size,
        squares: matrix.getSquares(),
      });

      // verify state after
      expect(matrix.getRaw()).toEqual([
        [topRight, undefined],
        [undefined, undefined],
      ]);
      expect(topRight.score).toEqual(2); // score should have stayed the same
    });
    it('should not slide left when two squares in same row but different scores', () => {
      const matrix = new MatrixFactory().create(2);
      const spawner = new SquareSlidingDefaultStrategy();

      const topLeft = new Square({ id: '1', x: 0, y: 0, score: 2 });
      const topRight = new Square({ id: '2', x: 1, y: 0, score: 4 });
      matrix.setSquare(topLeft);
      matrix.setSquare(topRight);

      // verify state before
      expect(matrix.getRaw()).toEqual([
        [topLeft, undefined],
        [topRight, undefined],
      ]);

      spawner.slideLeft({
        matrix,
        score: 0,
        size: matrix.size,
        squares: matrix.getSquares(),
      });

      // verify state after
      expect(matrix.getRaw()).toEqual([
        [topLeft, undefined],
        [topRight, undefined],
      ]);
      expect(topLeft.score).toEqual(2); // score should have stayed the same
      expect(topRight.score).toEqual(4); // score should have stayed the same
    });
    it('should slide left when two squares in same row and same scores', () => {
      const matrix = new MatrixFactory().create(2);
      const spawner = new SquareSlidingDefaultStrategy();

      const topLeft = new Square({ id: '1', x: 0, y: 0, score: 2 });
      const topRight = new Square({ id: '2', x: 1, y: 0, score: 2 });
      matrix.setSquare(topLeft);
      matrix.setSquare(topRight);

      // verify state before
      expect(matrix.getRaw()).toEqual([
        [topLeft, undefined],
        [topRight, undefined],
      ]);

      spawner.slideLeft({
        matrix,
        score: 0,
        size: matrix.size,
        squares: matrix.getSquares(),
      });

      // verify state after
      expect(matrix.getRaw()).toEqual([
        [topLeft, undefined],
        [undefined, undefined],
      ]);
      expect(topLeft.score).toEqual(4); // score should have increased
    });
    it('should slide left when three squares in same row and same scores prioritising closest to wall', () => {
      const matrix = new MatrixFactory().create(3);
      const spawner = new SquareSlidingDefaultStrategy();

      const topLeft = new Square({ id: '1', x: 0, y: 0, score: 2 });
      const topMiddle = new Square({ id: '2', x: 1, y: 0, score: 2 });
      const topRight = new Square({ id: '3', x: 2, y: 0, score: 2 });
      matrix.setSquare(topLeft);
      matrix.setSquare(topMiddle);
      matrix.setSquare(topRight);

      // verify state before
      expect(matrix.getRaw()).toEqual([
        [topLeft, undefined, undefined],
        [topMiddle, undefined, undefined],
        [topRight, undefined, undefined],
      ]);

      spawner.slideLeft({
        matrix,
        score: 0,
        size: matrix.size,
        squares: matrix.getSquares(),
      });

      // verify state after
      expect(matrix.getRaw()).toEqual([
        [topLeft, undefined, undefined],
        [topRight, undefined, undefined],
        [undefined, undefined, undefined],
      ]);
      expect(topLeft.score).toEqual(4); // score should have increased
      expect(topRight.score).toEqual(2); // score should have stayed the same
    });
  });

  describe(SquareSlidingDefaultStrategy.prototype.slideRight.name, () => {
    it('should slide up when empty', () => {
      const matrix = new MatrixFactory().create(2);
      const slider = new SquareSlidingDefaultStrategy();

      // verify state before
      expect(matrix.getRaw()).toEqual([
        [undefined, undefined],
        [undefined, undefined],
      ]);

      slider.slideRight({
        matrix,
        score: 0,
        size: matrix.size,
        squares: matrix.getSquares(),
      });

      // verify state after
      expect(matrix.getRaw()).toEqual([
        [undefined, undefined],
        [undefined, undefined],
      ]);
    });
    it('should slide single square right', () => {
      const matrix = new MatrixFactory().create(2);
      const spawner = new SquareSlidingDefaultStrategy();

      const topLeft = new Square({ id: '1', x: 0, y: 0, score: 2 });
      matrix.setSquare(topLeft);

      // verify state before
      expect(matrix.getRaw()).toEqual([
        [topLeft, undefined],
        [undefined, undefined],
      ]);

      spawner.slideRight({
        matrix,
        score: 0,
        size: matrix.size,
        squares: matrix.getSquares(),
      });

      // verify state after
      expect(matrix.getRaw()).toEqual([
        [undefined, undefined],
        [topLeft, undefined],
      ]);
      expect(topLeft.score).toEqual(2); // score should have stayed the same
    });
    it('should not slide right when two squares in same row but different scores', () => {
      const matrix = new MatrixFactory().create(2);
      const spawner = new SquareSlidingDefaultStrategy();

      const topLeft = new Square({ id: '1', x: 0, y: 0, score: 2 });
      const topRight = new Square({ id: '2', x: 1, y: 0, score: 4 });
      matrix.setSquare(topLeft);
      matrix.setSquare(topRight);

      // verify state before
      expect(matrix.getRaw()).toEqual([
        [topLeft, undefined],
        [topRight, undefined],
      ]);

      spawner.slideRight({
        matrix,
        score: 0,
        size: matrix.size,
        squares: matrix.getSquares(),
      });

      // verify state after
      expect(matrix.getRaw()).toEqual([
        [topLeft, undefined],
        [topRight, undefined],
      ]);
      expect(topLeft.score).toEqual(2); // score should have stayed the same
      expect(topRight.score).toEqual(4); // score should have stayed the same
    });
    it('should slide right when two squares in same row and same scores', () => {
      const matrix = new MatrixFactory().create(2);
      const spawner = new SquareSlidingDefaultStrategy();

      const topLeft = new Square({ id: '1', x: 0, y: 0, score: 2 });
      const topRight = new Square({ id: '2', x: 1, y: 0, score: 2 });
      matrix.setSquare(topLeft);
      matrix.setSquare(topRight);

      // verify state before
      expect(matrix.getRaw()).toEqual([
        [topLeft, undefined],
        [topRight, undefined],
      ]);

      spawner.slideRight({
        matrix,
        score: 0,
        size: matrix.size,
        squares: matrix.getSquares(),
      });

      // verify state after
      expect(matrix.getRaw()).toEqual([
        [undefined, undefined],
        [topRight, undefined],
      ]);
      expect(topRight.score).toEqual(4); // score should have increased
    });
    it('should slide right when three squares in same row and same scores prioritising closest to wall', () => {
      const matrix = new MatrixFactory().create(3);
      const spawner = new SquareSlidingDefaultStrategy();

      const topLeft = new Square({ id: '1', x: 0, y: 0, score: 2 });
      const topMiddle = new Square({ id: '2', x: 1, y: 0, score: 2 });
      const topRight = new Square({ id: '3', x: 2, y: 0, score: 2 });
      matrix.setSquare(topLeft);
      matrix.setSquare(topMiddle);
      matrix.setSquare(topRight);

      // verify state before
      expect(matrix.getRaw()).toEqual([
        [topLeft, undefined, undefined],
        [topMiddle, undefined, undefined],
        [topRight, undefined, undefined],
      ]);

      spawner.slideRight({
        matrix,
        score: 0,
        size: matrix.size,
        squares: matrix.getSquares(),
      });

      // verify state after
      expect(matrix.getRaw()).toEqual([
        [undefined, undefined, undefined],
        [topLeft, undefined, undefined],
        [topRight, undefined, undefined],
      ]);
      expect(topLeft.score).toEqual(2); // score should have stayed the same
      expect(topRight.score).toEqual(4); // score should have increased
    });
  });
});
