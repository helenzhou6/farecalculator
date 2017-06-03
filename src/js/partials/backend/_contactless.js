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
} from './../../utility/_utility';

import conDayTotal from './_contactlessDayTotal';
import weekTotal from './_weekTotal';

export default function contactless(days, data) {
	const weeklyCaps = keysToJourney(data.weeklyCaps);

  // 1. For each possible weekly cap
  // returns the array of each weekly cap total week fare
 	const final = weeklyCaps.map((weekCap) => {
      const total = weekTotal(conDayTotal, days, {
        options: {
          minTravelcard: minNum(weekCap),
          maxTravelcard: maxNum(weekCap),
        },
        data,
      });
      return total + getFare(weekCap, false, data.weeklyCaps);
    });

  // 2. If no weekly cap is passed in
  // Gets the fare for the cheapest daily cap (or no daily cap) when no weekly travelcards are passed in
  // returns a number
  const noWeekly = weekTotal(conDayTotal, days, {
        options: {
          minTravelcard: false,
          maxTravelcard: false,
        },
	  	data,
	  });

  // Returns a number: cheapest total weekly fare on contactless (rounded to 2 dp)
  // -- by appending the noWeekly number to the final array and finding the smallest number
  return round(
  		(minNum(final.concat([noWeekly]))), 2);
}

