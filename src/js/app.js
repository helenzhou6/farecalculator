import {
	getZones, 
	filterZonesByNumber,
	maxNum,
	minNum,
	getDifference,
	flatten,
	journeyToKey,
	getDailyCap,
	getSingleFare
} from './utility/_utility';

import getData from './utility/_getData';
import getSingleJourneyZones from './partials/_getSingleJourneyZones';
import extensionFares from './partials/_extensionFares';

//TO DO
//Off peak vs on peak singles (esp including out of zone 1 to zone 1 in evening is offpeak exception)
//Offpeak daily cap discounts - keep track when daily cap reached but only travelled off peak (if going to do off peak oyster cum totals then would know this)
//possibility of altering oyster so reflects off peak -- then could add  the Railcard or Gold card discount to your Oyster and 1-8  zones or to 9 without watford
//CAN DO APPRENTICE, 18+ STUDENT, 16+ ZIP, JOB CENTRE ON OYSTER - as no diff bw off peak / on peak daily caps

getData.stations().then(function(stations) {
	getSingleJourneyZones('1000029', '1000138', stations).then((resp) => {
		console.log(resp);
	});
});

// Formulate array? Journey 1 object: with zones travelled (array: min and max), time, off-peak or on-peak, single price, flag for dual to dual (and what zones).

//--------------------------------------------
// Global functions > compareNumbers (can reduce to the maxNum and minNum of an array) & getDifference bw 2 numbers

getData.fares().then(function(fareData) {
	var singleFares = fareData.singleFares;	

	/**
	 * Calculates the extension fare (or none) of a journey
	 * @function
	 * @param {array} minmaxTravelcard - the min and max zone of the travelcard covered zones, in an array
	 * @param {array} minmaxJourney - the min and max zone of the single journey, in an array
	 * @returns {number} - returns the fare
	 * @description
	 */
	
	var minmaxTravelcard = [3, 4];
	var minmaxJourney = [1, 6];
	extensionFares(minmaxTravelcard, minmaxJourney, singleFares);

//SINGLE FARES NEED TO BE ALTERED TO OFF PEAK OR ON PEAK & preferably a counter on whether a cap was reached
// what about zone 1 to zone 1 exception for off peak>?

// - OYSTER Cheapest Fare
// fetchFareData().then(function(fareData) {
	var dailyCaps = fareData.dailyCaps;
	// var singleFares = fareData.singleFares;

//An array of all the journeys with their max and min zones travelled
	var journeys = [
		[2, 1],
		[1, 2],
		[2, 1],
		[1, 2],
		[2, 4],
		[1, 3],
	];

//cumTotal = the total that updates and becomes the final oyster fare
	var oyCumTotal = null;
//maxZonessofar for each journey updates and is the array of all the zones travelled in so far
	var maxZonesofar = journeys[0];

	journeys.forEach(function(journey) {
		//Gets the maximum zones of all the zones travelled in so far
		maxZonesofar = maxNum(journey.concat(maxZonesofar));

		//Gets the relevant daily cap to that max zone & single fare for that journey
		var maxZoneDailyCap = getDailyCap(maxZonesofar, dailyCaps);
		var single = getSingleFare(journey, singleFares);
	
		//adds the single fare to the cumulative total
		oyCumTotal += single;

		//if the daily cap for the current maximum zone is reached, then the cum total is overriden by the relevant maximum zone daily cap fare
		if (oyCumTotal >= maxZoneDailyCap) {
			oyCumTotal = maxZoneDailyCap;
		}
	});
	//This is the final oyster daily fare calculated:
	// console.log(oyCumTotal);


// - CONTACTLESS Cheapest Fare = 
	//The array of all combination prices to be reduce to cheapest one
	var conAllFares = [];

	// for without any daily caps, only singles added together
	var conFares = null;
	var conSingle = null;
	journeys.forEach(function(journey) {
		conSingle = getSingleFare(journey, singleFares);
		conFares += conSingle;
	});
	conAllFares.push(conFares);

	// 	Then for each Zone range (from Zone 1-3 until Zone 1 to max) repeat same calculation.
	 var conMaxZone = maxNum(flatten(journeys));
	 for (var i = 2; i <= conMaxZone; i++) {
	 	console.log('for daily cap 1 to ' + i);
	 	var conCumTotal = getDailyCap(i, dailyCaps);
	 	 for (var x = 0; x < journeys.length; x++) {
	 	 	//adding extension fares to cumTotal
	 		conCumTotal += extensionFares([1, i], journeys[x], singleFares);
	 	 };
	 	console.log(conCumTotal);

	 	conAllFares.push(conCumTotal);
	 }

	// 	---> Compare all the possibilities and select the cheapest (including total single). 
	var conFinalFare = null;
	conFinalFare = minNum(conAllFares);
	// console.log(conFinalFare);
});

//CONTACTLESS WEEKLY CAP - mixture  of weekly cap and daily cap

//THIS METHOD RELIES ON THE FACT THAT:
//- zone x to x fare is the same as zone x-1 to zone x fare
//- Assumes daily caps always start at zone 1 (else need min single < capped zone IFs)

// Most combos (without a gap between the 2 travelcards) - extension fare as just between:
//----> COULD JUST UPDATE THE MAX ZONE AND USE SAME CALULCATIONS AS DAILY??? min travel = 1
// - maximum zone of daily or travelcard cap + 1 to maximum single zone (if min single <= max zone of daily or travelcard cap & max single > max zone of daily or travelcard cap)
// - OR both within min and maxcapped = free
// - ELSE just both outside capped zones = full fare


// HOWEVER for zone 4-5 weekly and 1-2 daily: have gap of zone 3 and 6 / for zone 4-6 weekly and 1-2 daily: gap of zone 3 / if weekly 5-6 and 1-2 daily: gap 3 and 4 / weekly 5-6 and daily 1-3: gap zone 4
//IF difference between min weekly and max daily cap > 1
// then min gap zone = max daily cap +1 & max gap zone = min weekly gap - 1

//IF min single <= min gap zone && max single >= max gap zone but max single <= max weekly zone
// then charge min to max gap fare
//IF min single zone <= min gap zone && max single > max weekly zone
// then charge cheapest: full fare or max weekly + 1 to max single zone& & gap fare
//IF min single and max single both > max weekly zone (or both < min daily) OR min single zone > min gap zone && max single zone < max gap zone
// then charge single min to single max fare
//ELSE (IF both min and max singles within min and max daily / both min and max singles within min and max weekly)
// then charge 0 - should swap with above

// Remember calculate without any daily caps - should be similar to daily calculations



