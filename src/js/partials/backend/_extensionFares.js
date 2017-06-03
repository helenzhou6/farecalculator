// /**
//  * Calculates the extension fare (or none) of a journey
//  * @function
//  * @param {object} see below
//  * @param {singleFares} uses the singleFares json data
//  * @returns {number} - returns the extension fare for the journey
//  * @description
//
//  by default: just one travelcard (weekly without daily or just daily cap) for either oyster or contactless, or oyster with weekly cap (doesn't cut off daily section of the journey)
// 	FOR WEEKLY CAPS: this works out fare without any daily caps or mix daily and weekly where there are no gap zones (so between 1 and max zone of either daily or weekly cap) -- unless you add in MaxDaily
//  // this is overly complicated for daily caps (as only deals with zone 1 to x) but still works. RELIES ON THE FACT DAILY ALWAYS STARTS AT 1
//  */
import {
	getFare,
	maxNum,
	isWithin,
} from '../../utility/_utility';

import splitOrFullFare from './_splitOrFullFare';

export default function extensionFares(options = {}, singleFares) {
  let maxDaily = options.maxDaily || null;

	let {
		zones,
		type,
		// Minimum zone of the travelcard currently testing
    	minTravelcard,
    	// Maximum zone of the travelcard currently testing
		maxTravelcard,
		// If maxdaily also involved (for contactless weekly and daily combo): so that it only charges the gap zones
	} = options;

  let finalCondition = null;
  let minSingle = zones[0];
  let maxSingle = zones[1];
  let minChargedZone = minSingle;

	// If contactless, daily and weekly combo (hence adding in maxDaily as argument)
	if (maxDaily && maxTravelcard) { 
		// If there are no gap zones between max daily and min travelcard
	 	if (maxDaily >= (minTravelcard - 1)) {
	 		// Sets minTravelcard to 1 since anytime daily caps always start at zone 1
	  		minTravelcard = 1; 
	  		// maxTravelcard is whichever is largest max daily or max travelcard
	   		maxTravelcard = maxNum([maxDaily, maxTravelcard]); 

	   	// IF difference bw min weekly and max daily cap > 1 -- THEN THERE ARE GAP ZONES between max daily and min travelcard
		// -- so have a min charged zone (not charge the daily cap - only charge the front)
		} else { 
			minChargedZone = ((minSingle <= maxDaily) ? maxDaily + 1 : minSingle);
			finalCondition = (minSingle <= maxDaily && maxSingle <= maxDaily);
		}
	}
	// If only maxDaily is passed in and no maxTravelcard
	// -- Then maxTravelcard becaomes maxDaily, minTravelcard is 1 (as daily caps start at 1) and maxDaily is not needded
	if (maxDaily && !maxTravelcard) {
		maxTravelcard = maxDaily;
		minTravelcard = 1;
		maxDaily = false;
	}

	// If min single isnt within travelcard zones but max single is - charge front
	if ((minSingle < minTravelcard) && (isWithin(minTravelcard, maxSingle, maxTravelcard))) {
		return getFare([minChargedZone, (minTravelcard - 1)], type, singleFares);

	// If min single within travelcard zones but max single isnt - charge end
 	} else if (isWithin(minTravelcard, minSingle, maxTravelcard) && (maxSingle > maxTravelcard)) {
 		return getFare([(maxTravelcard + 1), maxSingle], type, singleFares);

 	// If min single less than min travelcard and max single more than max travelcard - charge front and end
 	} else if (minSingle < minTravelcard && maxSingle > maxTravelcard) {

 		return splitOrFullFare(
      		minChargedZone, maxSingle,
 			minTravelcard, maxTravelcard,
 			singleFares, type);

	// Both single zones within travelcard zones - no charge
 	} else if (isWithin(minTravelcard, minSingle, maxTravelcard)
 		&& isWithin(minTravelcard, maxSingle, maxTravelcard)
 		|| finalCondition) {
 		return 0;
 	
 	}

	// Journey is made are outside travelcard zones - charge the fare
  return getFare([minChargedZone, maxSingle], type, singleFares);

}
