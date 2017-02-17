import {
	getDifference,
	getSingleFare,
	// getZones,
	// filterZonesByNumber,
	minNum,
	// maxNum
} from '../utility/_utility';

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
		var journey = [minSingle, maxSingle - (y+1)];
		journeyFare = getSingleFare(journey, singleFares);

	//if min single within travelcard zones but max single isnt.
 	} else if ((minTravelcard <= minSingle && minSingle <= maxTravelcard) && !(minTravelcard <= maxSingle && maxSingle <= maxTravelcard)) {
 		var y = getDifference(minSingle, maxTravelcard);
 		var journey = [minSingle + (y+1), maxSingle];
 		journeyFare = getSingleFare(journey, singleFares);

 	//if min single less than min travelcard and max single more than max travelcard
 	} else if (minSingle < minTravelcard && maxSingle > maxTravelcard) {
 		var fares = [];
 		var y = getDifference(minSingle, minTravelcard);
 		var x = getDifference(maxSingle, maxTravelcard);
 		// picks the cheapest: split singles or the full fare without travelcard == should be a global function
 		var cost = getSingleFare([minSingle, (minTravelcard - 1)], singleFares) + getSingleFare([(maxTravelcard + 1), maxSingle], singleFares);
 		fares.push(cost);
		var journey = [minSingle, maxSingle];
		fares.push(getSingleFare(journey, singleFares));
		journeyFare = minNum(fares)
	//both single zones within travelcard zones
 	} else if ((minTravelcard <= minSingle && minSingle <= maxTravelcard) && (minTravelcard <= maxSingle && maxSingle <= maxTravelcard)) {
 		journeyFare = 0;
 	//both single zones are outside travelcard zones
 	} else {
 		var journey = [minSingle, maxSingle];
 		journeyFare = getSingleFare(journey, singleFares);
 	}
 	return journeyFare;
 	//console.log(journeyFare);
};