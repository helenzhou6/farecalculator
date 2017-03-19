import {
	maxNum,
	minNum,
	flatten,
  getFare,
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
import ui from './ui';

ui();

// API HANDLING
// getData.stations().then(function (stations) {
// 	getSingleJourneyZones('1000029', '1000138', stations).then((resp) => {
// 		// console.log(resp);
// 	});
// });

// SHOULD MAP OVER JSON TO FIND THE ZONES WITH OFF PEAK DISCOUNT rather than add 4, 5 and 6 for weekTotal

//Off-peak fares apply at all other times and if you travel from a station outside Zone 1
//-- to a station in Zone 1 between 16:00 and 19:00, Mondays to Fridays 
getData.fares().then(function(data) {
  let singleFares = data.adult.singleFares;
  let dailyCaps = data.adult.dailyCaps;

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

// JSON that varies: offPeak PAYG, peak PAYG, travelcards
const dataOyster = data.adult;
// --> If job centre plus dicounts on adult (adult child-jobless) OR 16+ zip oyster photocard (child-jobless none): data.halfOff
// --> If adult + national railcards (adult + railcard): Object.assign({}, data.adult, data.thirdOffPeakPAYG);
// --> If adult + disabled persons (adult + disabled): Object.assign({}, data.adult, data.thirdAnytimePAYG);
// --> If 18+ student (student + none): thirdTravelcards + adult PAYG : Object.assign({}, data.adult, data.thirdTravelcards);
// --> If 18+ + national railcards (student + railcard): Object.assign({}, data.thirdOffPeakPAYG, data.thirdTravelcards);
// --> If 18+ + disabled persons (student + disabled): Object.assign({}, data.thirdAnytimePAYG, data.thirdTravelcards);
// ELSE data.adult

  console.log(
    "contactless = " + contactless(days, data.adult)
  );

  // console.log(
  //   oysterMonthly("3-6", 39.8, data.adult)
  // );
   console.log(
    oyster(days, dataOyster)
  );


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
  // const journey = [
  //   {
  //     zones: [2, 2],
  //     dualZoneOverlap: true,
  //     type: "anytime",
  //   },
  //   {
  //     zones: [2, 2],
  //     dualZoneOverlap: true,
  //     type: "anytime",
  //   },
  // ];

  //   console.log(
  //   conDayTotal(
  //     journey,
  //     {

  //     }, {
  //         dailyCaps, //JSON
  //         singleFares
  //       })
  // );
// console.log(
//               weekTotal(oysterDayTotal, days, {
//         options: {
//           minTravelcard: 1,
//           maxTravelcard: 2,
//         },
//         data,
//       })
//               );

  //     console.log(
  //       oysterDayTotal(
  //         journey,
  //       {
  //       minTravelcard: 4,
  //       maxTravelcard: 5,
  //      }, {
          
  //         dailyCaps, //JSON
  //         singleFares
  //       })
  // );

// console.log(extensionFares({
//         zones: [1, 4],
//         minTravelcard: false,
//         maxTravelcard: false,
//         maxDaily: 1,
//         type: 'anytime',
//       }, singleFares));

});