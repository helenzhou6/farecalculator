import {flatten} from './../../src/js/utility/_utility';

test('flattens a nested array into a single array', () => {
  const flattened = flatten([[0, 9], [4, 1, 7]]);
  expect(flattened).toEqual([0, 9, 4, 1, 7]);
});