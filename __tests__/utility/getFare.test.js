import {getFare} from './../../src/js/utility/_utility';

describe('Gets the fare value for a journey', () => {

	test('Works with a single zone', () => {
  		expect(
  			getFare(4, 'offPeak', {
  				"1-4": {
					"anytime": 9.5,
					"offPeak": 10.5
				},
  			})
		).toEqual(10.5);
  		expect(
  			getFare(2, 'anytime', {
  				"1-2": {
					"anytime": 3,
					"offPeak": 6
				},
  			})
		).toEqual(3);
  	});

  	test('Works with an array of zones', () => {
  		expect(
  			getFare([6, 2], 'anytime', {
  				"2-6": {
					"anytime": 3,
					"offPeak": 6
				},
  			})
		).toEqual(3);
		expect(
  			getFare([1, 4], 'offPeak', {
  				"1-3": {
					"anytime": 3,
					"offPeak": 6
				},
				"1-4": {
					"anytime": 6,
					"offPeak": 9
				},
  			})
		).toEqual(9);
  	});
});

// getFare(maxZone, 'offPeak', dailyCaps)