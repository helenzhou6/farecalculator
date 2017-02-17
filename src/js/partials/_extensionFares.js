/**
 * Calculates the extension fare (or none) of a journey
 * @function
 * @param {array} minmaxTravelcard - the min and max zone of the travelcard covered zones, in an array
 * @param {array} minmaxJourney - the min and max zone of the single journey, in an array
 * @returns {number} - returns the fare
 * @description
 */

import {
	getDifference,
	getSingleFare,
	minNum,
} from '../utility/_utility';

import splitOrFullFare from './_splitOrFullFare';

export default function extensionFares(minmaxTravelcard, minmaxJourney, singleFares) {
	var minTravelcard = minmaxTravelcard[0];
	var maxTravelcard = minmaxTravelcard[1];
	var minSingle = minmaxJourney[0];
	var maxSingle = minmaxJourney[1];
	var journeyFare = null;
	
	//CONTACTLESS only uses adult fares
	//FOR DAILY CAPS: ALWAYS START AT 1 SO MOST OF THIS CODE TOO COMPLEX: but would still work
	//FOR WEEKLY CAPS: this works out fare without any daily caps

	//if max single within travelcard zones but min single isnt.
	if (!(minTravelcard <= minSingle && minSingle <= maxTravelcard) && (minTravelcard <= maxSingle && maxSingle <= maxTravelcard)) {
		var y = getDifference(maxSingle, minTravelcard);
		journeyFare = getSingleFare([minSingle, maxSingle - (y+1)], singleFares);

	//if min single within travelcard zones but max single isnt.
 	} else if ((minTravelcard <= minSingle && minSingle <= maxTravelcard) && !(minTravelcard <= maxSingle && maxSingle <= maxTravelcard)) {
 		var y = getDifference(minSingle, maxTravelcard);
 		journeyFare = getSingleFare([minSingle + (y+1), maxSingle], singleFares);

 	//if min single less than min travelcard and max single more than max travelcard
 	} else if (minSingle < minTravelcard && maxSingle > maxTravelcard) {
 		journeyFare = splitOrFullFare(minSingle, maxSingle, minTravelcard, maxTravelcard, singleFares);
	//both single zones within travelcard zones
 	} else if ((minTravelcard <= minSingle && minSingle <= maxTravelcard) && (minTravelcard <= maxSingle && maxSingle <= maxTravelcard)) {
 		journeyFare = 0;
 	//both single zones are outside travelcard zones
 	} else {
 		journeyFare = getSingleFare([minSingle, maxSingle], singleFares);
 	}

 	return journeyFare;
};