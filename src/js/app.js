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
import oysterMonthly from './partials/_oysterMonthly';

import oysterDayTotal from './partials/_oysterDayTotal';
import conDayTotal from './partials/_contactlessDayTotal';

// TO DO
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
  // [
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: true,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 2],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 2],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 2],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 2],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  // ],
  // [
  //    {
  //     zones: [2, 4],
  //     dualZoneOverlap: true,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 2],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 2],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  // ],
  // [
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: true,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 2],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 2],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  // ],
  // [
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: true,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 2],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 2],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  //   {
  //     zones: [2, 4],
  //     dualZoneOverlap: false,
  //     type: "offPeak",
  //   },
  // ],
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


  // console.log(
  //   weekTotal(conDayTotal, days, {
  //     false,
  //     data,
  //   })
  // );

  // console.log(oysterMonthly(days, data)); 

// const journey = [
//     {
//       zones: [3, 3],
//       dualZoneOverlap: true,
//       type: "anytime",
//     },
//     {
//       zones: [3, 3],
//       dualZoneOverlap: false,
//       type: "anytime",
//     },
//     {
//       zones: [3, 3],
//       dualZoneOverlap: false,
//       type: "anytime",
//     },
//     {
//       zones: [3, 3],
//       dualZoneOverlap: false,
//       type: "anytime",
//     },
//         {
//       zones: [3, 3],
//       dualZoneOverlap: false,
//       type: "anytime",
//     },
//     {
//       zones: [3, 3],
//       dualZoneOverlap: false,
//       type: "anytime",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//         {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
    
//         {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
    
//         {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
    
//         {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
    
//         {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//      {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
    
//         {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
    
//         {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
//     {
//       zones: [3, 6],
//       dualZoneOverlap: false,
//       type: "offPeak",
//     },
// ];
const journey = [
    {
      zones: [1, 3],
      dualZoneOverlap: true,
      type: "anytime",
    },
];
//tests for false negatives if anytime is met first and then off peak -- add to test
//but check the calculations work out
  //   console.log(
  //   conDayTotal(
  //     journey,
  //     {

  //     }, {
  //         dailyCaps, //JSON
  //         singleFares
  //       })
  // );
console.log(
              weekTotal(oysterDayTotal, days, {
        options: {
          minTravelcard: 1,
          maxTravelcard: 2,
        },
        data,
      })
              );

//       console.log(
// oysterDayTotal(
//           journey,
//         {

//        }, {
         
//           dailyCaps, //JSON
//           singleFares
//         })
//   );

// console.log(extensionFares({
//         zones: [1, 4],
//         minTravelcard: false,
//         maxTravelcard: false,
//         maxDaily: 1,
//         type: 'anytime',
//       }, singleFares));

});