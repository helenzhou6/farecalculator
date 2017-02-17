import {getSingleFare} from './../../src/js/utility/_utility';

test('filters a nested array based on its length', () => {
  const fares = {
    "1-1": 2.4,
    "1-2": 2.9,
    "1-3": 3.3,
    "1-4": 3.9,
    "1-5": 4.7,
    "1-6": 5.1
  };

  expect(getSingleFare([1, 4], fares)).toEqual(3.9);
  expect(getSingleFare([6, 1], fares)).toEqual(5.1);
});