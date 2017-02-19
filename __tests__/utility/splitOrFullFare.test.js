import splitOrFullFare from './../../src/js/partials/_splitOrFullFare';

test('gets whichever is cheapest: split 2 singles or full fare', () => {
  const singleFares = {
    "1-1": 2.4,
    "1-2": 2.9,
    "1-3": 3.3,
    "1-4": 3.9,
    "1-5": 4.7,
    "1-6": 5.1,
    "2-2": 1.7,
    "3-3": 1.7,
    "4-4": 1.7,
    "5-5": 1.7,
    "6-6": 1.7,
    "2-3": 1.7,
    "3-4": 1.7,
    "4-5": 1.7,
    "5-6": 1.7,
    "2-4": 2.4,
    "3-5": 2.4,
    "4-6": 2.4,
    "2-5": 2.8,
    "3-6": 2.8,
    "2-6": 2.8
  };

  expect(splitOrFullFare(2, 6, 3, 4, singleFares)).toEqual(2.8);
  expect(splitOrFullFare(1, 4, 2, 3, singleFares)).toEqual(3.9);
  expect(splitOrFullFare(2, 6, 3, 5, singleFares)).toEqual(2.8);
  expect(splitOrFullFare(1, 6, 2, 5, singleFares)).toEqual(4.1);
});