import {getDifference} from './../../src/js/utility/_utility';

test('gets the difference between two numbers', () => {
  expect(getDifference(4, 10)).toEqual(6);
  expect(getDifference(10, 2)).toEqual(8);
  expect(getDifference(1, 6)).toEqual(5);
});
