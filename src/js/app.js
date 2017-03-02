import {
	maxNum,
	minNum,
	flatten,
  getFare,
	met,
  keysToJourney,
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

const weeklyCaps = keysToJourney(fareData.weeklyCaps);

const final = weeklyCaps.map((weekCap) => {
    const y = conDayTotal(
      days, minNum(weekCap), maxNum(weekCap), fareData).reduce((a, b) => a + b
    );
    return y + getFare(weekCap, false, fareData.weeklyCaps);// 
})
  console.log(minNum(final));

  // console.log(
  //   oyster(days, fareData)
  // );
  //   const y = days.map((day) => {
  //     return conDayTotal(day, fareData);
  //   });

  // console.log(y);
});