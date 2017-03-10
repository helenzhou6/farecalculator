/**
 * Calculates the oyster total fare for the day
 * @function
  * @param {complex journeys object} journeys - has zones array, dualzones and type (offpeak or anytime)
 * @param {options object of minTravelcard: num, maxTravelcard: num} const object - minTravelcard and maxTravelcard 
 * @param {data object of dailyCaps (JSON file), singleFares (JSON file link)
 * @returns {object} - object containing {value: returns the total fare
 // & capIsMet: if offPeak cap was met, then displays the max zone for the offPeak daily cap, else false.}
 * @description is capped by off peak daily cap or peak cap (cumulatively) where necessary
 */

import {
  minNum,
  maxNum,
  getFare,
  zoneToJourney,
  round,
  types,
  dualZone,
  isWithin,
} from './../utility/_utility';

import extensionFares from './_extensionFares';

export default function oysterDayTotal(day, options = {}, data = {}) {

  const {
    minTravelcard,
    maxTravelcard,
  } = options;

  // JSON
  const {
    dailyCaps,
    singleFares,
  } = data;

  const dayTotal = day.reduce(function (a, b) {
    let currentTotal;

    // Types function deals with early/afternoon peak/offpeak handling
    let journeyType = types(b.type);
    let singleFare = getFare(b.zones, journeyType, singleFares);

    // Takes the numbers from the previous loop
    let offPeakTotal = a.offPeakTotal;
    let peakTotal = a.peakTotal;

    // The maximum zone travelled in so far is updated with current zones
    let maxZone = maxNum([].concat(a.maxZone, b.zones));

    // In preparation for whether off peak daily cap is met or not (to be passed out within capIsMet)
    let offPeakReachedPre = false;
    let offPeakReached = false;
    let offPeakMaxZone = a.offPeakMaxZone;
    let anytimeReached = false;

    // FOR WEEKLY travelcards - ie if the max travelcard passed in, extension fares is used to calculate single fare
    if (maxTravelcard) {
      singleFare = extensionFares({
        zones: b.zones,
        type: b.type,
        minTravelcard,
        maxTravelcard
      }, singleFares);
      
      // Dual zone to dual zone journeys dealt with, if travelcard also passed (free if dual zones are within travelcard zones)
      if (b.dualZoneOverlap === true &&
        (isWithin(minTravelcard, ((minNum(b.zones)) + 1), maxTravelcard)) &&
        (isWithin(minTravelcard, ((maxNum(b.zones)) + 1), maxTravelcard))
        ) {
        singleFare = 0;
      }

      // Removes any overlap between weekly travelcard and maxSingle
      // I.e. Compares total against daily cap of minSingle to minTravelcard - 1 rather than maxSingle
      if (minTravelcard > 1 && (isWithin((minTravelcard - 1), maxZone, maxTravelcard))) {
        maxZone = minTravelcard - 1; 
      }
    }

    currentTotal = a.currentTotal + singleFare;

    // If the current journey made was OFFPEAK (or afternoon which is covered by offpeak)
    if (b.type === 'offPeak' || b.type === 'afternoon') {
      // Off peak total gets updated and if needed overridden with offpeak daily cap
      if ((offPeakTotal + singleFare) >= getFare(maxZone, 'offPeak', dailyCaps)) {
        offPeakReachedPre = true;
        offPeakTotal = getFare(maxZone, 'offPeak', dailyCaps);
      } else {
        offPeakTotal += singleFare;
      }

      // Current total is updated if needed becomes off peak total + previous peak total
      if ((offPeakTotal + peakTotal) <= currentTotal) {
        // If this condition and the pre conditions are both met
        // - (ie a current or previous offpeak daily cap applied to currenttotal), return the maxZone for off peak cap
        if (offPeakReachedPre) {
          offPeakReached = true;
          offPeakMaxZone = maxZone;
        }
        currentTotal = offPeakTotal + peakTotal;
      }

    // Otherwise for PEAK travel the peak total is updated in preparation for next round
    } else {
      peakTotal += singleFare;
    }

    // If needed current total is totally overridden by anytime daily cap
    if (currentTotal > (getFare(maxZone, 'anytime', dailyCaps))) {
      // If anytime daily cap reached, off peak reached will then be set to false
      // (as anytime applied not off peak cap)
      anytimeReached = true;
      currentTotal = getFare(maxZone, 'anytime', dailyCaps);
    }

    return {
      // Object is returned to be compared 
      currentTotal,
      offPeakTotal,
      peakTotal,
      maxZone,
      offPeakMaxZone,
      // Ensures that previous off peak caps applies to future loops - if true, stays true
      offPeakReached: (a.offPeakReached && !anytimeReached) ? true : offPeakReached,
    };

  }, {
    currentTotal: 0,
    offPeakTotal: 0,
    peakTotal: 0,
    maxZone: null,
  });

  return {
    // Rounds final total fare to 2 decimal places
    value: round(dayTotal.currentTotal, 2),
    // If the offpeak cap is met, return a variable 'capIsMet' + maxZone of that cap
    capIsMet: dayTotal.offPeakReached ? dayTotal.offPeakMaxZone : false,
  };
}
