/**
 * Calculates the contactless total fare for the day
 * This calculates the cheapest daily cap or no daily cap for each day taking into consideration any weekly caps passed in
 * @function
 * @param { day object} day object containing all the journey objects (that in turn has zones array, dualzones and type (offpeak or anytime))
 * @param {options object of minTravelcard: num, maxTravelcard: num} const object - minTravelcard and maxTravelcard
 * @param {data object of dailyCaps (JSON file), singleFares (JSON file link)
 * @returns {object} - object containing {value: returns the total fare
 //& capIsMet: if offPeak cap was met, then displays the max zone for the offPeak daily cap, else false.}
 * @description Works out if it is cheapest to have no daily caps, an off peak daily cap + peak fares or an anytime cap (taking into account weekly travelcards passed in)
 */

import {
  keysToJourney,
  maxNum,
  minNum,
  getFare,
  round,
  types,
} from './../../utility/_utility';

import extensionFares from './_extensionFares';

export default function conDayTotal(day, options = {}, data = {}) {
  // If weekly minTravelcard or maxTravelcard passed in,
  // then taken into account when working out single fares
  // If not passed in = false
  const {
    minTravelcard,
    maxTravelcard,
  } = options;

  // JSON
  const {
    dailyCaps,
    singleFares,
  } = data;

  const allDailyCaps = keysToJourney(dailyCaps);

  // Sorts out dual to dual zone overlap
  function dualZoneOverlap(journey) {
    return maxTravelcard && journey.dualZoneOverlap === true &&
      (((minNum(journey.zones)) + 1) >= minTravelcard) &&
      (((maxNum(journey.zones)) + 1) <= maxTravelcard);
  }

  // Filters the days so only the days with journeys inside are passed
  const validDays = day.filter(j => !dualZoneOverlap(j));

  // 1. Calculates the cheapest fare if a daily anytime cap is applied
  // -- returns an array (a fare for each possible daily cap)
  const cheapestAnytime = allDailyCaps.map((cap) => {
    const total = validDays.map((journey) => {

      // Uses extension fares (with anytime cap passed)
      // to calculate the single fare for each journey
      return extensionFares({
        minTravelcard,
        maxTravelcard,
        maxDaily: maxNum(cap),
        zones: journey.zones,
        type: types(journey.type),
      }, singleFares);

      // Adds all the single fares for that day together
    }).reduce((a, b) => a + b, 0);

    // Adds together the relevant anytime cap fare with the total day fare
    return total + getFare(cap, 'anytime', dailyCaps);
  });

  // 2. Calculates the cheapest fare if a daily offpeak cap
  // is applied with anytime journeys as additional charges
  // -- returns an object (a fare for each possible daily cap and the max zone of each off peak cap)
  const cheapestOffPeak = allDailyCaps.map((cap) => {
    const offPeakDayTotal = validDays.map((journey) => {
      // If 'offPeak' journey is made, then can be capped by the current daily offPeak cap
      // -- thus maxDaily is passed in (as the daily off peak cap),
      // else false = single fare w/o daily cap
      let maxDaily = false;

      if (journey.type === 'offPeak' || journey.type === 'afternoon') {
        maxDaily = maxNum(cap);
      }

      return extensionFares({
        minTravelcard,
        maxTravelcard,
        maxDaily,
        zones: journey.zones,
        type: types(journey.type),
      }, singleFares);

      // Adds all the single fares for that day together
    }).reduce((a, b) => a + b, 0);

    // Adds together the relevant offpeak cap fare with the total day fare
    return {
      offPeakMaxZone: maxNum(cap),
      value: offPeakDayTotal + getFare(cap, 'offPeak', dailyCaps),
    };
  });

  // 3. Calculates if no daily caps are applied
  // -- returns the single number
  const cheapestNoCap = validDays.map((journey) => {
    return extensionFares({
      minTravelcard,
      maxTravelcard,
      zones: journey.zones,
      type: types(journey.type),
    }, singleFares);
  }).reduce((a, b) => a + b, 0);

  // From the off peak object: creates an array of the cheapestOffPeak values
  const cheapestOffPeakValues = cheapestOffPeak.map((lVal) => lVal.value);

  // Gets the cheapest value/fare from all 3 different calculation results = cheapest day total
  const cheapestDayTotal = minNum(cheapestAnytime.concat([cheapestNoCap], cheapestOffPeakValues));

  // Evaluates to see if any of the cheapestOffPeak values is equal to the cheapest day total
  const isEq = cheapestOffPeak.some(entry => entry.value == cheapestDayTotal);

  // If above is true, then finds the max cap within the object
  // that matches with the cheapest day total number
  const capVal = isEq ? cheapestOffPeak.filter((lVal) => lVal.value === cheapestDayTotal) : null;

  return {
    // Rounds final cheapest day total fare to 2 decimal places
    value: round(cheapestDayTotal, 2),
    // If the offpeak cap was met, return a variable 'capIsMet' + maxZone of that cap
    capIsMet: capVal ? capVal[0].offPeakMaxZone : false,
  };
}
