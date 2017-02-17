import {getZones} from './../src/js/utility/_utility';

test('gets the zone(s) of a station based on a napTan ID', () => {
  const zone = getZones('sd8skws1', {
    'a1b2c3d4': {
      zones: [3,4]
    },
    'sd8skws1': {
      zones: [1,2]
    },
    '91d2c3d1': {
      zones: [1]
    },
  });

  expect(zone).toEqual([1,2]);
});
