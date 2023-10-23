import { describe, expect, it } from 'vitest';
import { Matrix } from '../Matrix';
import { MatrixFactory } from '../MatrixFactory';
import { Square } from '../Square';

describe(Matrix.name, () => {
  describe(Matrix.prototype.clearSquare.name, () => {
    it('should clear square', () => {
      const matrix = new MatrixFactory().create(1);
      const square = new Square({ id: '1', x: 0, y: 0, score: 2 });
      matrix.setSquare(square);

      // verify state before
      expect(matrix.getRaw()).toEqual([[square]]);

      matrix.clearSquare(0, 0);

      // verify state after
      expect(matrix.getRaw()).toEqual([[undefined]]);
    });
    it('should clear already empty square', () => {
      const matrix = new MatrixFactory().create(1);

      // verify state before
      expect(matrix.getRaw()).toEqual([[undefined]]);

      matrix.clearSquare(0, 0);

      // verify state after
      expect(matrix.getRaw()).toEqual([[undefined]]);
    });
    it('should throw if column too large', () => {
      const matrix = new MatrixFactory().create(1);

      expect(() => matrix.clearSquare(1, 0)).toThrow();
    });
    it('should throw if row too large', () => {
      const matrix = new MatrixFactory().create(1);

      expect(() => matrix.clearSquare(0, 1)).toThrow();
    });
  });

  describe(Matrix.prototype.setSquare.name, () => {
    it('should set square', () => {
      const matrix = new MatrixFactory().create(1);

      // verify state before
      expect(matrix.getRaw()).toEqual([[undefined]]);

      const square = new Square({ id: '1', x: 0, y: 0, score: 2 });
      matrix.setSquare(square);

      // verify state after
      expect(matrix.getRaw()).toEqual([[square]]);
    });
    it('should set already full square', () => {
      const matrix = new MatrixFactory().create(1);
      const square = new Square({ id: '1', x: 0, y: 0, score: 2 });
      matrix.setSquare(square);

      // verify state before
      expect(matrix.getRaw()).toEqual([[square]]);

      const newSquare = new Square({ id: '2', x: 0, y: 0, score: 2 });
      matrix.setSquare(newSquare);

      // verify state after
      expect(matrix.getRaw()).toEqual([[newSquare]]);
    });
    it('should throw if column too large', () => {
      const matrix = new MatrixFactory().create(1);
      const square = new Square({ id: '1', x: 1, y: 0, score: 2 });

      expect(() => matrix.setSquare(square)).toThrow();
    });
    it('should throw if row too large', () => {
      const matrix = new MatrixFactory().create(1);
      const square = new Square({ id: '1', x: 0, y: 1, score: 2 });

      expect(() => matrix.setSquare(square)).toThrow();
    });
  });

  describe(Matrix.prototype.getSquare.name, () => {
    it('should get square', () => {
      const matrix = new MatrixFactory().create(1);
      const square = new Square({ id: '1', x: 0, y: 0, score: 2 });
      matrix.setSquare(square);

      expect(matrix.getSquare(0, 0)).toStrictEqual(square);
    });
    it('should get empty square', () => {
      const matrix = new MatrixFactory().create(1);

      expect(matrix.getSquare(0, 0)).toBeUndefined();
    });
  });
});
