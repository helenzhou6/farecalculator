import {getDailyCap} from './../../src/js/utility/_utility';

test('gets the daily cap from an array', () => {

	const dailyCaps = {
		"1-2": 6.6,
		"1-3": 7.7,
		"1-4": 9.5,
		"1-5": 11.2,
		"1-6": 12
	};

 	expect(getDailyCap(6, dailyCaps)).toEqual(12);
 	expect(getDailyCap(3, dailyCaps)).toEqual(7.7);
});