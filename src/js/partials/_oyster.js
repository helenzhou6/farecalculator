/**
 * Calculates the oyster total fare for the week
 * @function
 * @param {object days} complex object containing array of days, and within each day an object for each journey
 * @param {data object of dailyCaps (JSON file), singleFares (JSON file link)
 * @returns {number} - the cheapest weekly charge rounded to 2 dp
 * @description calculates whether it is cheapest to have a weekly travelcard or none
 */

 import {
  journeyToKey,
  keysToJourney,
  maxNum,
  minNum,
  getFare,
  round,
} from './../utility/_utility';

import oysterDayTotal from './_oysterDayTotal';
import weekTotal from './_weekTotal';

export default function oyster(days, data) {
	const weeklyCaps = keysToJourney(data.weeklyCaps);

	// if no weekly cap
	const noCapResult = {
		'noCap': weekTotal(oysterDayTotal, days, {
			options: {
				minTravelcard: false,
				maxTravelcard: false,
			},
			data,
		})
	};
	// for each weeky cap
	const capsResultPre = weeklyCaps.map((weekCap) => {
		const weekTotl = weekTotal(oysterDayTotal, days, {
			options: {
				minTravelcard: minNum(weekCap),
				maxTravelcard: maxNum(weekCap),
			},
			data,
		});
		//returns object: the weekly cap associated and the week total (with weekly cap added)
		return {
			[journeyToKey(weekCap)]: weekTotl + getFare(weekCap, false, data.weeklyCaps),
		};
	});

	// returns object: the cheapest weekly cap associated and the cheapest weekly total (rounded to 2 dp)
	const allCaps = Object.assign({}, noCapResult, ...capsResultPre);
	const cheapest = Object.keys(allCaps).reduce((a, b) => allCaps[a] < allCaps[b] ? a : b);
	
	return {
		cap: cheapest,
		value: round((allCaps[cheapest]), 2)
	};
}