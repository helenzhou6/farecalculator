import {getDailyCap} from './../../src/js/utility/_utility';

test('gets the daily cap from an array', () => {

	const dailyCaps = {
		"1-2": {
			"anytime": 6.6,
			"offPeak": 6.6
		},
		"1-3": {
			"anytime": 7.7,
			"offPeak": 7.7
		},
		"1-4": {
			"anytime": 9.5,
			"offPeak": 9.5
		},
		"1-5": {
			"anytime": 11.2,
			"offPeak": 11.2
		},
		"1-6": {
			"anytime": 12,
			"offPeak": 12
		}
	};

 	expect(getDailyCap(6, dailyCaps, 'anytime')).toEqual(12);
 	expect(getDailyCap(3, dailyCaps, 'anytime')).toEqual(7.7);
});