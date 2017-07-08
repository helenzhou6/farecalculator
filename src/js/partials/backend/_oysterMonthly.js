/**
 * Calculates the contactless total fare for the week with week cap from a monthly travelcard
 * @function
 * @param {object days} complex object containing array of days, and within each day an object for each journey
 * @param {data object} of dailyCaps (JSON file), singleFares (JSON file link)
 * @returns {number} - the cheapest weekly charge rounded to 2 dp
 * @description
 */

 import {
  journeyToKey,
  keysToJourney,
  maxNum,
  minNum,
  getFare,
  round,
} from './../../utility/_utility';

	 import oysterDayTotal from './_oysterDayTotal';
	 import weekTotal from './_weekTotal';

export default function oysterMonthly(days, data) {
		// Monthly is based on each calendar month: *12 months / 52 weeks
		// Calculates the cost of the week cap based on the monthly cap
		const monthlyCaps = keysToJourney(data.monthlyCaps);

		// 1. If no monthly cap is passed in
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
		const capsResultPre = monthlyCaps.map((monthCap) => {
			const weekTotl = weekTotal(oysterDayTotal, days, {
				options: {
					minTravelcard: minNum(monthCap),
					maxTravelcard: maxNum(monthCap),
				},
				data,
			});
			// Returns an object: the weekly cap associated and the week total (with weekly cap added)
			return {
				[journeyToKey(monthCap)]: weekTotl + ((getFare(monthCap, false, data.monthlyCaps) * 12) / 52),
			};
		});

		// Adds noCap and each weekly cap object into one object of all possible weekly total fares
		const allCaps = Object.assign({}, noCapResult, ...capsResultPre);
		// Loops this object to find the cheapest week total
		const cheapest = Object.keys(allCaps).reduce((a, b) => allCaps[a] < allCaps[b] ? a : b);

		// Returns object: the cheapest weekly cap associated and the cheapest weekly total (rounded to 2 dp)
		return {
			cap: cheapest,
			weeklyValue: round((allCaps[cheapest]), 2)
		};

};
