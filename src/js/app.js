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

import oysterDayTotal from './partials/_oysterDayTotal';
import conDayTotal from './partials/_contactlessDayTotal';

// TO DO

//MONTHLY - is calendar month - so do (x * 12 )/52?

// daily offpeak/anytime capping changes:
// time of travel to be applied as an arugment: early, morning, afternoon, late
//Travel weekday early  doesnt count towards off peak cap, only anytime but is off peak single fares
// travel weekday (peak time) afternoon counts towards and is covered by the off peak/anytime cap, but is peak single fares
// morning is peak & anytime daily cap / late is off peak & off peak/anytime daily cap

// Add the Railcard or Gold card discount to your Oyster
// CAN DO APPRENTICE, 18+ STUDENT, 16+ ZIP, JOB CENTRE ON OYSTER - as no diff bw off peak / on peak daily caps

// API HANDLING
// getData.stations().then(function (stations) {
// 	getSingleJourneyZones('1000029', '1000138', stations).then((resp) => {
// 		// console.log(resp);
// 	});
// });

getData.fares().then(function(data) {
  let singleFares = data.singleFares;
  let dailyCaps = data.dailyCaps;

 const days = [
  [
    {
      zones: [2, 6],
      dualZoneOverlap: true,
      type: "offPeak",
    },
    {
      zones: [2, 6],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 6],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 6],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 6],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 6],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 6],
      dualZoneOverlap: false,
      type: "offPeak",
    },
        {
      zones: [2, 6],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 6],
      dualZoneOverlap: false,
      type: "offPeak",
    },
  ],
  [
    {
      zones: [2, 4],
      dualZoneOverlap: true,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
  ],
  [
     {
      zones: [2, 4],
      dualZoneOverlap: true,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
  ],
  [
    {
      zones: [2, 4],
      dualZoneOverlap: true,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
  ],
  [
    {
      zones: [2, 4],
      dualZoneOverlap: true,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
  ],
  [
    {
      zones: [2, 4],
      dualZoneOverlap: true,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
  ],
    [
    {
      zones: [2, 4],
      dualZoneOverlap: true,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 2],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
    {
      zones: [2, 4],
      dualZoneOverlap: false,
      type: "offPeak",
    },
  ],
 
];

  // console.log(
  //   "contactless = " + contactless(days, data)
  // );

  // // final cheapest weekly charge on oyster
  // console.log(
  //   oyster(days, data)
  // );


  console.log(
    weekTotal(conDayTotal, days, {
      false,
      data,
    })
  );

// const journey = [
//     {
//       zones: [2, 4],
//       dualZoneOverlap: true,
//       type: "offPeak",
//     },
//     {
//       zones: [2, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [2, 2],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [2, 4],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [2, 4],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [2, 4],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [2, 4],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
// //also tests for all offpeak, all anytime, most anytime 1 offpeak & vice versa, 2-4 zone first and last
//   ];

//     console.log(
//     conDayTotal(
//       journey,
//       {

//       }, {
//           dailyCaps, //JSON
//           singleFares
//         })
//   );

//       console.log(
// oysterDayTotal(
//           journey,
//         {

//        }, {
         
//           dailyCaps, //JSON
//           singleFares
//         })
//   );



});