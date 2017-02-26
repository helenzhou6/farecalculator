import {
  journeyToKey,
  keysToJourney,
  maxNum,
  minNum,
  getFare,
} from './../utility/_utility';

// NEED TO:
// Add off peak discount if reached anytime cap twice each week btween 1-4 or 1-6
// DUAL TO DUAL STATION ZONING ALTERATIONS

import oysterWeekTotal from './_oysterWeekTotal';

export default function oyster(days, data) {
	const caps = keysToJourney(data.weeklyCaps);

	const noCapResult = {
		'noCap': oysterWeekTotal(days, {
			false,
			data,
		})
	};

	const capsResultPre = caps.map((cap) => {
		const total = oysterWeekTotal(days, {
			options: {
				minTravelcard: minNum(cap),
				maxTravelcard: maxNum(cap),
			},
			data,
		});

		return {
			[journeyToKey(cap)]: total + getFare(cap, false, data.weeklyCaps),
		};
	});

	const allCaps = Object.assign({}, noCapResult, ...capsResultPre);
	const cheapest = Object.keys(allCaps).reduce((a, b) => allCaps[a] < allCaps[b] ? a : b);

	return {
		[cheapest]: allCaps[cheapest]
	};
}