/**
 * Calculates the oyster total fare for the day
 * @function
  * @param {complex journeys object} journeys - has zones array, dualzones and type (offpeak or anytime)
 * @param {options object of minTravelcard: num, maxTravelcard: num} const object - minTravelcard and maxTravelcard 
 * @param {data object of dailyCaps (JSON file), singleFares (JSON file link)
 * @returns {number} - returns the total fare
 * @description
 */

import {
  minNum,
  maxNum,
  getFare,
  met,
  zoneToJourney
} from './../utility/_utility';

import extensionFares from './_extensionFares';

export default function oysterDayTotal(day, options = {}, data = {}) {

  const {
    minTravelcard, //if needed for weekly
    maxTravelcard, //if needed for weekly
  } = options;

  const {
    dailyCaps, //JSON
    singleFares, //JSON
  } = data;
    
  return day.reduce(function (a, b) {
    let currentTotal;
    let singleFare = getFare(b.zones, b.type, singleFares);
    let offPeakTotal = a.offPeakTotal;
    let peakTotal = a.peakTotal;
    let maxZone = maxNum([].concat(a.maxZone, b.zones));

    // FOR WEEKLY
    if (maxTravelcard) {
      singleFare = extensionFares({zones: b.zones, type: b.type, minTravelcard, maxTravelcard}, singleFares);

      if (minTravelcard > 1 && met(maxTravelcard, maxZone) && met(maxZone, minTravelcard - 1)) {
        maxZone = minTravelcard - 1; //(ie only compares against daily cap of minSingle to maxZone - removes overlap with weekly)
      }
    }

    currentTotal = a.currentTotal + singleFare;

    if (b.type === 'offPeak') {
      offPeakTotal = minNum([offPeakTotal + singleFare, getFare(maxZone, 'offPeak', dailyCaps)]);
      currentTotal = minNum([currentTotal, offPeakTotal + peakTotal]);
    } else {
      peakTotal += singleFare;
    }
      
    currentTotal = minNum([currentTotal, getFare(maxZone, 'anytime', dailyCaps)]);

    return {
      currentTotal,
      offPeakTotal,
      peakTotal,
      maxZone,
    };

  }, {
    currentTotal: 0,
    offPeakTotal: 0,
    peakTotal: 0,
    maxZone: null,
  }).currentTotal;
}
