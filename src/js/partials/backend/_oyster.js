/**
 * Calculates the oyster total fare for the week
 * @function
 * @param {object days} complex object containing array of days, and within each day an object for each journey
 * @param {data object of dailyCaps (JSON file), singleFares (JSON file link)
 * @returns {object} value: - the cheapest weekly charge rounded to 2 dp
 // and cap: the weekly cap applied (if any)
 * @description calculates whether it is cheapest to have a weekly travelcard or none
 */

import {
  keyToJourney,
  getFare,
  round,
} from './../../utility/_utility';

import oysterDayTotal from './_oysterDayTotal';
import oysterCapPre from './_oysterCapPre';
import weekTotal from './_weekTotal';

export default function oyster(days, data) {
  // 1. If no weekly cap is passed in
  const noCapResult = {
    noCap: weekTotal(oysterDayTotal, days, {
      options: {
        minTravelcard: false,
        maxTravelcard: false,
      },
      data,
    }),
  };

  // WEEKLY CAPS AND MONTHLY CAPS NEED TO HAVE THE SAME 1-2 ETC TRAVELCARD ZONES.

  // 2a) for each possible travelcard key (e.g. 1,2 and 3.4 etc) -- works out extension fares essentially
  const calculatedData = oysterCapPre(days, data);

  // 2b) Loops over each travelcard key and adds the fare for the travelcard
  const weeklyCap = calculatedData.map((eachCap) => {
    const valKey = Object.keys(eachCap)[0];
    return {
      [valKey]: eachCap[valKey] + getFare(keyToJourney(valKey), false, data.weeklyCaps),
    };
  });

  const monthlyCap = calculatedData.map((eachCap) => {
    const valKey = Object.keys(eachCap)[0];
    return {
      [valKey]: eachCap[valKey] + ((getFare(keyToJourney(valKey), false, data.monthlyCaps) * 12) / 52),
    };
  });

  const calCheapest = (capType) => {
    // Adds noCap and each weekly cap object into one object of all possible weekly total fares
    const allCaps = Object.assign({}, noCapResult, ...capType);

    // Loops this object to find the cheapest week total
    const cheapestCap = Object.keys(allCaps).reduce((a, b) => (allCaps[a] < allCaps[b] ? a : b));
    // Returns object: the cheapest weekly cap associated and the cheapest weekly total (rounded to 2 dp)
    const weeklyValue = round((allCaps[cheapestCap]), 2);

    return {
      cap: cheapestCap,
      weeklyValue,
    };
  };

  return {
    weeklyCap: calCheapest(weeklyCap),
    monthlyCap: calCheapest(monthlyCap),
  };
}
