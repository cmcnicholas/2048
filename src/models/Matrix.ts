import type { Square } from './Square';

/**
 * matrix is a grid of squares where 0,0 is top left, where dimensions are [x][y]
 */
export class Matrix {
  public readonly size: number;
  private readonly matrix: Array<Array<Square | undefined>>;

  public constructor(size: number, matrix: Array<Array<Square | undefined>>) {
    this.size = size;
    this.matrix = matrix;
  }

  public setSquare(square: Square): void {
    if (square.x >= this.size || square.y >= this.size) {
      throw new Error(`square row or column too large row: "${square.y}", columne: "${square.x}"`);
    }

    const columnArray = this.matrix[square.x];
    if (!columnArray) {
      throw new Error(`expected column array at index ${square.x}`);
    }
    columnArray[square.y] = square;
  }

  public clearSquare(column: number, row: number): void {
    if (row >= this.size || column >= this.size) {
      throw new Error(`row or column too large row: "${row}", column: "${column}"`);
    }

    const columnArray = this.matrix[column];
    if (!columnArray) {
      throw new Error(`expected column array at index ${column}`);
    }
    columnArray[row] = undefined;
  }

  public getSquare(column: number, row: number): Square | undefined {
    return this.matrix[column]?.[row];
  }

  public getRaw(): Array<Array<Square | undefined>> {
    return structuredClone(this.matrix);
  }

  public getSquares(): Square[] {
    return this.matrix.flat().filter((square): square is Square => !!square);
  }
}
