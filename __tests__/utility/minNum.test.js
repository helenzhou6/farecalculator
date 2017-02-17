import {minNum} from './../../src/js/utility/_utility';

test('gets the maximum number from an array', () => {
  expect(minNum([1, 9, 2, 4, 100, 4.2])).toEqual(1);
});