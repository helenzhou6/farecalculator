/**
 *If min single less than min travelcard and max single more than max travelcard
 (I.e. A journey of e.g. 1-6 but a travel card of 3-4)
 - calculates whichever is cheaper: either two split singles (1-2 + 5-6)
 or full fare without travelcard (1-6).
 * @function
 * @param {numbers} minChargedZone - the min zone that will charge between this min chargable zone to min travelcard - 1 (as single) and  max chargeable zone (to charge beween max travelcard +1 to max chargeable zone)
 * @returns {number} - returns the cheapest fare
 * @description
 */

import {
	getFare,
	minNum,
} from '../utility/_utility';

export default function splitOrFullFare(
	minChargedZone, maxSingle,
	minTravelcard, maxTravelcard,
	singleFares, type) {
	return minNum([
		// The full fare (disregarding any travelcards)
		getFare([minChargedZone, maxSingle], type, singleFares),

		// The fare between minCharged Zone and minTravelcard + 1 - charges the front
		(getFare([minChargedZone, (minTravelcard - 1)], type, singleFares)
		// The fare between maxTravelcard + 1 and maxSingle - charges the back
			+ getFare([(maxTravelcard + 1), maxSingle], type, singleFares)
		)
	]);
}