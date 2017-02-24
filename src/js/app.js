import {
	maxNum,
	minNum,
	flatten,
	getDailyCap,
	getSingleFare,
} from './utility/_utility';

import getData from './utility/_getData';
import getSingleJourneyZones from './partials/_getSingleJourneyZones';
import extensionFares from './partials/_extensionFares';
import oysterDayTotals from './partials/_oysterDayTotal';

// TO DO
// Off peak vs on peak singles (esp including out of zone 1 to zone 1 in evening is offpeak exception)
// Offpeak daily cap discounts - keep track when daily cap reached but only travelled off peak (if going to do off peak oyster cum totals then would know this)
// possibility of altering oyster so reflects off peak -- then could add  the Railcard or Gold card discount to your Oyster and 1-8  zones or to 9 without watford
// CAN DO APPRENTICE, 18+ STUDENT, 16+ ZIP, JOB CENTRE ON OYSTER - as no diff bw off peak / on peak daily caps
// NB Weekly capping is always anytime & daily capping always starts at zone 1

// getData.stations().then(function (stations) {
// 	getSingleJourneyZones('1000029', '1000138', stations).then((resp) => {
// 		// console.log(resp);
// 	});
// });

// getData.fares().then(function(fareData) {
//   let singleFares = fareData.singleFares;
//   let dailyCaps = fareData.dailyCaps;

//   const journeys = [
//     {
//       zones: [1, 6],
//       dualZoneOverlap: false,
//       peak: false,
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       peak: false,
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       peak: false,
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       peak: false,
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       peak: false,
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       peak: false,
//     },
//   ];
// });


// //---------------------------------
// // - CONTACTLESS Cheapest Fare = with daily caps
// 	//The array of all combination prices to be reduce to cheapest one
// 	let conAllFares = [];

// 	// for without any daily caps, only singles added together
// 	let conFares = null;
// 	journeys.forEach(function(journey) {
// 		conFares += getSingleFare(journey.zones, singleFares);
// 	});
// 	conAllFares.push(conFares);

// 	// 	Then for each Zone range (from Zone 1-3 until Zone 1 to max) repeat same calculation.
// 	 let conMaxZone = maxNum(flatten(journeys.map(j => j.zones)));
// 	 for (let i = 2; i <= conMaxZone; i++) {
// 	 	//console.log('for daily cap 1 to ' + i);
// 	 	let conCumTotal = getDailyCap(i, dailyCaps);
// 	 	 for (let x = 0; x < journeys.length; x++) {
// 	 	 	//adding extension fares to cumTotal
// 	 		conCumTotal += extensionFares(1, i, journeys[x][0], journeys[x][1], singleFares);
// 	 	 };
// 	 	conAllFares.push(conCumTotal);
// 	 }

// 	// 	---> Compare all the possibilities and select the cheapest (including total single).
// 	return minNum(conAllFares);
// 	//this returns the final contactless daily fare
// });

//CONTACTLESS
//For just daily caps OR weekly cap without daily cap: use extension fares without max daily
//For combo of daily cap and weekly cap: use extension fares with max daily cap
//
// OFF PEAK DAILY and WEEKLY: For off peak daily cap combos: if off peak, use extension fares to calculate using both daily and weekly caps
// --- whilst if peak travel then use extension fares with only weekly travel card caps and add to total
// ANYTIME DAILY and WEEKLY: use the extension fare to calculate all fares with daily anytime cap and weekly cap (current set up)

