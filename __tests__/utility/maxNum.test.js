import {maxNum} from './../../src/js/utility/_utility';

test('gets the maximum number from an array', () => {
  expect(maxNum([1, 9, 2, 4, 100, 4.2])).toEqual(100);
  expect(maxNum([1, 1])).toEqual(1);
});
