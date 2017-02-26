/**
 * Calculates the oyster total fare for the day
 * @function
 * @param {journey} zones and off peak or on peak
 * @param {json data} uses the singleFares json data
 * @returns {number} - returns the total fare
 * @description
 */


// Need set an alert for when reach a Zones 1-4 or Zones 1-6 daily cap, but only travel at off-peak times.

import _ from 'ramda';

import {
  minNum,
  maxNum,
  getCap,
  getSingleFare,
  met,
  zoneToJourney
} from './../utility/_utility';

import extensionFares from './_extensionFares';

export default function oysterDayTotal(options = {}, data = {}) {
  const {
    minTravelcard, //if needed for weekly
    maxTravelcard, //if needed for weekly
  } = options;

  const {
    journeys, //JSON
    dailyCaps, //JSON
    singleFares, //JSON
  } = data;

  const getDailyCap = getCap(_.__, _.__, dailyCaps);
  const capMet = _.compose(met, getDailyCap);
    
  const totals = journeys.reduce(function (a, b) {
    let singleFare;
    let maxZone = maxNum([].concat(a.maxZone, b.zones));
//     FOR WEEKLY
    if ((maxTravelcard) && (maxZone <= maxTravelcard) && (maxZone >= (minTravelcard - 1))) {
      maxZone = minTravelcard - 1; //(ie only compares against daily cap of minSingle to zoneDaily - removes overlap with weekly)
 
      singleFare = extensionFares({zones: [1, 3], type: "anytime", minTravelcard, maxTravelcard,}, singleFares);
    } else {

      singleFare = getSingleFare(b.zones, singleFares, b.type); //b.zones = an array

    }

    // console.log(zoneToJourney(maxZone));
    // debugger;

    const metPeak = capMet(maxZone, 'anytime'); //true or false
    
    const metOffPeak = capMet(maxZone, 'offPeak'); //true or false

    let offPeakTotal;
    let currentTotal = a.currentTotal + singleFare; 

    if (b.type === 'offPeak') {
       offPeakTotal = a.offPeakTotal + singleFare;

      if (metOffPeak(offPeakTotal)) {
        offPeakTotal = getDailyCap(maxZone, 'offPeak'); //and set an alert to say off daily cap reached????!!! (but could be overridden after)
      }

      currentTotal = minNum([offPeakTotal, currentTotal]);
    }

    if (metPeak(currentTotal)) {
      currentTotal = getDailyCap(maxZone, 'anytime');
    }

    return {
      currentTotal,
      offPeakTotal,
      maxZone,
    };
  }, {
    currentTotal: 0,
    offPeakTotal: 0,
    maxZone: null,
  });

  return totals.currentTotal;
}
