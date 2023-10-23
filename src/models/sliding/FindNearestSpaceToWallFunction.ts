import type { Matrix } from "../Matrix";

export type FindNearestSpaceToWallFunction = (
  matrix: Matrix,
  columnOrRow: number,
  currentPosition: number
) => number | undefined;

export const nearestSpaceToWallAbove: FindNearestSpaceToWallFunction = (
  matrix: Matrix,
  column: number,
  currentPosition: number,
): number | undefined => {
  // start from current position - 1 to find closest empty space
  let index: number | undefined;
  for (let z = currentPosition - 1; z >= 0; z--) {
    if (matrix.getSquare(column, z) === undefined) {
      index = z;
    } else {
      break;
    }
  }
  return index;
};

export const nearestSpaceToWallBelow: FindNearestSpaceToWallFunction = (
  matrix: Matrix,
  column: number,
  currentPosition: number,
): number | undefined => {
  // start from current position + 1 to find closest empty space
  let index: number | undefined;
  for (let z = currentPosition + 1; z < matrix.size; z++) {
    if (matrix.getSquare(column, z) === undefined) {
      index = z;
    } else {
      break;
    }
  }
  return index;
};

export const nearestSpaceToWallLeft: FindNearestSpaceToWallFunction = (
  matrix: Matrix,
  row: number,
  currentPosition: number,
): number | undefined => {
  // start from current position - 1 to find closest empty space
  let index: number | undefined;
  for (let z = currentPosition - 1; z >= 0; z--) {
    if (matrix.getSquare(z, row) === undefined) {
      index = z;
    } else {
      break;
    }
  }
  return index;
};

export const nearestSpaceToWallRight: FindNearestSpaceToWallFunction = (
  matrix: Matrix,
  row: number,
  currentPosition: number,
): number | undefined => {
  // start from current position + 1 to find closest empty space
  let index: number | undefined;
  for (let z = currentPosition + 1; z < matrix.size; z++) {
    if (matrix.getSquare(z, row) === undefined) {
      index = z;
    } else {
      break;
    }
  }
  return index;
};
