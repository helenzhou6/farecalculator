import {
  journeyToKey,
  keysToJourney,
  maxNum,
  minNum,
  getFare,
} from './../utility/_utility';

import oysterDayTotal from './_oysterDayTotal';
// NEED TO:
// Add off peak discount if reached anytime cap twice each week btween 1-4 or 1-6
// DUAL TO DUAL STATION ZONING ALTERATIONS

import weekTotal from './_weekTotal';

export default function oyster(days, data) {
	const weeklyCaps = keysToJourney(data.weeklyCaps);

	const noCapResult = {
		'noCap': weekTotal(oysterDayTotal, days, {
			false,
			data,
		})
	};

	const capsResultPre = weeklyCaps.map((weekCap) => {
		const total = weekTotal(oysterDayTotal, days, {
			options: {
				minTravelcard: minNum(weekCap),
				maxTravelcard: maxNum(weekCap),
			},
			data,
		});

		return {
			[journeyToKey(weekCap)]: total + getFare(weekCap, false, data.weeklyCaps),
		};
	});


	const allCaps = Object.assign({}, noCapResult, ...capsResultPre);
	const cheapest = Object.keys(allCaps).reduce((a, b) => allCaps[a] < allCaps[b] ? a : b);

	return {
		[cheapest]: allCaps[cheapest]
	};
}