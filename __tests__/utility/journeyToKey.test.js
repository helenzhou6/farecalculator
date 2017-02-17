import {journeyToKey} from './../../src/js/utility/_utility';

test('converts an array of numbers to an index-key string', () => {
  expect(journeyToKey([1, 9])).toEqual('1-9');
  expect(journeyToKey([6, 2])).toEqual('2-6');
});
