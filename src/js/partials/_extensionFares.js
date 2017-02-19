import {
	getSingleFare,
	minNum,
} from '../utility/_utility';

import splitOrFullFare from './_splitOrFullFare';

/**
 * Calculates the extension fare (or none) of a journey
 * @function
 * @param {number} see below
 * @returns {number} - returns the fare
 * @description
 	//CONTACTLESS only uses adult fares
	//FOR DAILY CAPS: ALWAYS START AT 1 SO MOST OF THIS CODE TOO COMPLEX: but would still work
	//FOR WEEKLY CAPS: this works out fare without any daily caps or mix daily and weekly where there are no gap zones (so between 1 and max zone of either daily or weekly cap)
 */

export default function extensionFares(options = {}, singleFares) {
  const maxDaily = options.maxDaily || null;
  const oyster = options.oyster || null;

	const {
		minSingle,
		maxSingle,
    minTravelcard,
		maxTravelcard,
	} = options;

	const minChargedZone = (!oyster || (maxDaily && minSingle <= maxDaily) ? maxDaily + 1 : minSingle);
  const finalCondition = (maxDaily ? minSingle <= maxDaily && maxSingle <= maxDaily : null);

	// minSingle, maxSingle, //the min and max zones travelled in this single journey
	// minTravelcard, maxTravelcard, //min and max zones of the travelcard zones concerned
	// singleFares) { // to get from single fares json)

	//if min single isnt within travelcard zones but max single is(NB not needed for daily cap) - charge front
	if ((minSingle < minTravelcard) && (minTravelcard <= maxSingle && maxSingle <= maxTravelcard)) {
		return getSingleFare([minChargedZone, (minTravelcard - 1)], singleFares);

	//if min single within travelcard zones but max single isnt - charge end
 	} else if ((minTravelcard <= minSingle && minSingle <= maxTravelcard) && (maxSingle > maxTravelcard)) {
 		return getSingleFare([(maxTravelcard + 1), maxSingle], singleFares);

 	//if min single less than min travelcard and max single more than max travelcard (NB not needed for daily cap) - charge front and end
 	} else if (minSingle < minTravelcard && maxSingle > maxTravelcard) {
 		return splitOrFullFare(
      minChargedZone, maxSingle,
 			minTravelcard, maxTravelcard,
 			singleFares);

	//both single zones within travelcard zones
 	} else if ((minTravelcard <= minSingle && minSingle <= maxTravelcard) && (minTravelcard <= maxSingle && maxSingle <= maxTravelcard) || finalCondition) {
 		return 0; //NEED TO ADD both min and max singles within min and max daily

 	//both single zones are outside travelcard zones
 	} else {
 		return getSingleFare([minChargedZone, maxSingle], singleFares);
 	} //ELSE min single and max single both > max weekly zone (or both < min daily) OR min single zone > min gap zone && max single zone < max gap zone
};
