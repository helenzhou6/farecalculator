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
import contactless from './partials/_contactless';
import weekTotal from './partials/_weekTotal';

import contactlessDayTotal from './partials/_contactlessDayTotal';

// TO DO
// Offpeak daily cap discounts - keep track when daily cap reached but only travelled off peak 

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

// const days = [
//   [
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "anytime",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "anytime",
//     },
//   ],
//     [
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "anytime",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "anytime",
//     },
//   ],
//   [
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "anytime",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "anytime",
//     },
//   ],
//   [
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "anytime",
//     },
//   ],
//   [
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "anytime",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "anytime",
//     },
//     ],
//     [
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "anytime",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "anytime",
//     },
//   ],
//   [
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "anytime",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: true,
//       type: "offPeak",
//     },
//     {
//       zones: [1, 2],
//       dualZoneOverlap: false,
//       type: "anytime",
//     },
//   ],
 
// ];

//   console.log(
//     contactless(days, fareData)
//   );

  // final cheapest weekly charge on oyster
  // console.log(
  //   oyster(days, fareData)
  // );

  const journey = [
    {
      zones: [2, 2],
      dualZoneOverlap: true,
      type: "anytime",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "anytime",
    },
  ];

    console.log(
    contactlessDayTotal(
      journey,
      {
        minTravelcard: 3,
        maxTravelcard: 4,
      }, {
          dailyCaps, //JSON
          singleFares
        })
  );

    
});