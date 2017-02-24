import {getSingleFare} from './../../src/js/utility/_utility';

test('filters a nested array based on its length', () => {
  const fares = {
    "1-1": {
      "anytime": 2.4,
      "offPeak": 2.4
    },
    "1-2": {
      "anytime": 2.9,
      "offPeak": 2.4
    },
    "1-3": {
      "anytime": 3.3,
      "offPeak": 2.8
    },
    "1-4": {
      "anytime": 3.9,
      "offPeak": 2.8
    },
    "1-5": {
      "anytime": 4.7,
      "offPeak": 3.1
    },
    "1-6": {
      "anytime": 5.1,
      "offPeak": 3.1
    },
  };

  expect(getSingleFare([1, 4], fares, 'anytime')).toEqual(3.9);
  expect(getSingleFare([6, 1], fares, 'anytime')).toEqual(5.1);
});