import { take, takeRight } from "lodash";

export const updateInArrayAtIndex = <T>(array: Array<T>, index: number, element: T): Array<T> =>
  [...take(array, index), element, ...takeRight(array, array.length - index - 1)];
