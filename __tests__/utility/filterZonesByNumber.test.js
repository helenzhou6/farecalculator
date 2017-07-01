import {filterZonesByNumber} from './../../src/js/utility/_utility';

test('filters a nested array based on its length', () => {
  const filtered = filterZonesByNumber(3, [
    [0, 1, 2],
    [9],
    [6, 1, 6],
    [4, 2],
    [1, 6, 2, 1],
  ]);

  expect(filtered).toEqual([
    [0, 1, 2],
    [6, 1, 6],
  ]);
});
