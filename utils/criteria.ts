import { Result } from '../types';

export const criteria = function (a: Result, b: Result) {
  return a.slot.start < b.slot.start ? -1 : a.slot.start > b.slot.start ? 1 : 0;
};
