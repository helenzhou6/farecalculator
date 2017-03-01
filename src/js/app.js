import {
	maxNum,
	minNum,
	flatten,
  getFare,
	met,
  keyToJourney
} from './utility/_utility';

import getData from './utility/_getData';
import getSingleJourneyZones from './partials/_getSingleJourneyZones';
import extensionFares from './partials/_extensionFares';
import oyster from './partials/_oyster';
import conDayTotal from './partials/_contactlessDayTotal';

// TO DO
// Offpeak daily cap discounts - keep track when daily cap reached but only travelled off peak (if going to do off peak oyster cum totals then would know this)
// Add the Railcard or Gold card discount to your Oyster
// CAN DO APPRENTICE, 18+ STUDENT, 16+ ZIP, JOB CENTRE ON OYSTER - as no diff bw off peak / on peak daily caps

// getData.stations().then(function (stations) {
// 	getSingleJourneyZones('1000029', '1000138', stations).then((resp) => {
// 		// console.log(resp);
// 	});
// });

getData.fares().then(function(fareData) {
  let singleFares = fareData.singleFares;
  let dailyCaps = fareData.dailyCaps;

const days = [
  [
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "anytime",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "anytime",
    },
  ],
  [
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "anytime",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "anytime",
    },
  ],
  [
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "anytime",
    },
  ],
  [
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "anytime",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "anytime",
    },
  ],
  [
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "anytime",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "anytime",
    },
  ],
  [
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "anytime",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "anytime",
    },
  ],
  [
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [1, 2],
      dualZoneOverlap: false,
      type: "anytime",
    },
  ],
];

  // console.log(
  //   oyster(days, fareData)
  // );
    const y = days.map((day) => {
      return conDayTotal(day, fareData);
    });
    
  console.log(y);
});

//---------------------------------
// - CONTACTLESS Cheapest Fare = with daily caps
	//The array of all combination prices to be reduce to cheapest one

// FOR EACH WEEKLY: loop over possibility -
// use extension Fares (using travelcards (and) max daily)
// select cheapest out of no daily cap, or combo of each daily cap
//---> Compare all the possibilities and select the cheapest (including total single).
// OFF PEAK DAILY and WEEKLY: For off peak daily cap combos: if off peak,
// use extension fares to calculate using both daily and weekly caps
// --- whilst if peak travel then use extension fares with only weekly travel card caps and add to total
// ANYTIME DAILY and WEEKLY: use the extension fare to calculate all fares
// with daily anytime cap and weekly cap (current set up)

