/**
 * Calculates the oyster total fare for the day
 * @function
 * @param {journey} zones and off peak or on peak
 * @param {json data} uses the singleFares json data
 * @returns {number} - returns the total fare
 * @description
 */


// and single fare is calculated uusing extensionFare function instead
// Need set an alert for when reach a Zones 1-4 or Zones 1-6 daily cap, but only travel at off-peak times.

import _ from 'lodash/fp';
import treis from 'treis';

import {
  minNum,
  maxNum,
  getCap,
  getSingleFare,
  met,
} from './../utility/_utility';

import extensionFares from './_extensionFares';


export default function oysterDayTotal(data = {}, singleFares) {
  let {
    journeys,
    dailyCaps, //JSON
    // minTravelcard, //if needed for weekly
    // maxTravelcard, //if needed for weekly
  } = data;


  const getDailyCap = getCap(_, _, dailyCaps); // WTF
   const capMet = _.compose(met, getDailyCap); //WTF
    
  const totals = journeys.reduce(function (a, b) {

    // if (maxTravelcard) { for weekly

    //   const singleFare = extensionFares({
    //     zones: b.zones,
    //     minTravelcard, //since same naming, shorthand for "minTravelcard": minTravelcard;
    //     maxTravelcard,
    //     type: b.type,
    //   }, singleFares);

    // } else {
      
      const singleFare = getSingleFare(b.zones, singleFares, b.type); //b.zones = an array
    // }

    let maxZone = maxNum([].concat(a.maxZone, b.zones));
//     FOR WEEKLY
    // if ((maxTravelcard) && (maxZone <= maxTravelcard) && (maxZone >= (minTravelcard - 1))) {
    //   maxZone = minTravelcard -1; //(ie only compares against daily cap of minSingle to zoneDaily - removes overlap with weekly)
    // }

    const metDailyCap = capMet(maxZone, 'anytime'); //true or false

    let peakTotal = a.peakTotal + singleFare;
    let offPeakTotal = a.offPeakTotal + singleFare;

    //if OFF peak travel and the OFF PEAK daily cap for current maximum zone is reached, then the cum total is overriden by the relevant maximum zone daily cap fare
    // if (b.type === 'offPeak' && metDailyCap(offPeakTotal)) {
    //   debugger;
    //   offPeakTotal = getDailyCap(maxZone, 'offPeak'); //and set an alert to say off daily cap reached????!!! (but could be overridden after)
    // }

    //if the daily cap for the current maximum zone is reached, then the cum total is overriden by the relevant maximum zone daily cap fare
  
    if (metDailyCap(peakTotal)) {
      peakTotal = getDailyCap(maxZone, 'anytime');
    }

    return {
      peakTotal,
      offPeakTotal,
      maxZone,
    };
  }, {
    peakTotal: 0,
    offPeakTotal: 0,
    maxZone: null,
    // type: null,
  });

  return minNum([totals.peakTotal, totals.offPeakTotal]);
}
