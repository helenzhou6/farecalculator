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
// do more tests

//MONTHLY - NB is that 4 weeks or 31/30 days or calendar month?

// daily offpeak/anytime capping changes:
// time of travel to be applied as an arugment: early, morning, afternoon, late
//Travel weekday early  doesnt count towards off peak cap, only anytime but is off peak single fares
// travel weekday (peak time) afternoon counts towards and is covered by the off peak/anytime cap, but is peak single fares
// morning is peak & anytime daily cap / late is off peak & off peak/anytime daily cap

//automatic off peak weekly refunds:
  // week function to see if off peak cap met and max zone between 4-6: if true for 2+ a week, apply a discount

// Add the Railcard or Gold card discount to your Oyster
// CAN DO APPRENTICE, 18+ STUDENT, 16+ ZIP, JOB CENTRE ON OYSTER - as no diff bw off peak / on peak daily caps

// API HANDLING
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
//       time: "morning",
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
    conDayTotal(
      journey,
      {
        minTravelcard: 3,
        maxTravelcard: 4,
      }, {
          dailyCaps, //JSON
          singleFares
        })
  );

      console.log(
oysterDayTotal(
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