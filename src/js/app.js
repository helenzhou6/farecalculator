import {
	getZones, 
	filterZonesByNumber,
	maxNum,
	minNum,
	getDifference,
	flatten,
	journeyToKey,
	getDailyCap,
	getSingleFare,
} from './utility/_utility';

import getData from './utility/_getData';
import getSingleJourneyZones from './partials/_getSingleJourneyZones';
import extensionFaresDaily from './partials/_extensionFares';
// import splitOrFullFare from './partials/_splitOrFullFare';

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

	// EXAMPLE
	var minmaxTravelcard = [3, 4];
	var minmaxJourney = [1, 6];
	console.log(extensionFaresDaily(minmaxJourney[0], minmaxJourney[1], minmaxTravelcard[0], minmaxTravelcard[1], singleFares));

//SINGLE FARES NEED TO BE ALTERED TO OFF PEAK OR ON PEAK & preferably a counter on whether a cap was reached
// what about zone 1 to zone 1 exception for off peak>?

// - OYSTER Cheapest Fare
	var dailyCaps = fareData.dailyCaps;

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
	//oyCumTotal is the final oyster daily fare calculated:


// - CONTACTLESS Cheapest Fare = with daily caps
	//The array of all combination prices to be reduce to cheapest one
	var conAllFares = [];

	// for without any daily caps, only singles added together
	var conFares = null;
	journeys.forEach(function(journey) {
		var conSingle = getSingleFare(journey, singleFares);
		conFares += conSingle;
	});
	conAllFares.push(conFares);

	// 	Then for each Zone range (from Zone 1-3 until Zone 1 to max) repeat same calculation.
	 var conMaxZone = maxNum(flatten(journeys));
	 for (var i = 2; i <= conMaxZone; i++) {
	 	//console.log('for daily cap 1 to ' + i);
	 	var conCumTotal = getDailyCap(i, dailyCaps);
	 	 for (var x = 0; x < journeys.length; x++) {
	 	 	//adding extension fares to cumTotal
	 		conCumTotal += extensionFaresDaily(1, i, journeys[x][0], journeys[x][1], singleFares);
	 	 };
	 	//console.log(conCumTotal);

	 	conAllFares.push(conCumTotal);
	 }

	// 	---> Compare all the possibilities and select the cheapest (including total single). 
	var conFinalFare = null;
	conFinalFare = minNum(conAllFares);
	
	//conFinalFare is final oyster daily fare
});

