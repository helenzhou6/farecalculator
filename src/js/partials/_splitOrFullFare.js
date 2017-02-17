/**
 * If min single less than min travelcard and max single more than max travelcard - calculates whichever is cheaper:
 * 	either two split singles or full fare without travelcard
 * @function
 * @param {numbers} minChargedZone - the min zone that will charge between this min chargable zone to min travelcard - 1 (as single) and  max chargeable zone (to charge beween max travelcard +1 to max chargeable zone)
 * @returns {number} - returns the cheapest fare
 * @description
 */

import {
	getSingleFare,
	minNum,
} from '../utility/_utility';

export default function splitOrFullFare(minChargedZone, maxChargedZone, minTravelcard, maxTravelcard, singleFares) {
	return minNum([
		getSingleFare([minChargedZone, maxChargedZone], singleFares),
		getSingleFare([minChargedZone, (minTravelcard - 1)], singleFares) + getSingleFare([(maxTravelcard + 1), maxChargedZone], singleFares)
	]);
}