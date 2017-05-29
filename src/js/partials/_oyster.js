/**
 * Calculates the oyster total fare for the week
 * @function
 * @param {object days} complex object containing array of days, and within each day an object for each journey
 * @param {data object of dailyCaps (JSON file), singleFares (JSON file link)
 * @returns {object} value: - the cheapest weekly charge rounded to 2 dp
 // and cap: the weekly cap applied (if any)
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
import oysterMonthly from './_oysterMonthly';
import weekTotal from './_weekTotal';

export default function oyster(days, data) {
	const weeklyCaps = keysToJourney(data.weeklyCaps);

	// 1. If no weekly cap is passed in
	const noCapResult = {
		'noCap': weekTotal(oysterDayTotal, days, {
			options: {
				minTravelcard: false,
				maxTravelcard: false,
			},
			data,
		})

	};
	// 2. For each possible weekly cap
	const capsResultPre = weeklyCaps.map((weekCap) => {
		const weekTotl = weekTotal(oysterDayTotal, days, {
			options: {
				minTravelcard: minNum(weekCap),
				maxTravelcard: maxNum(weekCap),
			},
			data,
		});
		// Returns an object: the weekly cap associated and the week total (with weekly cap added)
		return {
			[journeyToKey(weekCap)]: weekTotl + getFare(weekCap, false, data.weeklyCaps),
		};
	});

	// Adds noCap and each weekly cap object into one object of all possible weekly total fares
	const allCaps = Object.assign({}, noCapResult, ...capsResultPre);
	// Loops this object to find the cheapest week total
	const cheapest = Object.keys(allCaps).reduce((a, b) => allCaps[a] < allCaps[b] ? a : b);
	
	// Returns object: the cheapest weekly cap associated and the cheapest weekly total (rounded to 2 dp)
	const weeklyValue = round((allCaps[cheapest]), 2);

	return {
		cap: cheapest,
		weeklyValue,
		monthlyValue: oysterMonthly(cheapest, weeklyValue, data),
	};
}