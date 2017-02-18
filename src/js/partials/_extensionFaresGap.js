import {
	getSingleFare,
	minNum,
} from '../utility/_utility';

import splitOrFullFare from './_splitOrFullFare';

/**
 * Calculates ext fare: for CONTACTLESS WEEKLY CAP - mixture  of weekly cap and daily cap with gap zones
 * @function
 * @param {number} see below
 * @returns {number} - returns the extension fare
 * @description
 //THIS METHOD RELIES ON THE FACT THAT:
//- Assumes daily caps always start at zone 1 (else need min single < capped zone IFs)
 */


export default function extensionFaresGap(
	minSingle, maxSingle, //the min and max zones travelled in this single journey
	maxDaily,//the max daily zone - used for calcs since with mixture weekly and daily cap, the single max zone and min charged zone is different
	// (essentially cutting the start of the journey and only charging the gap zone onwards) SET AS 0 IF JUST WORKING OUT DAILY
	minTravelcard, maxTravelcard, //min and max zones of the travelcard zones concerned
	singleFares) { // to get from single fares json) 

	var journeyFare = null;

	if (minSingle <= maxDaily) {
		var minChargedZone = maxDaily + 1;
	} else {
		var minChargedZone = minSingle;
	}

	//if min single isnt within travelcard zones but max single is(NB not needed for daily cap) - charge front
	if ((minSingle < minTravelcard) && (minTravelcard <= maxSingle && maxSingle <= maxTravelcard)) {
		journeyFare = getSingleFare([minChargedZone, (minTravelcard - 1)], singleFares);

	//if min single within travelcard zones but max single isnt - charge end
 	} else if ((minTravelcard <= minSingle && minSingle <= maxTravelcard) && (maxSingle > maxTravelcard)) {
 		journeyFare = getSingleFare([(maxTravelcard + 1), maxSingle], singleFares);

 	//if min single less than min travelcard and max single more than max travelcard (NB not needed for daily cap) - charge front and end
 	} else if (minSingle < minTravelcard && maxSingle > maxTravelcard) {
 		journeyFare = splitOrFullFare(
 			minChargedZone, maxSingle,
 			minTravelcard, maxTravelcard,
 			singleFares);

	//both single zones within travelcard zones
 	} else if ((minTravelcard <= minSingle && minSingle <= maxTravelcard) && (minTravelcard <= maxSingle && maxSingle <= maxTravelcard)
 		|| (minSingle <= maxDaily && maxSingle <= maxDaily)) {
 		journeyFare = 0;

 	//both single zones are outside travelcard zones
 	} else {
 		journeyFare = getSingleFare([minChargedZone, maxSingle], singleFares);
 	} //ELSE min single and max single both > max weekly zone (or both < min daily) OR min single zone > min gap zone && max single zone < max gap zone

 	return journeyFare;
};