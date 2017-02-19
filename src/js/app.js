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

//TO DO
//Off peak vs on peak singles (esp including out of zone 1 to zone 1 in evening is offpeak exception)
//Offpeak daily cap discounts - keep track when daily cap reached but only travelled off peak (if going to do off peak oyster cum totals then would know this)
//possibility of altering oyster so reflects off peak -- then could add  the Railcard or Gold card discount to your Oyster and 1-8  zones or to 9 without watford
//CAN DO APPRENTICE, 18+ STUDENT, 16+ ZIP, JOB CENTRE ON OYSTER - as no diff bw off peak / on peak daily caps
//NB Weekly capping is always anytime

getData.stations().then(function(stations) {
	getSingleJourneyZones('1000029', '1000138', stations).then((resp) => {
		// console.log(resp);
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

  console.log(
    extensionFares({
      minSingle: minmaxJourney[0],
      maxSingle: minmaxJourney[1],
      maxDaily: 2,
      minTravelcard: minmaxTravelcard[0],
      maxTravelcard: minmaxTravelcard[1],
    }, singleFares)
  );

  console.log(
    extensionFares({
      minSingle: minmaxJourney[0],
      maxSingle: minmaxJourney[1],
      // maxDaily: 2,
      minTravelcard: minmaxTravelcard[0],
      maxTravelcard: minmaxTravelcard[1],
    }, singleFares)
  );

// - OYSTER Daily Caps
	var dailyCaps = fareData.dailyCaps;

	const journeys = [
		{
			zones: [2, 1],
      dualZoneOverlap: false,
      peak: true,
		},
    {
      zones: [3, 2],
      dualZoneOverlap: false,
      peak: false,
    },
    {
      zones: [2, 1],
      dualZoneOverlap: false,
      peak: false,
    },
    {
      zones: [2, 1],
      dualZoneOverlap: false,
      peak: false,
    },
    {
      zones: [4, 2],
      dualZoneOverlap: false,
      peak: false,
    },
    {
      zones: [1, 3],
      dualZoneOverlap: false,
      peak: true,
    }
	];

	var oyCumPeakTotal = 0;
	var oyCumOffTotal = 0;
  var oyCumTotal = 0;
	var maxZoneSoFar = null;

	journeys.forEach(function(journey) {

    //Gets the maximum zones of alls the zones travelled in so far
    // maxZoneSoFar = (journey.zones.max > maxZoneSoFar ? journey.zones.max : maxZoneSoFar);
    maxZoneSoFar = maxNum([].concat(journey.zones, maxZoneSoFar));

    if (journey.peak) {
      //Gets the relevant daily cap to that max zone & single fare for that journey
      var maxZoneAnyDailyCap = getDailyCap(maxZoneSoFar, dailyCaps);
      var single = getSingleFare(journey.zones, singleFares); //FOR PEAK PAYG RATES

      //adds the single fare to the cumulative total
      oyCumPeakTotal += single;
      oyCumOffTotal += single;

      //if the daily cap for the current maximum zone is reached, then the cum total is overriden by the relevant maximum zone daily cap fare
      if (oyCumPeakTotal >= maxZoneAnyDailyCap) {
        oyCumPeakTotal = maxZoneAnyDailyCap;
      }
			oyCumTotal += minNum([oyCumPeakTotal, oyCumOffTotal]);
    } else {
      //Gets the relevant daily cap to that max zone & single fare for that journey
      var maxZoneOffDailyCap = getDailyCap(maxZoneSoFar, dailyCaps);
      var maxZoneAnyDailyCap = getDailyCap(maxZoneSoFar, dailyCaps);
      var single = getSingleFare(journey.zones, singleFares); //FOR OFF PEAK PAYG rates

      //adds the single fare to the cumulative total
      oyCumPeakTotal += single;
      oyCumOffTotal += single;

      //if the daily cap for the current maximum zone is reached, then the cum total is overriden by the relevant maximum zone daily cap fare
      if (oyCumPeakTotal >= maxZoneAnyDailyCap) {
        oyCumPeakTotal = maxZoneAnyDailyCap;
      }
      if (oyCumOffTotal >= maxZoneOffDailyCap) {
        oyCumOffTotal = maxZoneOffDailyCap; //and set an alert to say off daily cap reached????!!! (but could be overridden after)
			}
      oyCumTotal += minNum([oyCumPeakTotal, oyCumOffTotal]);
		}

	});
	//oyCumTotal is the final oyster daily fare calculated:

// OYSTER WEEKLY CAP
	//ALL THE DIFFERENT COMBINATIONS OF WEEKLY CAPS with extension fares -- weekly always anytime
	// Oyster deals with whole journeys when mixing daily cap and weekly - cuts off weekly part but not daily & cum total calc

	// For each possible weekly cap:
	// for each journey, use extension fares to calculate the single fare (off peak or on peak).
	// If max zone travelled so far <= max weekly cap && max zone so far => min weekly -1 , then set zone X to min weekly - 1 / else if max zone so far < min weekly - 2 or max zone so fare > max weekly, set zone X as max zone so far
	// Then use similar to daily capping: add this single fare to cum total peak or off peak, compare to daily cap of max zone X and cap where needed
	//Need set an alert for when reach a Zones 1-4 or Zones 1-6 daily cap, but only travel at off-peak times.

	// To generate possible weekly caps (! remember to do without any weekly caps too)
	// var possWeeklyCombos =[];
	// for (m = 1, m < 7, m++) {
	// 	for (x = 2, x < 7, x++) {
   //    possWeeklyCombos.push([m, x]);
	// 	}
  // };

// - CONTACTLESS Cheapest Fare = with daily caps
	//The array of all combination prices to be reduce to cheapest one
	var conAllFares = [];

	// for without any daily caps, only singles added together
	var conFares = null;
	journeys.forEach(function(journey) {
		var conSingle = getSingleFare(journey.zones, singleFares);
		conFares += conSingle;
	});
	conAllFares.push(conFares);

	// 	Then for each Zone range (from Zone 1-3 until Zone 1 to max) repeat same calculation.
	 var conMaxZone = maxNum(flatten(journeys.map(j => j.zones)));
	 for (var i = 2; i <= conMaxZone; i++) {
	 	//console.log('for daily cap 1 to ' + i);
	 	var conCumTotal = getDailyCap(i, dailyCaps);
	 	 for (var x = 0; x < journeys.length; x++) {
	 	 	//adding extension fares to cumTotal
	 		conCumTotal += extensionFares(1, i, journeys[x][0], journeys[x][1], singleFares);
	 	 };
	 	conAllFares.push(conCumTotal);
	 }

	// 	---> Compare all the possibilities and select the cheapest (including total single).
	var conFinalFare = minNum(conAllFares);
	//conFinaFare is final contactless daily fare
});

//CONTACTLESS WEEKLY
//IF difference between min weekly and max daily cap > 1 -- THEN THERE ARE GAP ZONES AND SO USE extensionFaresWeekly
// otherwise use extensionFares and set min travelcard = 1, max travecard = max zone of either daily or weekly cap.

// OFF PEAK DAILY and WEEKLY: For off peak daily cap combos: if off peak, use extension fares to calculate using both daily and weekly caps
// --- whilst if peak travel then use extension fares with only weekly travel card caps and add to total
// ANYTIME DAILY and WEEKLY: use the extension fare to calculate all fares with daily anytime cap and weekly cap (current set up)





