/**
 * Calculates the contactless total fare for the week with week cap from a monthly travelcard
 * @function
 * @param {object days} complex object containing array of days, and within each day an object for each journey
 * @param {data object} of dailyCaps (JSON file), singleFares (JSON file link)
 * @returns {number} - the cheapest weekly charge rounded to 2 dp
 * @description
 */

import { getFare,
			round,
			getDifference,
			keyToJourney,
		 } from './../../utility/_utility';

export default function oysterMonthly(cap, weeklyValue, data) {
	if (cap !== "noCap") {

		// Monthly is based on each calendar month: *12 months / 52 weeks
		// Calculates the cost of the week cap based on the monthly cap
		const weekFromMonthly = ((getFare(keyToJourney(cap), false, data.monthlyCaps)) * 12 ) / 52;

		// Gets the difference between the week cap from weekly caps and the week cap from monthly cap (a discount)
		const discount = getDifference(
							weekFromMonthly,
							(getFare(keyToJourney(cap), false, data.weeklyCaps))
						);

		// Applies the discount to the oyster week total of that week
		return round((weeklyValue - discount), 2);
	} else {
		return false;
	}
};