/**
 * Calculates the cheapest weekly cap (based on monthly or weekly)
 * @function
 * @param {object days} complex object containing array of days,
      and within each day an object for each journey
 * @param {data object} of dailyCaps (JSON file), singleFares (JSON file link)
 * @returns {number} - the cheapest weekly charge rounded to 2 dp
 * @description
 */

import {
  journeyToKey,
  keysToJourney,
  maxNum,
  minNum,
} from './../../utility/_utility';

import oysterDayTotal from './_oysterDayTotal';
import weekTotal from './_weekTotal';

export default function oysterCapPre(days, data) {
  // Monthly is based on each calendar month: *12 months / 52 weeks
  // Calculates the cost of the week cap based on the monthly cap
  const allCaps = keysToJourney(data.weeklyCaps);

  // 2. For each possible weekly cap
  return allCaps.map((eachCap) => {
    const weekTotl = weekTotal(oysterDayTotal, days, {
      options: {
        minTravelcard: minNum(eachCap),
        maxTravelcard: maxNum(eachCap),
      },
      data,
    });
    return {
      [journeyToKey(eachCap)]: weekTotl,
    };
  });
}
