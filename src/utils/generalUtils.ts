import { cloneDeep, take, takeRight } from "lodash";

export const updateInArrayAtIndex = <T>(array: Array<T>, index: number, element: T): Array<T> =>
  [...take(array, index), element, ...takeRight(array, array.length - index - 1)];

export const switchElementsBetweenArrays = <T>(array1: Array<T>, index1: number, array2: Array<T>, index2: number): {array1: Array<T>, array2: Array<T>} => {
  const array1Clone = cloneDeep(array1);
  const array2Clone = cloneDeep(array2);

  const element1 = array1[index1];
  const element2 = array2[index2];

  array1Clone[index1] = element2;
  array2Clone[index2] = element1;

  return {array1: array1Clone, array2: array2Clone};
}

export const removeElementFromArrayAtIndex = <T>(array: Array<T>, index: number): Array<T> => {
  return [...take(array, index), ...takeRight(array, array.length - index - 1)];
}