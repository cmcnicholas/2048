import { Matrix } from "./Matrix";
import type { Square } from "./Square";

export class MatrixFactory {
  public create(size: number): Matrix {
    const matrix: Square[][] = [];

    // seed the matrix
    for (let x = 0; x < size; x++) {
      matrix.push(new Array(size).fill(undefined));
    }

    return new Matrix(size, matrix);
  }
}