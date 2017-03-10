/**
 * Calculates the contactless total fare for the week with week cap from a monthly travelcard
 * @function
 * @param {object days} complex object containing array of days, and within each day an object for each journey
 * @param {data object} of dailyCaps (JSON file), singleFares (JSON file link)
 * @returns {number} - the cheapest weekly charge rounded to 2 dp
 * @description
 */


// SHOULD THIS BE MERGED WITH OYSTER?
import oyster from './_oyster';
import { getFare,
			round,
			getDifference,
		 } from './../utility/_utility';

export default function oysterMonthly(days, data) {
	const oysterCap = oyster(days, data).cap;
	if (oysterCap !== "noCap") {

		// Monthly is based on each calendar month: *12 months / 52 weeks
		// Calculates the cost of the week cap based on the monthly cap
		const weekFromMonthly = ((getFare([oysterCap], false, data.monthlyCaps)) * 12 ) / 52;

		// Gets the difference between the week cap from weekly caps or week cap from monthly cap
		const discount = getDifference(
							weekFromMonthly,
							(getFare([oysterCap], false, data.weeklyCaps))
						);

		// Applies the discount to the oyster week total
		return round((oyster(days, data).value - discount), 2);
	} else {
		return false;
	}
};