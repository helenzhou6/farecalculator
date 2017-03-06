/**
 * Calculates the oyster total fare for the day
 * @function
  * @param {complex journeys object} journeys - has zones array, dualzones and type (offpeak or anytime)
 * @param {options object of minTravelcard: num, maxTravelcard: num} const object - minTravelcard and maxTravelcard 
 * @param {data object of dailyCaps (JSON file), singleFares (JSON file link)
 * @returns {object} - object containing {value: returns the total fare & capIsMet: if offPeak cap was met, then displays the max zone for the offPeak daily cap, else false.}
 * @description is capped by off peak daily cap or peak cap (cumulatively) where necessary
 */

import {
  minNum,
  maxNum,
  getFare,
  met,
  zoneToJourney,
  round,
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
    
  const dayTotal = day.reduce(function (a, b) {
    let currentTotal;

    let singleFare = getFare(b.zones, b.type, singleFares);

    // takes the numbers from the previous loop
    let offPeakTotal = a.offPeakTotal;
    let peakTotal = a.peakTotal;

    //the maximum zone travelled in so far is updated with current zones
    let maxZone = maxNum([].concat(a.maxZone, b.zones));

    //in preparation for whether off peak daily cap is met or not (to be passed out within capIsMet)
    let offPeakReachedPre = false;
    let offPeakReached = false;
    let offPeakMaxZone = a.offPeakMaxZone;
    let anytimeReached = false;

    // FOR WEEKLY travelcards - ie if the max travelcard has been passed in, so uses extension fares function to calculate single fare
    if (maxTravelcard) {
      singleFare = extensionFares({
        zones: b.zones,
        type: b.type, minTravelcard, maxTravelcard},
        singleFares);
      
      // dual to dual stations: if min weekly travelcard zone =< max dual zone zone
      // = > then changes dual to dual  stations to min weekly travelcard zone
      if (b.dualZoneOverlap === true &&
        (((minNum(b.zones)) + 1) >= minTravelcard) &&
        (((maxNum(b.zones)) + 1) <= maxTravelcard)
        ) {
        singleFare = 0;
      }
        //(ie only compares against daily cap of minSingle to maxZone - removes overlap with weekly)
      if (minTravelcard > 1 && met(maxTravelcard, maxZone) && met(maxZone, minTravelcard - 1)) {
        maxZone = minTravelcard - 1; 
      }
    }

    currentTotal = a.currentTotal + singleFare;

    // if the current journey made was OFFPEAK
    if (b.type === 'offPeak') {
      //off peak total gets updated and if needed overridden with offpeak daily cap
      if ((offPeakTotal + singleFare) >= getFare(maxZone, 'offPeak', dailyCaps)) {
        offPeakReachedPre = true;
        offPeakTotal = getFare(maxZone, 'offPeak', dailyCaps);
      } else {
        offPeakTotal += singleFare;
      }

      //offPeakTotal = minNum([offPeakTotal + singleFare, getFare(maxZone, 'offPeak', dailyCaps)]);

      // current total is updated if needed to be off peak total + previous peak total for off peak travel
      if ((offPeakTotal + peakTotal) <= currentTotal) {
        //if this condition and the above conditions are both met (ie a current or previousoffpeak daily cap applied to currenttotal), set true
        if (offPeakReachedPre) {
          offPeakReached = true;
          offPeakMaxZone = maxZone;
          // return the max zone for off peak cap
        }
        currentTotal = offPeakTotal + peakTotal;
      }

      //currentTotal = minNum([currentTotal, offPeakTotal + peakTotal]);

    //otherwise for PEAK travel the peak total is updated in preparation for next round
    } else {
      peakTotal += singleFare;
    }

    //if needed current total is totally overridden by anytime daily cap
    if (currentTotal > (getFare(maxZone, 'anytime', dailyCaps))) {
      //if anytime daily cap reached, off peak reached will then be set to false via anytimereached (as anytime applied not off peak cap)
      anytimeReached = true;
      currentTotal = getFare(maxZone, 'anytime', dailyCaps);
    }

    //currentTotal = minNum([currentTotal, getFare(maxZone, 'anytime', dailyCaps)]);
    return {
      // object is returned to be compared 
      currentTotal,
      offPeakTotal,
      peakTotal,
      maxZone,
      offPeakMaxZone,
      //ensures that previous off peak caps applied previous to future loops - if true, stays true
      offPeakReached: (a.offPeakReached && !anytimeReached) ? true : offPeakReached,
    };

  }, {
    currentTotal: 0,
    offPeakTotal: 0,
    peakTotal: 0,
    maxZone: null,
  });

  return {
    // rounds to 2 dp
    value: round(dayTotal.currentTotal, 2),
    capIsMet: dayTotal.offPeakReached ? dayTotal.offPeakMaxZone : false,
  };
}
