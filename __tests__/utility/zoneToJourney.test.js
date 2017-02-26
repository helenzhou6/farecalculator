import {zoneToJourney} from './../../src/js/utility/_utility';

test('converts a single zone into a journey', () => {
  expect(zoneToJourney(4)).toEqual('1-4');
  expect(zoneToJourney(1)).toEqual('1-1');
});
