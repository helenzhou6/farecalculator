import {
	getSingleFare,
	maxNum,
} from '../utility/_utility';

import splitOrFullFare from './_splitOrFullFare';

// /**
//  * Calculates the extension fare (or none) of a journey
//  * @function
//  * @param {object} see below
//  * @param {singleFares} uses the singleFares json data
//  * @returns {number} - returns the extension fare for the journey
//  * @description
//
// 	//FOR DAILY CAPS: ALWAYS START AT 1 SO MOST OF THIS CODE TOO COMPLEX: but would still work
// 	//FOR WEEKLY CAPS: this works out fare without any daily caps or mix daily and weekly where there are no gap zones (so between 1 and max zone of either daily or weekly cap) -- unless you add in MaxDaily
//  // this is overly complicated for daily caps (as only deals with zone 1 to x) but still works. RELIES ON THE FACT DAILY ALWAYS STARTS AT 1
//  */

export default function extensionFares(options = {}, singleFares) {
  const maxDaily = options.maxDaily || null;
  //by default: just one travelcard (weekly without daily or just daily cap) for either oyster or contactless, or oyster with weekly cap (doesn't cut off daily section of the journey)

	let {
		minSingle, //maximum zone of the single journey
		maxSingle, //minimum single zone of the journey
    minTravelcard, //minimum zone of the travelcard currently testing
		maxTravelcard, //maximum zone of the travelcard currently testing
		//if maxdaily also involved (for contactless weekly and daily combo): so that it only charges the gap zones
	} = options;
	//same as var minSingle = options.minSingle;

  let minChargedZone = minSingle;
  let finalCondition = null;

  if (maxDaily) { // If contactless, daily and weekly combo (hence adding in maxDaily as argument_
  	if (maxDaily >= (minTravelcard - 1)) { //if no gap zones between max daily and min travelcard
    	minTravelcard = 1; //since anytime daily caps always start at zone 1
    	maxTravelcard = maxNum([maxDaily, maxTravelcard]); //max travelcard is whichever is largest max daily or max travelcard
    //else if contactless, daily and weekly combo, and there are gap zones between max daily and min travelcard, have a min charged zone (not charge the daily cap - the front)
		} else { //IF difference bw min weekly and max daily cap > 1 -- THEN THERE ARE GAP ZONES
			minChargedZone = ((minSingle <= maxDaily) ? maxDaily + 1 : minSingle);
			finalCondition = (minSingle <= maxDaily && maxSingle <= maxDaily);
		}
	}

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
 		return 0;

 	//both single zones are outside travelcard zones
 	}
  return getSingleFare([minChargedZone, maxSingle], singleFares);
 	 //ELSE min single and max single both > max weekly zone (or both < min daily) OR min single zone > min gap zone && max single zone < max gap zone
};
