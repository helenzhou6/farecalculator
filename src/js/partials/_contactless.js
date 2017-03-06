/**
 * Calculates the contactless total fare for the week
 * @function
 * @param {object days} complex object containing array of days, and within each day an object for each journey
 * @param {data object of dailyCaps (JSON file), singleFares (JSON file link)
 * @returns {number} - the cheapest weekly charge rounded to 2 dp
 * @description calculates whether it is cheapest to have a weekly travelcard or none
 */

 import {
  keysToJourney,
  maxNum,
  minNum,
  getFare,
  round,
} from './../utility/_utility';

import conDayTotal from './_contactlessDayTotal';
import weekTotal from './_weekTotal';

export default function contactless(days, data) {
	const weeklyCaps = keysToJourney(data.weeklyCaps);
  // maps over all the possible weekly caps and returns the array of weekly cap + cheapest daily cap (or no daily cap)
 	const final = weeklyCaps.map((weekCap) => {
      const weekTotl = weekTotal(conDayTotal, days, {
        options: {
          minTravelcard: minNum(weekCap),
          maxTravelcard: maxNum(weekCap),
        },
        data,
      });
      //adds the weekly cap to the week total
      return weekTotl + getFare(weekCap, false, data.weeklyCaps);
    });

  // gets the fare for the cheapest daily cap (or no daily cap) with no weekly travelcars
  const noWeekly = weekTotal(conDayTotal, days, {
	  	false,
	  	data,
	  });

  // returns the cheapest weekly charge on contactless (rounded to 2 dp)
  return round(
  		(minNum(final.concat([noWeekly]))), 2);
}