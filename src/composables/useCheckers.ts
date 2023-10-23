import { SizeInPixels } from '@/utils/Constants';
import { computed, unref, type ComputedRef, type MaybeRef } from 'vue';

export type CheckerModel = {
  id: string;
  x: number;
  y: number;
};

export const useCheckers = (size: MaybeRef<number>): ComputedRef<CheckerModel[]> =>
  computed<CheckerModel[]>(() => {
    const checkers: CheckerModel[] = [];
    for (let row = 0; row < unref(size); row++) {
      for (let column = 0; column < unref(size); column++) {
        if ((row + column) % 2 === 0) {
          checkers.push({
            id: `${row}/${column}`,
            x: column * SizeInPixels,
            y: row * SizeInPixels,
          });
        }
      }
    }
    return checkers;
  });
